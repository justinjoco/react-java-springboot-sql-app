async function getOrders() {
  const response = await fetch("https://example.com/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

async function addItems() {
  const response = await fetch("https://example.com/profile", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Success:", result);
}

async function updateItem() {
  const response = await fetch("https://example.com/profile", {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Success:", result);
}

async function deleteItem() {
  const response = await fetch("https://example.com/profile", {
    method: "DELETE", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      role: "admin",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Success:", result);
}
