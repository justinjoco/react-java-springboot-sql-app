from flask_marshmallow import Schema
from marshmallow.fields import Str, Decimal, DateTime, Int


class ItemSchema(Schema):
    class Meta:
        # Fields to expose
        fields = ["id", "name", "price", "count", "date_created",
                  "date_updated"]

    id = Str()
    name = Str()
    price = Decimal()
    count = Int()
    date_created = DateTime()
    date_updated = DateTime()
