export async function getItems() {
  const response = await fetch("http://localhost:5000/items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log(result);

  return result;
}
