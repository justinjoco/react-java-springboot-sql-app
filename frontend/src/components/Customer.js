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

<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
*/
import { Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const itemsFile = "./mockData/items.json";
const ordersFile = "./mockData/ordersCustomer.json";

export default function Customer() {
  const [itemDisplay, setItemDisplay] = useState([]);
  const [shoppingCart, setShoppingCart] = useState(createShoppingCart());
  const [orderDisplay, setOrderDisplay] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const fetchItems = async () => {
    const response = await fetch(itemsFile);
    const items = await response.json();
    console.log(items);
    setItemDisplay(createItemDisplay(items));
  };

  const fetchOrders = async () => {
    const response = await fetch(ordersFile);
    const orders = await response.json();
    console.log(orders);
    setOrderDisplay(createOrderDisplay(orders));
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchItems();
      fetchOrders();
    }
    return () => {
      setShouldFetch(false);
    };
  }, [shouldFetch]);

  return (
    <Container>
      {itemDisplay}
      {shoppingCart}
      {orderDisplay}
    </Container>
  );
}

function createItemDisplay(items) {
  const tableBody = items.map((item) => {
    return (
      <tr key={`item${item.id}`}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.count}</td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Items</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Available count</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </div>
  );
}

function createShoppingCart(items) {
  return (
    <div>
      <h1>Shopping Cart</h1>
    </div>
  );
}

function createOrderDisplay(orders) {
  const tableBody = orders.map((order) => {
    const itemOrders = order["item_orders"];
    const rowSpanSize = itemOrders.length;

    const itemOrderBody = itemOrders.map((itemOrder, index) => {
      let orderRow = null;
      console.log(index);
      if (index === 0) {
        orderRow = (
          <>
            <td rowSpan={rowSpanSize}>{order.id}</td>
            <td rowSpan={rowSpanSize}>{order.order_price}</td>
            <td rowSpan={rowSpanSize}>{order.date_created}</td>
          </>
        );
      }
      return (
        <tr key={`${order.id}:${itemOrder.item}`}>
          {orderRow}
          <td>{itemOrder.item}</td>
          <td>{itemOrder.amount_bought}</td>
          <td>{itemOrder.total_price}</td>
        </tr>
      );
    });
    return itemOrderBody;
  });
  return (
    <div>
      <h1>Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Price</th>
            <th>Order Created </th>
            <th>Item Price</th>
            <th>Amount Bought</th>
            <th>Item Price</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </div>
  );
}
