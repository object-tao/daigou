param(
  [string]$CloudflareAccountId = $env:CLOUDFLARE_ACCOUNT_ID,
  [string]$CloudflareApiToken = $env:CLOUDFLARE_API_TOKEN,
  [string]$GitHubRepo = "object-tao/daigou",
  [string]$D1DatabaseName = "droppilot-db",
  [string[]]$Domains = @("droppilot.net", "www.droppilot.net"),
  [switch]$SkipGitHubSecrets,
  [switch]$SkipDeploy
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Read-RequiredSecret([string]$Label, [string]$CurrentValue) {
  if ($CurrentValue) {
    return $CurrentValue
  }

  $secureValue = Read-Host $Label -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}

function Read-RequiredText([string]$Label, [string]$CurrentValue) {
  if ($CurrentValue) {
    return $CurrentValue
  }

  $value = Read-Host $Label
  if (-not $value) {
    throw "$Label is required."
  }
  return $value
}

function Invoke-Step([string]$Title, [scriptblock]$Script) {
  Write-Host ""
  Write-Host "==> $Title" -ForegroundColor Cyan
  & $Script
}

function Test-Command([string]$Command) {
  return [bool](Get-Command $Command -ErrorAction SilentlyContinue)
}

function Get-D1DatabaseId([object]$Database) {
  foreach ($field in @("uuid", "id", "database_id")) {
    if ($Database.PSObject.Properties.Name -contains $field) {
      $value = $Database.$field
      if ($value) {
        return [string]$value
      }
    }
  }
  return $null
}

function Get-D1DatabaseList {
  $json = npx wrangler d1 list --json
  return $json | ConvertFrom-Json
}

function Update-WranglerDatabaseId([string]$DatabaseId) {
  $path = Join-Path (Get-Location) "wrangler.jsonc"
  $content = Get-Content $path -Raw
  $nextContent = [regex]::Replace($content, '("database_id"\s*:\s*")[^"]+(")', "`$1$DatabaseId`$2", 1)

  if ($content -ne $nextContent) {
    Set-Content -Path $path -Value $nextContent -NoNewline
    Write-Host "Updated wrangler.jsonc database_id=$DatabaseId"
  } else {
    Write-Host "wrangler.jsonc already uses database_id=$DatabaseId"
  }
}

function Ensure-GitHubCli {
  if (Test-Command "gh") {
    return
  }

  Write-Host "GitHub CLI (gh) is not installed." -ForegroundColor Yellow
  $install = Read-Host "Install GitHub CLI with winget now? Type Y to continue"
  if ($install -ne "Y") {
    throw "GitHub CLI is required to set GitHub Actions secrets automatically. Re-run with -SkipGitHubSecrets to skip this part."
  }

  winget install --id GitHub.cli --source winget --accept-package-agreements --accept-source-agreements
  if (-not (Test-Command "gh")) {
    throw "GitHub CLI was installed but is not available in this PowerShell session. Open a new PowerShell window and re-run this script."
  }
}

function Ensure-GitHubAuth {
  gh auth status *> $null
  if ($LASTEXITCODE -eq 0) {
    return
  }

  gh auth login -h github.com -w
}

$CloudflareAccountId = Read-RequiredText "Cloudflare Account ID" $CloudflareAccountId
$CloudflareApiToken = Read-RequiredSecret "Cloudflare API Token" $CloudflareApiToken

$env:CLOUDFLARE_ACCOUNT_ID = $CloudflareAccountId
$env:CLOUDFLARE_API_TOKEN = $CloudflareApiToken

Invoke-Step "Verify Cloudflare authentication" {
  npx wrangler whoami
}

Invoke-Step "Ensure remote D1 database exists" {
  $databases = @(Get-D1DatabaseList)
  $database = $databases | Where-Object { $_.name -eq $D1DatabaseName } | Select-Object -First 1

  if (-not $database) {
    npx wrangler d1 create $D1DatabaseName --location apac
    $databases = @(Get-D1DatabaseList)
    $database = $databases | Where-Object { $_.name -eq $D1DatabaseName } | Select-Object -First 1
  }

  if (-not $database) {
    throw "D1 database $D1DatabaseName was not found and could not be created."
  }

  $databaseId = Get-D1DatabaseId $database
  if (-not $databaseId) {
    throw "Could not determine D1 database id from wrangler d1 list output."
  }

  Update-WranglerDatabaseId $databaseId
}

Invoke-Step "Install dependencies and build" {
  npm ci
  npm run check:requirements
  npm run build
}

Invoke-Step "Apply remote D1 migrations" {
  npx wrangler d1 migrations apply $D1DatabaseName --remote
}

if (-not $SkipDeploy) {
  Invoke-Step "Deploy Worker and bind custom domains" {
    $deployArgs = @("wrangler", "deploy")
    foreach ($domain in $Domains) {
      $deployArgs += @("--domain", $domain)
    }
    npx @deployArgs
  }
}

if (-not $SkipGitHubSecrets) {
  Invoke-Step "Set GitHub Actions secrets" {
    Ensure-GitHubCli
    Ensure-GitHubAuth
    gh secret set CLOUDFLARE_ACCOUNT_ID --repo $GitHubRepo --body $CloudflareAccountId
    gh secret set CLOUDFLARE_API_TOKEN --repo $GitHubRepo --body $CloudflareApiToken
  }

  Invoke-Step "Trigger GitHub deploy workflow" {
    gh workflow run deploy-cloudflare.yml --repo $GitHubRepo
    Write-Host "Triggered deploy-cloudflare.yml. Use 'gh run list --repo $GitHubRepo --limit 5' to inspect runs."
  }
}

Invoke-Step "Show final status" {
  git status --short --branch
  Write-Host "Setup completed."
}
