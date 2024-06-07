from flask_marshmallow import Schema
from marshmallow.fields import Str, Int, DateTime, Decimal


class OrderCustomerResponse(Schema):
    class Meta:
        # Fields to expose
        fields = ["id", "name", "amount_bought", "total_price", "date_created"]

    id = Str()
    name = Str()
    amount_bought = Int()
    total_price = Decimal()
    date_created = DateTime()
