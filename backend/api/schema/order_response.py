from flask_marshmallow import Schema
from marshmallow.fields import Str, Int, DateTime, Decimal, Dict


class OrderResponse(Schema):
    class Meta:
        # Fields to expose
        fields = ["id", "name", "user_id", "amount_bought", "total_price",
                  "date_created"]

    id = Str()
    name = Str()
    user_id = Str()
    amount_bought = Int()
    total_price = Decimal()
    date_created = DateTime()
