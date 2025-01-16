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
    # ******--- Extract taka from tequest ---******
    first_name = request_json.get("first_name","")
    last_name = request_json.get("last_name","")
    email = request_json.get("email","")


    source = request_json.get("source","pandadoc")

    if source != "airtable":

        document_id = request_json.get("document_id","")

        # ******--- Extract data from pandadoc - and get accountId ---******
        document_json = get_pandadoc(document_id=document_id)

        if document_json == 10:
            return 10
    

        document_tokens = document_json.get("tokens",[])
        # pprint.pprint(document_tokens)
        account_id = get_account_from_tokens(document_tokens)

        # pprint.pprint(f"\n Account Id {account_id} \n")
        if account_id == "":
            return 11
        elif account_id == 30:
            return 30
    else:
        account_id = request_json.get("client_account")


    # ******--- Create Customer ---******
    try:

        if account_id == "bsb":

            customer_list_res = stripe.Customer.list(
                email=email,
            )

            customer_list = customer_list_res.get("data")

            if len(customer_list) > 0:
                customer = customer_list[0]
            else:
                customer = stripe.Customer.create(
                    name=first_name + " " + last_name,
                    email=email
                )
        else:

            customer_list_res = stripe.Customer.list(
                email=email,
                stripe_account=account_id
            )

            customer_list = customer_list_res.get("data")

            if len(customer_list) > 0:
                customer = customer_list[0]
            else:
                customer = stripe.Customer.create(
                    name=first_name + " " + last_name,
                    email=email,
                    stripe_account=account_id
                )
    except Exception as e:
        print(f" \n Exception occurred {str(e)} trying to create stripe customer \n")

        return 20

    customer_id = customer.get("id")

    if customer_id is None:
        return 21

    if source != "airtable":

        update_val = update_pandadoc(document_id=document_id, customer_id=customer_id)
    else:
        record_id = request_json.get("record_id","")

        update_val = update_record(record_id, customer_id)

    if update_val == 30 or update_val == 12 or update_val == 40:
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

