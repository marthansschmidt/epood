import { Product } from "./constructors/product.js";

export async function fetchProducts() {
  const response = await fetch("./data.json");

  if (!response.ok) {
    throw new Error("data.json laadimine ebaõnnestus");
  }

  const json = await response.json();

  return json.products.map(
    p =>
      new Product(
        p.id,
        p.name,
        p.category,
        p.price,
        p.description,
        p.image,
        p.favorite
      )
  );
}
