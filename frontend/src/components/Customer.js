/*
Items table - Rendered on customer page render
- Row: Name, price, count
- Add to cart button with dropdown on how many to purchase

- Shopping chart
- user-created customer id
- Table of items to purchase
- Has total price of entire order
- Submit order
  - Clears cart when order is successful or on customer re-render


Orders table with user-specified id-> updated after shopping cart has finished or on customer page render
- Row: Order id, item name, amount, date created, total price
*/
import { Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
export default function Customer() {
  const [itemDisplay, setItemDisplay] = useState(createItemDisplay());
  const [shoppingCart, setShoppingCart] = useState(createShoppingCart());
  const [orderDisplay, setOrderDisplay] = useState(createOrderDisplay());

  return (
    <Container>
      {itemDisplay}
      {shoppingCart}
      {orderDisplay}
    </Container>
  );
}

function createItemDisplay(items){
  return (<div>
    <h1>Items</h1>
  </div>)
}

function createShoppingCart(items){
  return (<div>
    <h1>Shopping Cart</h1>
  </div>)
}

function createOrderDisplay(orders){

  return (<div>
    <h1>Orders</h1>
  </div>)

}