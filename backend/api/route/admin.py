from flask import Blueprint, request
from api.model.item import Item
from tracing.log import logger
from api.service.store import store_service
admin_api = Blueprint('admin_api', __name__)


@admin_api.post('/item')
def add_item():
    item = request.json
    store_service.add_item(item)
    return "Item has been added", 201


@admin_api.post('/items')
def add_items():
    items = request.json
    store_service.add_items(items)
    return "Multiple item have been added", 201


@admin_api.put('/item/<item_id>')
def update_item(item_id):
    logger.info(f"Updating an item {item_id}")
    item_update = request.json
    store_service.update_item(item_id, item_update)
    return "Item has been updated", 200


@admin_api.delete('/item/<item_id>')
def delete_item(item_id):
    logger.info(f"Deleting an item {item_id}")
    store_service.delete_item(item_id)
    return "Item has been deleted", 200
