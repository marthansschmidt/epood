import { addToCart } from "../main.js";
import { addFavorite, removeFavorite } from "../api.js";

function showFavoriteInfo(message) {
  const toast = document.createElement("div");
  toast.className = "cart-info-toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("visible");
  });

  setTimeout(() => {
    toast.classList.remove("visible");
  }, 2000);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

export function renderProductDetailView(rootElement, product) {
  const section = document.createElement("section");
  section.className = "section";
  section.id = "product-detail-view";

  const title = document.createElement("h2");
  title.textContent = "Toote detailvaade";
  section.appendChild(title);

  const detailCard = document.createElement("div");
  detailCard.className = "detail-card";
  detailCard.style.position = "relative";

  // ✅ fav nupp buttoniks (nagu allProductsView)
  const favBtn = document.createElement("button");
  favBtn.className = "favorite-btn";
  favBtn.type = "button";
  favBtn.setAttribute("aria-label", "Lisa/eemalda lemmik");

  if (product.isFavorite) favBtn.classList.add("favorite-active");

  const favIcon = document.createElement("img");
  favIcon.src = "icons/favourite.png";
  favIcon.alt = "Lemmik";
  favBtn.appendChild(favIcon);

  favBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const customerId = window.appState.customer.id;
    const wasFavorite = !!product.isFavorite;

    // optimistlik UI
    product.isFavorite = !wasFavorite;
    favBtn.classList.toggle("favorite-active", product.isFavorite);

    try {
      if (product.isFavorite) {
        await addFavorite(customerId, product.id);

        // hoia FE favorites list sünkis (Favorites vaade kasutab seda)
        if (!window.appState.favorites.some((p) => p.id === product.id)) {
          window.appState.favorites.push(product);
        }

        showFavoriteInfo(`Lisatud lemmikutesse: ${product.name}`);
      } else {
        await removeFavorite(customerId, product.id);

        window.appState.favorites = window.appState.favorites.filter(
          (p) => p.id !== product.id
        );

        showFavoriteInfo(`Eemaldatud lemmikutest: ${product.name}`);
      }
    } catch (e) {
      // rollback vea korral
      product.isFavorite = wasFavorite;
      favBtn.classList.toggle("favorite-active", product.isFavorite);
      showFavoriteInfo("Lemmiku salvestamine ebaõnnestus.");
      console.error(e);
    }
  });

  detailCard.appendChild(favBtn);

  /* PILT */
  if (product.imageUrl) {
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    detailCard.appendChild(img);
  }

  /* INFO */
  const info = document.createElement("div");
  info.className = "detail-info";

  const nameEl = document.createElement("h3");
  nameEl.textContent = product.name;
  info.appendChild(nameEl);

  const categoryEl = document.createElement("p");
  categoryEl.textContent = "Kategooria: " + product.category;
  info.appendChild(categoryEl);

  const priceEl = document.createElement("p");
  priceEl.textContent = "Hind: " + product.price.toFixed(2) + " €";
  info.appendChild(priceEl);

  const descEl = document.createElement("p");
  descEl.textContent = "Kirjeldus: " + product.description;
  info.appendChild(descEl);

  /* OSTA KOHE */
  const buyBtn = document.createElement("button");
  buyBtn.className = "btn-primary";
  buyBtn.type = "button";
  buyBtn.textContent = "Osta kohe";

  buyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    addToCart(product);
  });

  info.appendChild(buyBtn);

  detailCard.appendChild(info);
  section.appendChild(detailCard);
  rootElement.appendChild(section);
}
