from api.model.base import db
from api.model.item import Item
from tracing.log import logger
from sqlalchemy import select


class StoreService:
    def get_items(self):
        logger.info("Retrieving items from DB")
        return db.session.execute(select(Item)).scalars()


store_service = StoreService()
