from flask import Blueprint
from api.service.store import store_service
from api.schema.item import ItemSchema
from api.schema.order import OrderSchema

store_api = Blueprint('store_api', __name__)


@store_api.route('/items')
def items():
    result = store_service.get_items()
    return ItemSchema(many=True).dump(result), 200


@store_api.route('/orders')
def orders():
    result = store_service.get_orders()
    return OrderSchema(many=True).dump(result), 200
