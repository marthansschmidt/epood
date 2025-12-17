import { renderAllProductsView } from "./allProductsView.js";

export function renderFavoritesView(root, favorites) {
  const section = document.createElement("section");
  section.className = "section";

  const title = document.createElement("h2");
  title.textContent = "Lemmikud";
  section.appendChild(title);

  if (!favorites.length) {
    const empty = document.createElement("p");
    empty.textContent = "Lemmikuid pole veel lisatud.";
    section.appendChild(empty);
    root.appendChild(section);
    return;
  }

  root.appendChild(section);

  renderAllProductsView(root, favorites);
}
