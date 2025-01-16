import functions_framework
import os
from helper import return_data
from flask import jsonify, request

if os.getenv('ENV') == "production": # Check if running in Google Cloud Functions
    pass  # No dotenv in production
else:
    from dotenv import load_dotenv
    load_dotenv() #load local .env file

# Fetch the Authorization key from the environment variable
auth_key = os.getenv("AUTH_KEY")

@functions_framework.http
def create_invoices(request):
    print("!!!!!! create_invoices FUNCTION INVOKED !!!!!!!!!!")
    
    # Handle CORS preflight requests
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Access-Control-Max-Age": "3600"  # Cache preflight for 1 hour
        }
        return ("", 204, headers)

    # Set default response headers for POST requests
    headers = {"Access-Control-Allow-Origin": "*"}

    # Authorization check
    incoming_auth = request.headers.get("Authorization")
    if incoming_auth != auth_key:
        print("Authorization failed")
        return jsonify({"error": "Invalid Auth"}), 401, headers

    try:
        # Parse JSON body from request
        request_json = request.get_json(silent=True)
        if not request_json:
            print("Invalid request: No JSON body received")
            return jsonify({"error": "Invalid JSON"}), 400, headers

        # Log the incoming request data
        print(f"Received request JSON: {request_json}")

        # Call the helper function to process the request
        response_data = return_data(request_json)

        # Return the response from the helper function
        return jsonify(response_data), 200, headers

    except Exception as e:
        # Log and handle unexpected errors
        print(f"Error processing the request: {str(e)}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500, headers