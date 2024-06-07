from api.model.item import Item
from api.model.order import Order
from tracing.log import logger
from api.model.db import db
from sqlalchemy import insert, select, update
from typing import Dict


class StoreService:
    def get_items(self):
        logger.info("Retrieving items from DB")
        return Item.query.all()

    def get_item(self, item_id):
        logger.info(f"Retrieving item with id {item_id} from DB")
        return Item.query.get(item_id)

    def get_orders(self):
        logger.info("Retrieving orders from DB")
        return Order.query.all()

    def add_items(self, items):
        logger.info("Inserting new items into DB")
        insert_stmt = insert(Item).values(items)
        db.session.execute(insert_stmt)
        db.session.commit()

    def add_item(self, item):
        logger.info("Inserting new item into DB")
        insert_stmt = insert(Item).values(item)
        db.session.execute(insert_stmt)
        db.session.commit()

    def update_item(self, item_id, item_update):
        logger.info(f"Updating item with id {item_id}")
        item: Dict[str, any] | None = Item.query.get(item_id)
        if item is None:
            return False
        update_stmt = update(Item).where(Item.id == item_id).values(
            item_update)
        db.session.execute(update_stmt)
        db.session.commit()
        return True

    def delete_item(self, item_id):
        logger.info(f"Deleting item with id {item_id}")
        item: Dict[str, any] | None = Item.query.get(item_id)
        if item is None:
            return False
        db.session.delete(item)
        db.session.commit()
        return True

    def purchase_item(self, item_id):
        logger.info("Retrieving orders from DB")
        return Order.query.all()

    def purchase_items(self):
        logger.info("Retrieving orders from DB")
        return Order.query.all()


store_service = StoreService()
