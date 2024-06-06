from flask_marshmallow import Schema
from marshmallow.fields import Str, Decimal, Int


class ItemSchema(Schema):
    class Meta:
        # Fields to expose
        fields = ["id", "name", "price", "count"]

    id = Str()
    name = Str()
    price = Decimal()
    count = Int()
