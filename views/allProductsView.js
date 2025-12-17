import { navigateToProduct, addToCart } from "../main.js";

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

export function renderAllProductsView(rootElement, products) {
  const section = document.createElement("section");
  section.className = "section";

  const title = document.createElement("h2");
  title.textContent = "Kõik tooted";
  section.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "product-grid";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.cursor = "pointer";

    card.addEventListener("click", () => navigateToProduct(product.id));

    const favBtn = document.createElement("div");
    favBtn.className = "favorite-btn";
    if (product.isFavorite) favBtn.classList.add("favorite-active");

    const favIcon = document.createElement("img");
    favIcon.src = "icons/favourite.png";
    favIcon.alt = "Lemmik";
    favBtn.appendChild(favIcon);

    favBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      product.isFavorite = !product.isFavorite;

      if (product.isFavorite) {
        favBtn.classList.add("favorite-active");

        if (!window.appState.favorites.includes(product)) {
          window.appState.favorites.push(product);
        }

        showFavoriteInfo(`Lisatud lemmikutesse: ${product.name}`);
      } else {
        favBtn.classList.remove("favorite-active");

        window.appState.favorites = window.appState.favorites.filter(
          p => p.id !== product.id
        );

        showFavoriteInfo(`Eemaldatud lemmikutest: ${product.name}`);
      }
    });

    card.appendChild(favBtn);

    /* ---------------------------------------------
       TOOTE PILT
    --------------------------------------------- */
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    card.appendChild(img);

    /* ---------------------------------------------
       NIMI
    --------------------------------------------- */
    const name = document.createElement("h4");
    name.textContent = product.name;
    card.appendChild(name);

    /* ---------------------------------------------
       KIRJELDUS
    --------------------------------------------- */
    const desc = document.createElement("p");
    desc.textContent = product.description;
    card.appendChild(desc);

    /* ---------------------------------------------
       HIND
    --------------------------------------------- */
    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.price + " €";
    card.appendChild(price);

    /* ---------------------------------------------
       OSTA KOHE
    --------------------------------------------- */
    const actions = document.createElement("div");
    actions.className = "product-actions";

    const buyBtn = document.createElement("button");
    buyBtn.className = "btn-primary";
    buyBtn.textContent = "Osta kohe";

    buyBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(product);
    });

    actions.appendChild(buyBtn);
    card.appendChild(actions);

    grid.appendChild(card);
  });

  section.appendChild(grid);
  rootElement.appendChild(section);
}
