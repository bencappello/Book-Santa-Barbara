import requests
import stripe
import json
from datetime import datetime, timedelta
import os

stripe.api_key = os.environ.get("stripe_token")

pandadoc_token = os.environ.get("pandadoc_token")


# TODO - pass in document_id
def get_pandadoc(document_id):
    id = document_id

    url = f'https://api.pandadoc.com/public/v1/documents/{id}/details'

    headers = {
        "accept": "application/json",
        "Authorization": f"API-Key {pandadoc_token}"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"\n Error retrieving pandadoc {response} \n")
        return
        # TODO handle error case
    else: 

        return response.json()




def return_data(request):

    request_json = request.get_json(silent=True)
    request_args = request.args

    source = request_json.get("source","pandadoc")

    document_id = ""


    if request_json and 'document_id' in request_json:
        document_id = request_json.get("document_id")
    

    if source == "airtable":
        split_type = request_json.get("split")
        structure = request_json.get("structure")

        customer_id = request_json.get("customer_id")
        total_amount = request_json.get("total")
        deposit = request_json.get("deposit")
        description = request_json.get("invoice_text")
        account = request_json.get("client_account")
        due_date = request_json.get("date")
        num_of_guests = request_json.get("num_of_guests","")
        additional_fee = request_json.get("additional_fee","")
        additional_fee_text = request_json.get("additional_fee_text","")

        main_line_items = []
        additional_line_items = []

        if num_of_guests:
            description_line = due_date + " " + description + " - " + "Guest Count: " + num_of_guests
        else:
            description_line = due_date + " " + description

        main_pricing = float(total_amount.replace('$','').replace(',',''))

        
        main_line_items.append({
            "qty":1,
            "name": description_line,
            "price": "",
            "subtotal": main_pricing
        })
        
        if additional_fee and additional_fee_text:
            additional_line_items.append(additional_fee_text)
            additional_pricing = float(additional_fee.replace("$","").replace(",",""))
        else:
            additional_pricing=0

        if not customer_id:
            return

        deposit_multiplier = int(deposit)/100

        
        
        deposit_fee = main_pricing*deposit_multiplier

        remainder_fee = int(main_pricing-deposit_fee)

        token_data = {
            "0":{
                "account":"bsb",
                "structure":structure
            },
            "1":{
                "account":account,
                "structure":""
            }
        }

        
    else:   
        if document_id is None:
            # TODO: handle error case
            print(f"\n Document ID is None \n")
            return



        res = get_pandadoc(document_id)

        if res is None:
            return

        # TODO - handle document status
        # **** Document Extractions ****
        document_status = res.get("status", None)
        document_total = res.get("grand_total",{}).get("amount", None)

        document_tokens = res.get("tokens",[])
        pricing_tables = res.get("pricing",{})

        token_data,deposit_multiplier,customer_id,due_date = extract_token_data(document_tokens)

        if token_data is None:
            return
       
        main_pricing, additional_pricing, split_type = get_pricing(pricing_tables)
        deposit_multiplier = int(deposit_multiplier)/100

        # **** Fee Creation ****
        deposit_fee = main_pricing*deposit_multiplier
        remainder_fee = int(main_pricing-deposit_fee)

        main_line_items = get_line_items(pricing_tables)
        additional_line_items = get_additional_line_items(pricing_tables)
        description = ""


        if main_line_items is None:
            print(f"\n No line items found \n")
            return 

    create_invoices(
        remainder_fee, 
        deposit_fee, 
        customer_id=customer_id, 
        split_type=split_type,
        main_line_items=main_line_items,
        additional_line_items=additional_line_items,
        token_data=token_data,
        additional_fees=additional_pricing,
        due_date=due_date,
        deposit_description=description
    )
  

    return "Success",200

def get_pricing(pricing):

    tables = pricing.get("tables", [])

    main_table = tables[0]
    
    try:
        additional_table = tables[1]
        additional_fee_total =  float(additional_table.get("summary",{}).get("total",0) )
    except IndexError as e:
        additional_fee_total = 0
        print(" Additional Table doesn't Exist")

    main_total = float( main_table.get("summary",{}).get("subtotal") )

    

    # TODO - make sure split_data is not 
    split_data = main_table.get("items",[])[0].get("merged_data").get("Text")

    if split_data:
        if "SPL" not in split_data:
            split_data = None

    return main_total, additional_fee_total, split_data



