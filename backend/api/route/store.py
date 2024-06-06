from flask import Blueprint
from api.service.store import store_service
from api.schema.item import ItemSchema
from tracing.log import logger

store_api = Blueprint('store_api', __name__)


@store_api.route('/items')
def items():
    """
    1 liner about the route
    A more detailed description of the endpoint
    ---
    """
    logger.info("Before store service gets items")
    result = store_service.get_items()
    logger.info("After store service gets items")

    return ItemSchema(many=True).dump(result), 200
