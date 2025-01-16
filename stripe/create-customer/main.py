import functions_framework
import os
from helper import main_helper
from flask import jsonify, request

# Environment variable for Authorization Key
auth_key = os.getenv("AUTH_KEY")

response_codes = {
    # 1x codes are for Panda Doc
    10: "No Account Id Found",
    11: "No Document Found in Pandadoc",
    12: "Unable to update Pandadoc",
    
    # 2x codes are for Stripe
    20: "Error creating customer",
    21: "Customer was created but customer id doesn't exist",
    
    30: "Create Customer Flag is False/Doesn't Exist",
    
    200: "Entire Flow Successful"
}

@functions_framework.http
def create_customer(request):
    # Handle CORS preflight requests
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Access-Control-Max-Age": "3600"  # Cache preflight for 1 hour
        }
        return ("", 204, headers)

    # Set response headers (CORS handling for POST)
    headers = {"Access-Control-Allow-Origin": "*"}

    try:
        # Check for Authorization header
        incoming_auth = request.headers.get("Authorization")
        if incoming_auth != auth_key:
            print("Invalid Authorization")
            return jsonify({"error": "Invalid Auth"}), 401, headers

        # Parse JSON request body
        request_json = request.get_json()
        if not request_json:
            print("Invalid request: No JSON received")
            return jsonify({"error": "Invalid JSON"}), 400, headers

        print(f"Received JSON: {request_json}")

        # Call your main_helper function to process the request
        # Assuming main_helper returns a code for handling responses
        res = main_helper(request_json)

        # If helper function returns an error (code < 100), return error
        if res < 100:
            return jsonify({"error": response_codes[res]}), 500, headers
        
        # Return success
        return jsonify({"message": response_codes[res]}), 200, headers

    except Exception as e:
        # Log any exception and return an error response
        print(f"Error processing request: {str(e)}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500, headers
