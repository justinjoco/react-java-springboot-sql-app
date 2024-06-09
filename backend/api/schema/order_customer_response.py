from flask_marshmallow import Schema
from marshmallow.fields import Str, DateTime, Decimal, List, Nested
from api.schema.item_order import ItemOrder


class OrderCustomerResponse(Schema):
    class Meta:
        # Fields to expose
        fields = ["id", "item_orders" "date_created"]

    id = Str()
    item_orders = List(Nested(ItemOrder))
    date_created = DateTime()