def extract_token_data(tokens):

    data_for_invoice = {}
    deposit = ""
    customer = ""
    due_date = ""
    split_invoice_exists = False

    for token in tokens:

        name = token.get("name","")
        value = token.get("value","")

        if name == "split.invoice":
            split_invoice_exists = True
            if value == "yes":
                continue
            else:
                return None,None,None,None
        
        if name == "deposit":
            deposit = value
            continue

        if "customer" in name:
            customer = value
            continue
        
        
    
        if "event.date" in name:
            if due_date == "":
                due_date = value
            continue
            
        if "event.date_1" in name:
            due_date = value
            continue
            
        if "account" not in name and "structure" not in name:
            continue
        
        

        split = name.split(".")

        try:
            index = split[1]
        except IndexError as e:
            print(f"Error, No index 1 exists in name: {name} string split")
            continue

        current_dict_idx = data_for_invoice.get(index)

        if current_dict_idx is None:
            data_for_invoice[index] = {
                "account":"",
                "structure":""
            }


        if "account" in name:
            
            data_for_invoice[index]["account"] = value

        elif "structure" in name:
            data_for_invoice[index]["structure"] = value

    if not split_invoice_exists:
        return None, None, None, None

    return data_for_invoice, deposit, customer, due_date

def get_line_items(pricing):

    ret_line_items = []
    tables = pricing.get("tables",[])

    if len(tables)==0:
        return

    main_table = tables[0]

    line_items = main_table.get("items",[])

    if len(line_items)==0:
        return
    
    for item in line_items:

        line_item_obj = {
            "qty": int(item.get("qty",0)),
            "name": item.get("name"),
            "price":float(item.get("price",0)),
            "subtotal":float(item.get("subtotal",0))
        }


        ret_line_items.append(line_item_obj)




    return ret_line_items

def get_additional_line_items(pricing):
    tables = pricing.get("tables", [])
    line_items = []

    try: 
    
        additional_table = tables[1]

        at_line_items = additional_table.get("items",[])

        for item in at_line_items:
            line_items.append(item.get("name"))

    except IndexError as e:
        print(f"No Additional Table {str(e)}")

    return line_items

