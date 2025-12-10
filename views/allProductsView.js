import { navigateToProduct, addToCart } from "../main.js";

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

    /* ---------------------------------------------
       Klikk kogu kaardile → detailvaade
    --------------------------------------------- */
    card.addEventListener("click", () => navigateToProduct(product.id));

    /* ---------------------------------------------
       LEMMIKU NUPP
    --------------------------------------------- */
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

      } else {
        favBtn.classList.remove("favorite-active");

        window.appState.favorites = window.appState.favorites.filter(
          p => p.id !== product.id
        );
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
       OSTA KOHE — alati kaardi all keskel
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
