import os
from pyairtable import Api

AIRTABLE_KEY = os.environ.get("AIRTABLE_PERSONAL_ACCESS_TOKEN")


api = Api(AIRTABLE_KEY)

table = api.table('appbN3Sfas942dqHM','tblc2RTUa5a5lQirH')

def update_record(record_id, customer_id):
    try:
        table.update(record_id, {'fldLgsctdYX2cgVk4': customer_id})
    except Exception as e:
        print(f' Error while trying to update airtable {str(e)}')
        return 40
