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

export async function addItems(data) {
  const response = await fetch("http://localhost:5000/items", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(data),
  });

  const result = await response.text();
  console.log("Success:", result);
}

export async function updateItem(data) {
  const response = await fetch("http://localhost:5000/item", {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(data),
  });

  const result = await response.text();
  console.log("Success:", result);
}

export async function deleteItem(itemId) {
  const response = await fetch(`"http://localhost:5000/item/${itemId}"`, {
    method: "DELETE", // or 'PUT'
    headers: {
      role: "admin",
    },
  });

  const result = await response.text();
  console.log("Success:", result);
}
