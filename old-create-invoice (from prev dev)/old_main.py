import functions_framework
import requests
from helper import get_pandadoc, return_data, create_invoices
import os


auth_key = os.environ.get("Authorization")


@functions_framework.http
def create_invoices(request):
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
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": ["Content-Type","Authorization","Access-Control-Allow-Origin"]
        }

        return ("", 204, headers)
    
    headers = request.headers
    auth = headers.get("Authorization")

    if auth != auth_key:
        return "Invalid Auth",401
    

    request_json = request.get_json(silent=True)


    return return_data(request)

