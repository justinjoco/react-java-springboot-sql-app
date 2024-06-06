from api.model.item import Item
from api.model.order import Order
from tracing.log import logger


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


store_service = StoreService()