# ** Pricing going in is in dollar amount 
# ** create_invoices converts values to cents, stripe takes in values in cents
def create_invoices(
        remainder_fee,
        deposit_fee,
        customer_id,
        split_type,
        main_line_items,
        additional_line_items,
        token_data,
        additional_fees,
        due_date,
        deposit_description
    ):

    # TODO - replace with real due date
    inv_due_date = datetime.strptime(due_date,"%m/%d/%Y") + timedelta(days=1)
    due_date_today = datetime.now() + timedelta(hours=6)

    print(f"Split type is {split_type}")
    if not split_type:
        """
            No Split
        """
        bsb_data = token_data.get("0")
        account_id = bsb_data.get("account")

        remainder_fee = int(remainder_fee*100)
        deposit_fee = int(deposit_fee*100)

        r_transaction_fee = int(remainder_fee*.03)
        d_transaction_fee = int(deposit_fee*.03)

        r_invoice = stripe.Invoice.create(
            customer=customer_id,
            collection_method="send_invoice",
            due_date=inv_due_date
        )

        r_invoice_id = r_invoice.get("id")
        r_invoice_subtotal = 0

        for (index,line_item) in enumerate(main_line_items):
            amount_in_cents = int(line_item.get("subtotal")*100)
            description = ""
            
            if index ==0:
                description = "Remainder: " + line_item.get("name")
            else:
                description = line_item.get("name")
            r_invoice_subtotal += amount_in_cents
            stripe.InvoiceItem.create(
                invoice=r_invoice_id,
                amount=amount_in_cents,
                customer=customer_id,
                description=description
            )

        # Since we are displaying all line items from pandadoc, the total will show deposit as well
        # We show deposit as negative on remainder invoice 
        stripe.InvoiceItem.create(
            invoice=r_invoice_id,
            amount=-deposit_fee,
            customer=customer_id,
            description="Deposit (Paid through different invoice)"
        )   
        r_invoice_subtotal -= deposit_fee




        if len(additional_line_items) > 0 and additional_fees > 0:
            additional_fees = int(additional_fees*100)
            r_invoice_subtotal += additional_fees
            stripe.InvoiceItem.create(
                invoice=r_invoice_id,
                amount=additional_fees,
                customer=customer_id,
                stripe_account=account_id,
                description=additional_line_items[0]
            )

        stripe.InvoiceItem.create(
            invoice=r_invoice_id,
            amount=int(r_invoice_subtotal*.03),
            customer=customer_id,
            description="3% Credit card processing fees"          
        )

        d_invoice = stripe.Invoice.create(
            customer=customer_id,
            collection_method="send_invoice",
            due_date=due_date_today
        )

        d_invoice_id = d_invoice.get("id")
        stripe.InvoiceItem.create(
            invoice=d_invoice_id,
            amount=deposit_fee,
            customer=customer_id,
            description=deposit_description + " Deposit"
        )

        stripe.InvoiceItem.create(
            invoice=d_invoice_id,
            amount=d_transaction_fee,
            customer=customer_id,
            description="3% Credit card processing fees"
        )

        stripe.Invoice.finalize_invoice(invoice=r_invoice_id)
        stripe.Invoice.finalize_invoice(invoice=d_invoice_id)
        
        stripe.Invoice.send_invoice(r_invoice_id)
        stripe.Invoice.send_invoice(d_invoice_id)
    elif split_type == "SPL2":
        """
            Split denotes that application fees will go to BSB 
            Most fees will go to Vendors
        """
        bsb_data = token_data.get("0")
        account_data = token_data.get("1")

        account_id = account_data.get("account")

        cf_fee = bsb_data.get("structure")

        cf_multiplier = 5*int(cf_fee[2])
        cf_multiplier = cf_multiplier/100

        r_application_fee = cf_multiplier*remainder_fee

        r_application_fee = int(r_application_fee*100)
        remainder_fee = int(remainder_fee*100)
        r_transaction_fee = int(remainder_fee*.03)

        # Deposit Calculations
        d_application_fee = int(deposit_fee*cf_multiplier*100)
        deposit_fee = int(deposit_fee*100)
        d_transaction_fee = int(deposit_fee*.03)

        r_invoice_subtotal = 0

        # *******-- Remainder Invoice --*******
        r_invoice = stripe.Invoice.create(
            customer=customer_id,
            stripe_account=account_id,
            application_fee_amount=r_application_fee,
            collection_method="send_invoice",
            due_date=inv_due_date
        )

        r_invoice_id = r_invoice.get("id")

        for (index,line_item) in enumerate(main_line_items):
            amount_in_cents = int(line_item.get("subtotal")*100)
            description = ""
            
            if index ==0:
                description = "Remainder: " + line_item.get("name")
            else:
                description = line_item.get("name")
            r_invoice_subtotal += amount_in_cents
            stripe.InvoiceItem.create(
                invoice=r_invoice_id,
                amount=amount_in_cents,
                customer=customer_id,
                stripe_account=account_id,
                description=description
            )

        # Since we are displaying all line items from pandadoc, the total will show deposit as well
        # We show deposit as negative on remainder invoice 
        stripe.InvoiceItem.create(
            invoice=r_invoice_id,
            amount=-deposit_fee,
            customer=customer_id,
            stripe_account=account_id,
            description="Deposit (Paid through different invoice)"
        )
        r_invoice_subtotal-=deposit_fee



        # Additional line items are added to remainder invoice
        if len(additional_line_items) > 0 and additional_fees > 0:
            additional_fees = int(additional_fees*100)
            r_invoice_subtotal += additional_fees
            stripe.InvoiceItem.create(
                invoice=r_invoice_id,
                amount=additional_fees,
                customer=customer_id,
                stripe_account=account_id,
                description=additional_line_items[0]
            )
        # Add in Credit Card Processing fee to remainder invoice
        stripe.InvoiceItem.create(
            invoice=r_invoice_id,
            amount=int(r_invoice_subtotal*.03),
            customer=customer_id,
            stripe_account=account_id,
            description="3% Credit card processing fees"
        )


        # ********-- Deposit Invoice --*******
        d_invoice = stripe.Invoice.create(
            customer=customer_id,
            stripe_account=account_id,
            application_fee_amount=d_application_fee,
            collection_method="send_invoice",
            due_date=due_date_today
        )

        d_invoice_id = d_invoice.get("id")
        stripe.InvoiceItem.create(
            invoice=d_invoice_id,
            amount=deposit_fee,
            customer=customer_id,
            stripe_account=account_id,
            description=deposit_description + " Deposit"
        )

        stripe.InvoiceItem.create(
            invoice=d_invoice_id,
            amount=d_transaction_fee,
            customer=customer_id,
            stripe_account=account_id,
            description="3% Credit card processing fees"
        )
        stripe.Invoice.finalize_invoice(r_invoice_id,stripe_account=account_id)
        stripe.Invoice.finalize_invoice(d_invoice_id,stripe_account=account_id)

        stripe.Invoice.send_invoice(r_invoice_id,stripe_account=account_id)
        stripe.Invoice.send_invoice(d_invoice_id,stripe_account=account_id)




