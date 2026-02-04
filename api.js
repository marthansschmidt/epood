const BASE_URL = "http://localhost:3000/api";

/* ---------------------------
   TOOTED
--------------------------- */

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Toodete laadimine ebaõnnestus");
  }

  const json = await res.json();

  return json.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    description: p.description,
    imageUrl: p.image,
    isFavorite: false
  }));
}

/* ---------------------------
   LEMMIKUD
--------------------------- */

export async function fetchFavorites(customerId) {
  const res = await fetch(
    `${BASE_URL}/customers/${customerId}/favorites`
  );

  return await res.json();
}

export async function addFavorite(customerId, productId) {
  await fetch(
    `${BASE_URL}/customers/${customerId}/favorites`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    }
  );
}

export async function removeFavorite(customerId, productId) {
  await fetch(
    `${BASE_URL}/customers/${customerId}/favorites/${productId}`,
    {
      method: "DELETE"
    }
  );
}
