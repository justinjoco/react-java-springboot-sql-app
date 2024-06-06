from api.model.db import db
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from decimal import Decimal
from uuid import UUID


class Item(db.Model):
    __tablename__ = "item"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    price: Mapped[Decimal] = mapped_column(nullable=False)
    count: Mapped[int] = mapped_column(nullable=False)
    date_created: Mapped[datetime] = mapped_column(nullable=False)
    date_updated: Mapped[datetime] = mapped_column(nullable=False)
