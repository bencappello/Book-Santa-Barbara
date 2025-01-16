gcloud functions deploy stripe-invoice-create \
  --runtime python310 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-west2 \
  --source . \
  --entry-point create_invoices