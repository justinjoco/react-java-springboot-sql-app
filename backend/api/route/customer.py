from flask import Blueprint, request
from tracing.log import logger
customer_api = Blueprint('customer_api', __name__)


@customer_api.post('/items/purchase')
def purchase_items():
    logger.info("To be implemented: Purchasing multiple items")
    return "Path not implemented yet", 501


@customer_api.post('/item/<item_id>/purchase')
def purchase_specific_item(item_id):
    logger.info(
        f"To be implemented: Purchasing specific item with id {item_id}")
    return "Path not implemented yet", 501
