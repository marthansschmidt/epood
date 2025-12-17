import { renderAllProductsView } from "./views/allProductsView.js";
import { renderProductDetailView } from "./views/productDetailView.js";
import { renderCartView } from "./views/cartView.js";

export function navigate(view, param) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  switch (view) {
    case "allProducts":
      renderAllProductsView(root, window.appState.products);
      break;

    case "productDetail": {
      const product = window.appState.products.find(
        (p) => p.id === param
      );
      if (product) {
        renderProductDetailView(root, product);
      }
      break;
    }

    case "cart":
      renderCartView(root, window.appState.cart);
      break;

    case "favorites": {
      const favs = window.appState.favorites;

      const section = document.createElement("section");
      section.className = "section";
      section.innerHTML = "<h2>Lemmikud</h2>";

      if (favs.length === 0) {
        section.innerHTML += "<p>Lemmikuid pole veel lisatud.</p>";
        root.appendChild(section);
      } else {
        renderAllProductsView(root, favs);
      }
      break;
    }

    default:
      console.error("Tundmatu vaade:", view);
  }
}
