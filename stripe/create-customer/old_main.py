import functions_framework
import requests
from helper import main_helper
import os

auth_key = os.environ.get("AUTH_KEY")

response_codes = {
    #  1x codes are for Panda Doc
    10: "No Account Id Found",
    11: "No Document Found in Pandadoc",
    12: "Unable to update Pandadoc",

    # 2x codes are for stripe
    20: "Error creating customer",
    21: "Customer was reated but customer id doesn't exist",

    30: "Create Customer Flag is False/Doesn't Exist",
    
    200: "Entire Flow Successful"
}

@functions_framework.http
def create_customer(request):
    print("!!!!!! FUNCTION INVOKED BENJAMIN !!!!!!!!!!")

    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.

    """

    if request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": ["Content-Type","Authorization"]
        }

        return ("", 204, headers)

    request_json = request.get_json()

    headers = request.headers

    auth = headers.get("Authorization")

    if auth != auth_key:
        return "Invalid Auth", 401

    print(f"\n {request_json} \n")
    res = main_helper(request_json)

    if res < 100:
        return response_codes[res], 500
    

    return response_codes[res],200
