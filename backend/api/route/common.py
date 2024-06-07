from flask import Blueprint, request
from api.service.store import store_service
from api.schema.item_response import ItemResponse
from api.schema.order_response import OrderResponse
from tracing.log import logger
common_api = Blueprint('common_api', __name__)


@common_api.get('/items')
def items():
    result = store_service.get_items()
    return ItemResponse(many=True).dump(result), 200


@common_api.get('/item/<item_id>')
def get_specific_item(item_id):
    result = store_service.get_item(item_id)
    return ItemResponse().dump(result), 200


@common_api.get('/orders')
def orders():
    result = store_service.get_orders()
    return OrderResponse(many=True).dump(result), 200
