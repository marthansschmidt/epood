import { Cart } from "./constructors/cart.js";
import { Customer } from "./constructors/customer.js";

import { fetchProducts } from "./api.js";

import { renderAllProductsView } from "./views/allProductsView.js";
import { renderProductDetailView } from "./views/productDetailView.js";
import { renderCartView } from "./views/cartView.js";

async function createAppState() {
  const products = await fetchProducts();

  return {
    products,
    favorites: [],
    customer: new Customer(1, "Test Klient", "test@example.com"),
    cart: new Cart()
  };
}

/* -----------------------------
   HEADER: OSTUKORVI KOGUS
----------------------------- */
export function updateCartCount() {
  const countEl = document.querySelector("#cart-count");
  if (!countEl || !window.appState?.cart) return;

  const total = window.appState.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  countEl.textContent = total;
}

export function addToCart(product) {
  window.appState.cart.addItem(product, 1);
  showToast(`"${product.name}" lisati ostukorvi!`);

  updateCartCount(); 
}

export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("visible"), 20);

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

export function navigateToProduct(productId) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const product = window.appState.products.find(p => p.id === productId);
  if (product) renderProductDetailView(root, product);

  updateCartCount();
}

export function navigateToAllProducts() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  renderAllProductsView(root, window.appState.products);

  updateCartCount();
}

export function navigateToFavorites() {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const favs = window.appState.favorites;

  if (favs.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Lemmikuid pole veel lisatud.";
    root.appendChild(msg);

    updateCartCount();
    return;
  }

  renderAllProductsView(root, favs);

  updateCartCount();
}

export function navigateToCart() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  renderCartView(root, window.appState.cart);

  updateCartCount(); 
}

async function initApp() {
  try {
    window.appState = await createAppState();

    navigateToAllProducts();

    document.getElementById("nav-home")
      .addEventListener("click", navigateToAllProducts);

    document.getElementById("nav-favorites")
      .addEventListener("click", navigateToFavorites);

    document.getElementById("nav-cart")
      .addEventListener("click", navigateToCart);

    const logo = document.querySelector(".logo");
    if (logo) logo.addEventListener("click", navigateToAllProducts);

    updateCartCount(); 
  } catch (error) {
    console.error("Rakenduse käivitamine ebaõnnestus:", error);
  }
}

initApp();
