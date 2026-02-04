import { navigateToProduct, addToCart } from "../main.js";
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

export function renderAllProductsView(rootElement, products) {
  const section = document.createElement("section");
  section.className = "section";

  const title = document.createElement("h2");
  title.textContent = "Kõik tooted";
  section.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "product-grid";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.cursor = "pointer";

   card.addEventListener("click", (event) => {
  // kui klikiti lemmikunupul või selle sees oleval ikoonil, ära navigeeri
  if (event.target.closest(".favorite-btn")) return;

  // kui klikiti "Osta kohe" nupul, ära navigeeri
  if (event.target.closest(".btn-primary")) return;

  navigateToProduct(product.id);
});


    // ✅ tee lemmikunupp buttoniks, et kontrollida default-käitumist
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

          // ✅ uuenda lokaalselt, et "Lemmikud" vaade kohe näitaks
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

    card.appendChild(favBtn);

    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    card.appendChild(img);

    const name = document.createElement("h4");
    name.textContent = product.name;
    card.appendChild(name);

    const desc = document.createElement("p");
    desc.textContent = product.description;
    card.appendChild(desc);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.price + " €";
    card.appendChild(price);

    const actions = document.createElement("div");
    actions.className = "product-actions";

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

    actions.appendChild(buyBtn);
    card.appendChild(actions);

    grid.appendChild(card);
  });

  section.appendChild(grid);
  rootElement.appendChild(section);
}
