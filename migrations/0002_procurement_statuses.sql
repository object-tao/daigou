UPDATE procurement_orders
   SET status = CASE status
     WHEN 'pending_quote' THEN 'pending_payment'
     WHEN 'quoted' THEN 'pending_payment'
     WHEN 'paid' THEN 'platform_pending_order'
     WHEN 'pending_purchase' THEN 'platform_pending_order'
     WHEN 'purchased' THEN 'platform_pending_shipment'
     ELSE status
   END
 WHERE status IN ('pending_quote', 'quoted', 'paid', 'pending_purchase', 'purchased');
