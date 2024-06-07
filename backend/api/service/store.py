from api.model.item import Item
from api.model.order import Order
from tracing.log import logger
from api.model.db import db
from sqlalchemy import insert, update, select
from typing import Dict
from flask import abort
from decimal import Decimal


class StoreService:
    def get_items(self):
        logger.info("Retrieving items from DB")
        return Item.query.all()

    def get_item(self, item_id):
        logger.info(f"Retrieving item with id {item_id} from DB")
        return Item.query.get_or_404(item_id)

    def get_orders(self):
        logger.info("Retrieving orders from DB")
        query = select(Order.id, Order.user_id, Order.amount_bought,
                      Order.total_price, Order.date_created,
                      Item.name).join(Item)
        orders = db.session.execute(query)
        return orders

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
        Item.query.get_or_404(item_id)
        update_stmt = update(Item).where(Item.id == item_id).values(
            item_update)
        db.session.execute(update_stmt)
        db.session.commit()

    def delete_item(self, item_id):
        logger.info(f"Deleting item with id {item_id}")
        item: Dict[str, any] | None = Item.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()

    def purchase_specific_item(self, user_id, total_money, item_id, count):
        logger.info("Purchasing a specific item")
        item: Item = Item.query.get_or_404(item_id)
        total_price = float(item.price * count)
        remainder = total_money - total_price
        new_count = item.count - count
        if new_count < 0 or remainder < 0:
            logger.info(
                "You don't have enough money or there's not enough inventory for that item")
            abort(
                400,
                description=
                "Client does not have enough money or there's not enough inventory of the given item")
        update_stmt = update(Item).where(Item.id == item_id).values(
            count=new_count)
        db.session.execute(update_stmt)
        insert_stmt = insert(Order).values(item_id=item_id,
                                           user_id=user_id,
                                           amount_bought=count,
                                           total_price=total_price)
        db.session.execute(insert_stmt)
        db.session.commit()
        return f"Item has been bought; there is ${remainder} leftover"

    def purchase_items(self, user_id, total_money, items_info):
        logger.info("Purchasing items")
        for item_info in items_info:
            item_id = item_info["id"]
            count = item_info["count"]
            item: Item = Item.query.get_or_404(item_id)
            total_price = float(item.price * count)
            total_money -= total_price
            new_count = item.count - count
            if new_count < 0 or total_money < 0:
                logger.info(
                    "You don't have enough money or there's not enough inventory for that item")
                db.session.rollback()
                abort(
                    400,
                    description=
                    "Client does not have enough money or there's not enough inventory of the given item")
            update_stmt = update(Item).where(Item.id == item_id).values(
                count=new_count)
            db.session.execute(update_stmt)
            insert_stmt = insert(Order).values(item_id=item_id,
                                               user_id=user_id,
                                               amount_bought=count,
                                               total_price=total_price)
            db.session.execute(insert_stmt)

        db.session.commit()
        return f"Items have been bought; there is ${total_money} leftover"


store_service = StoreService()
