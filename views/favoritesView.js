import { renderAllProductsView } from "./allProductsView.js";

export function renderFavoritesView(root, favorites) {
  // Lihtsalt kasuta sama view'd, aga muuda pealkiri enne
  root.innerHTML = "";
  renderAllProductsView(root, favorites);

  const h2 = root.querySelector("h2");
  if (h2) h2.textContent = "Lemmikud";
}
