from flask_marshmallow import Schema
from marshmallow.fields import Str, Int, DateTime


class OrderSchema(Schema):
    class Meta:
        # Fields to expose
        fields = ["id", "item_id", "user_id", "amount_bought", "date_created"]

    id = Str()
    item_id = Str()
    user_id = Str()
    amount_bought = Int()
    date_created = DateTime()
