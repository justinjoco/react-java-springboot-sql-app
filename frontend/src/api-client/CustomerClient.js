const ordersFile = "./mockData/ordersCustomer.json";

export async function getOrdersMock() {
  return await (await fetch(ordersFile)).json();
}

export async function getOrders(userId) {
  const response = await fetch("http://localhost:5000/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userId: userId,
    },
  });

  const result = await response.json();
  console.log(result);

  return result;
}

export async function purchaseItems(items) {
  const response = await fetch("http://localhost:5000/items/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  });

  const result = await response.text();
  console.log("Success:", result);
}
