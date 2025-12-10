import { addToCart } from "../main.js";

export function renderProductDetailView(rootElement, product) {
  const section = document.createElement("section");
  section.className = "section";
  section.id = "product-detail-view";

  const title = document.createElement("h2");
  title.textContent = "Toote detailvaade";
  section.appendChild(title);

  const detailCard = document.createElement("div");
  detailCard.className = "detail-card";
  detailCard.style.position = "relative"; // lemmikunupu jaoks

  /* ---------------------------------------------------------
     LEMMIKU NUPP
  --------------------------------------------------------- */
  const favBtn = document.createElement("div");
  favBtn.className = "favorite-btn";

  if (product.isFavorite) favBtn.classList.add("favorite-active");

  const favIcon = document.createElement("img");
  favIcon.src = "icons/favourite.png";
  favIcon.alt = "Lemmik";
  favBtn.appendChild(favIcon);

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    product.isFavorite = !product.isFavorite;

    if (product.isFavorite) {
      favBtn.classList.add("favorite-active");

      if (!window.appState.favorites.includes(product)) {
        window.appState.favorites.push(product);
      }

    } else {
      favBtn.classList.remove("favorite-active");

      window.appState.favorites = window.appState.favorites.filter(
        p => p.id !== product.id
      );
    }
  });

  detailCard.appendChild(favBtn);

  /* ---------------------------------------------------------
     PILT
  --------------------------------------------------------- */
  if (product.imageUrl) {
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    detailCard.appendChild(img);
  }

  /* ---------------------------------------------------------
     INFO BLOKK
  --------------------------------------------------------- */
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

  /* ---------------------------------------------------------
     OSTA KOHE NUPP
  --------------------------------------------------------- */
  const buyBtn = document.createElement("button");
  buyBtn.className = "btn-primary";
  buyBtn.textContent = "Osta kohe";

  buyBtn.addEventListener("click", (e) => {
    e.stopPropagation();     // ära tee midagi muud
    addToCart(product);      // lisa ostukorvi
  });

  info.appendChild(buyBtn);

  detailCard.appendChild(info);
  section.appendChild(detailCard);
  rootElement.appendChild(section);
}
