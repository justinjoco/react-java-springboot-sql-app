from api.model.db import db
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from decimal import Decimal
from sqlalchemy import ForeignKey
from uuid import UUID


class Order(db.Model):
    __tablename__ = "order"

    id: Mapped[UUID] = mapped_column(primary_key=True, nullable=False)
    item_id: Mapped[str] = mapped_column(ForeignKey("item.id"), nullable=False)
    user_id: Mapped[str] = mapped_column(nullable=False)
    amount_bought: Mapped[int] = mapped_column(nullable=False)
    total_price: Mapped[Decimal] = mapped_column(nullable=False)
    date_created: Mapped[datetime] = mapped_column(nullable=False)
