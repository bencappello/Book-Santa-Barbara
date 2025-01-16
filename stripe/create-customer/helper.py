import os
import requests
import stripe
import json
from datetime import datetime, timedelta
from airtable import update_record
import pprint

stripe.api_key = os.environ.get("STRIPE_API_KEY")

pandadoc_token = os.environ.get("pandadoc_token")

def get_pandadoc(document_id):
    """
        Get Pandadoc
    """
    id = document_id

    url = f'https://api.pandadoc.com/public/v1/documents/{id}/details'

    headers = {
        "accept": "application/json",
        "Authorization": f"API-Key {pandadoc_token}"
    }


    response = requests.get(url, headers=headers, timeout=1000)
    if response.status_code != 200:
        print(f"\n Error retrieving pandadoc {response} \n")
        return 10

    return response.json()
    
def update_pandadoc(document_id, customer_id):
    """
        Method to update pandadoc with customer id
    """
    url = f'https://api.pandadoc.com/public/v1/documents/{document_id}'

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"API-Key {pandadoc_token}"
    }

    payload = {
        "tokens":[{
            "name":"customer.0",
            "value": customer_id,
        }],
    }
  
    response = requests.patch(url, json=payload, headers=headers)

    if not response.ok:
        print(f"\n  Unable to update Pandadoc with customer ID {response.status_code} {response.reason} {response.raw} \n")
        print(f"\n  {response.content} \n")
        print(f"\n {payload} \n")
        return 12
    
    else:
        return response

    
def main_helper(request_json):
    """
        Does heavy lifting, gets customers and sends to pandadoc
    """
    # ******--- Extract data from request ---******
    first_name = request_json.get("first_name","")
    last_name = request_json.get("last_name","")
    email = request_json.get("email","")

    source = request_json.get("source", "pandadoc")

    if source != "airtable":
        document_id = request_json.get("document_id","")

        # ******--- Extract data from pandadoc - and get accountId ---******
        document_json = get_pandadoc(document_id=document_id)
        if document_json == 10:
            return 10

        document_tokens = document_json.get("tokens", [])
        account_id = get_account_from_tokens(document_tokens)

        if account_id == "":
            return 11
        elif account_id == 30:
            return 30
    else:
        account_id = request_json.get("client_account")

    # ******--- Create Customer ---******
    try:
        print(f"Attempting to create a customer in Stripe with email: {email} and account_id: {account_id}")

        if account_id == "bsb":
            customer_list_res = stripe.Customer.list(email=email)
            customer_list = customer_list_res.get("data")

            if len(customer_list) > 0:
                customer = customer_list[0]
                print(f"Existing customer found: {customer['id']}")
            else:
                customer = stripe.Customer.create(name=first_name + " " + last_name, email=email)
                print(f"New customer created: {customer['id']}")
        else:
            customer_list_res = stripe.Customer.list(email=email, stripe_account=account_id)
            customer_list = customer_list_res.get("data")

            if len(customer_list) > 0:
                customer = customer_list[0]
                print(f"Existing customer found in connected account {account_id}: {customer['id']}")
            else:
                customer = stripe.Customer.create(name=first_name + " " + last_name, email=email, stripe_account=account_id)
                print(f"New customer created in connected account {account_id}: {customer['id']}")

    except Exception as e:
        print(f"Exception occurred while creating Stripe customer: {str(e)}")
        return 20

    customer_id = customer.get("id")

    if customer_id is None:
        print("Customer ID is missing")
        return 21

    # ******--- Update Pandadoc or Airtable ---******
    if source != "airtable":
        update_val = update_pandadoc(document_id=document_id, customer_id=customer_id)
    else:
        record_id = request_json.get("record_id","")
        update_val = update_record(record_id, customer_id)

    if update_val in [30, 12, 40]:
        return update_val

    return 200


def get_account_from_tokens(tokens):
    """
        Docstring
    """
    account_id=""
    create_customer_exists = False

    for token in tokens:

        name = token.get("name","")
        value = token.get("value","")



        if name == "create.customer":
            create_customer_exists = True

            if value == "yes":
                continue
            else:
                return 30
            
        if name == "account.1":
            account_id = value
            break
    
    return account_id

