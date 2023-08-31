export async function getAllProducts() {
  let result = await fetch("https://dummyjson.com/products");
  let json = await result.json();
  return json;
}
