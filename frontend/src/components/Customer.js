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
import {
  Table,
  Container,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { getItems, getItemsMock } from "../api-client/CommonClient";
import {
  getOrders,
  getOrdersMock,
  purchaseItems,
} from "../api-client/CustomerClient";

export default function Customer() {
  const [itemDisplay, setItemDisplay] = useState([]);
  const [shoppingCart, setShoppingCart] = useState(createShoppingCart([]));
  const shoppingCartDataRef = useRef([]);
  const [orderDisplay, setOrderDisplay] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const fetchItems = async () => {
    //const items = await getItems();
    const items = await getItemsMock();
    console.log(items);
    setItemDisplay(createItemDisplay(items));
  };

  const fetchOrders = async () => {
    //const orders = await getOrders("myUserId");
    const orders = await getOrdersMock("myUserId");

    console.log(orders);
    setOrderDisplay(createOrderDisplay(orders));
  };

  const makePurchase = async (items) => {
    //const orders = await getOrders("myUserId");
    await purchaseItems(items);
    setShouldFetch(true);
  };

  const handleAddToCartButtonClick = (event) => {
    let shoppingCartData = shoppingCartDataRef.current;
    const item = JSON.parse(event.target.value);
    console.log(item);
    shoppingCartData.push(item);
    const cart = createShoppingCart(shoppingCartData);
    setShoppingCart(cart);
    shoppingCartDataRef.current = shoppingCartData;
  };

  const handleShoppingCartSubmit = () => {
    const items = shoppingCartDataRef.current;
    console.log(items);
  };

  function createItemDisplay(items) {
    const tableBody = items.map((item) => {
      const dropdownItems = [];
      const numOptions = Math.min(5, item.count);
      for (let i = 1; i <= numOptions; i++) {
        dropdownItems.push(
          <Dropdown.Item
            as="button"
            key={`${item.name}:${i}`}
            value={JSON.stringify({
              id: item.id,
              name: item.name,
              count: i,
              price: item.price,
            })}
            onClick={(e) => handleAddToCartButtonClick(e)}
          >
            {i}
          </Dropdown.Item>,
        );
      }
      const addToCartButton = (
        <DropdownButton title="Add">{dropdownItems}</DropdownButton>
      );

      return (
        <tr key={`item${item.id}`}>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.count}</td>
          <td>{addToCartButton}</td>
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
              <th>Unit Price</th>
              <th>Available count</th>
              <th>Add to Cart?</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </Table>
      </div>
    );
  }

  function createShoppingCart(items) {
    const tableBody = items.map((item, index) => {
      return (
        <tr key={`itemShoppingCart${item.id}:${index}`}>
          <td>{item.name}</td>
          <td>{item.count}</td>
          <td>{item.price * item.count}</td>
        </tr>
      );
    });
    return (
      <div>
        <h1>Shopping Cart</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Amount to buy</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </Table>
        <Button onClick={() => handleShoppingCartSubmit()}>Submit</Button>
      </div>
    );
  }

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
            <th>Item Name</th>
            <th>Amount Bought</th>
            <th>Item Price</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </div>
  );
}
