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

const itemsFile = "./mockData/items.json";
const ordersFile = "./mockData/ordersAdmin.json";

export default function Admin() {
  const [itemDisplay, setItemDisplay] = useState(createItemDisplay());
  const [orderDisplay, setOrderDisplay] = useState(createOrderDisplay());

  const fetchItems = async () => {
    const response = await fetch(itemsFile);
    const json = await response.json();
    console.log(json);
  };

  const fetchOrders = async () => {
    const response = await fetch(ordersFile);
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    fetchItems();
    fetchOrders();
  }, []);

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
  return (
    <div>
      <h1>Items</h1>
    </div>
  );
}

function createOrderDisplay(orders) {
  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
}
