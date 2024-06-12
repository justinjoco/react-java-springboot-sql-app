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
/*
export async function addItems() {
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

export async function updateItem() {
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

export async function deleteItem() {
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
*/
