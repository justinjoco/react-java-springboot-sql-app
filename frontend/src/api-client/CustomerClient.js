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

/*
export async function purchaseItems() {
  const response = await fetch("https://example.com/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Success:", result);
}
*/
