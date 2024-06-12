/*
Items table - Rendered on admin page render
- Row: id, Name, price, count, dateCreated, dateUpdated
- Update or delete from current table (Use button)

Add item
- Admin specified item (name, price, count); submit button

Orders table for all users -> updated after shopping cart has finished or on customer page render
- Row: Order id, item name, amount, date created, total price
<h1>Items</h1>
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

import { Table, Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getItems } from "../api-client/CommonClient";
import { getOrders } from "../api-client/CustomerClient";

const itemsFile = "./mockData/items.json";
const ordersFile = "./mockData/ordersAdmin.json";

export default function Admin() {
  const [itemDisplay, setItemDisplay] = useState([]);
  const [orderDisplay, setOrderDisplay] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const fetchItems = async () => {
    const items = await getItems();
    console.log(items);
    setItemDisplay(createItemDisplay(items));
  };

  const fetchOrders = async () => {
    const orders = await getOrders();
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

  const addItemForm = createAddItemForm();
  return (
    <Container>
      {itemDisplay}
      {addItemForm}
      {orderDisplay}
    </Container>
  );
}

function createAddItemForm() {
  return (
    <div>
      <Form>
        <h1>Add Item Form</h1>
        <Form.Group>
          <Form.Label>Item name</Form.Label>
          <Form.Control type="text" placeholder="My Item" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Item price</Form.Label>
          <Form.Control type="text" placeholder="1.00" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Item count</Form.Label>
          <Form.Control type="text" placeholder="5" />
        </Form.Group>
        <br />
        <Button>Submit</Button>
      </Form>
    </div>
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
            <td rowSpan={rowSpanSize}>{order.user_id}</td>
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
            <th>User ID</th>
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
