from flask import Blueprint
from tracing.log import logger
admin_api = Blueprint('admin_api', __name__)


@admin_api.post('/item')
def add_item():
    logger.info(f"To be implemented: adding an item")
    return "Path not implemented yet", 501


@admin_api.put('/item/<item_id>')
def update_item(item_id):
    logger.info(f"To be implemented: updating an item {item_id}")
    return "Path not implemented yet", 501


@admin_api.delete('/item/<item_id>')
def delete_item(item_id):
    logger.info(f"To be implemented: deleting an item {item_id}")
    return "Path not implemented yet", 501
