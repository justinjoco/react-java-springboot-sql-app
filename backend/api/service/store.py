from api.model.db import db
from api.model.item import Item
from api.model.order import Order
from tracing.log import logger
from sqlalchemy import select


class StoreService:
    def get_items(self):
        logger.info("Retrieving items from DB")
        return db.session.execute(select(Item)).scalars()

    def get_orders(self):
        logger.info("Retrieving orders from DB")
        return db.session.execute(select(Order)).scalars()


store_service = StoreService()
