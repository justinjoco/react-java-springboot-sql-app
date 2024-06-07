from flask import Blueprint, request
from tracing.log import logger
from api.service.store import store_service
customer_api = Blueprint('customer_api', __name__)
'''
1. Implement these endpoints with userId as part of the request body
(Optional) 2. Put the userId in the JWT. Validate the JWT and parse the payload for the userId
'''


@customer_api.post('/items/purchase')
def purchase_items():
    logger.info("To be implemented: Purchasing multiple items")
    #  result = store_service.purchase_items()
    return "Path not implemented yet", 501


@customer_api.post('/item/<item_id>/purchase')
def purchase_specific_item(item_id):
    logger.info(
        f"To be implemented: Purchasing specific item with id {item_id}")
    # result = store_service.purchase_specific_item()
    return "Path not implemented yet", 501
