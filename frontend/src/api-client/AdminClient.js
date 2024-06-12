const ordersFile = "./mockData/ordersAdmin.json";

export async function getOrdersMock() {
  return await (await fetch(ordersFile)).json();
}

export async function getOrders() {
  const response = await fetch("http://localhost:5000/items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
  });

  const result = await response.json();
  console.log(result);
  return result;
}

export async function addItems(items) {
  const response = await fetch("http://localhost:5000/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(items),
  });

  const result = await response.text();
  console.log("Success:", result);
}

export async function updateItem(itemId, update) {
  const response = await fetch(`http://localhost:5000/item/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(update),
  });

  const result = await response.text();
  console.log("Success:", result);
}

export async function deleteItem(itemId) {
  const response = await fetch(`"http://localhost:5000/item/${itemId}"`, {
    method: "DELETE",
    headers: {
      role: "admin",
    },
  });

  const result = await response.text();
  console.log("Success:", result);
}
