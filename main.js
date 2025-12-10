import { Product } from "./constructors/product.js";
import { Cart } from "./constructors/cart.js";
import { Customer } from "./constructors/customer.js";

import { renderAllProductsView } from "./views/allProductsView.js";
import { renderProductDetailView } from "./views/productDetailView.js";
import { renderCartView } from "./views/cartView.js";



/* ----------------------------------------
   Mock andmed
---------------------------------------- */
function createMockData() {
  const products = [
    new Product(1, "Sülearvuti", "Elektroonika", 3899,
      "Võimas sülearvuti igapäevaseks tööks.",
      "images/laptop.png", false),

    new Product(2, "Nutitelefon", "Elektroonika", 1599.00,
      "Kaasaegne nutitelefon hea kaameraga.",
      "images/phone.png", false),

    new Product(3, "Kohvikruus", "Köök", 19,
      "Keraamiline kruus hommikukohviks.",
      "images/mug.png", false),

    new Product(4, "Seljakott", "Aksessuaarid", 49,
      "Vastupidav seljakott igapäevaseks kasutamiseks.",
      "images/bag.png", false),

    new Product(5, "Jalanõud", "Aksessuaarid", 39,
      "Kiired sussid kiiremateks asjadeks.",
      "images/crocs.png", false),

    new Product(6, "Rihm", "Flex", 229,
      "Rihm, mis kannab ennast ise.",
      "images/rihm.png", false),

    new Product(7, "T-särk", "Flex", 329,
      "Premium-kvaliteediga Flex T-särk, valmistatud pehmest ja hingavast kangast. Sobib igapäevaseks kandmiseks ja treeninguteks.",
      "images/särk.webp", false),

    new Product(8, "Käekell", "Flex", 9199,
      "Eksklusiivne Flex käekell safiirklaasi ja täismetallist korpusega. Täpne mehaanika ja luksuslik disain igapäevaseks elegantsiks.",
      "images/kell.avif", false)
  ];

  return {
    products,
    favorites: [],
    customer: new Customer(1, "Test Klient", "test@example.com"),
    cart: new Cart()
  };
}



/* ----------------------------------------
   OSTUKORVI LISAMINE + TOAST
---------------------------------------- */
export function addToCart(product) {
  window.appState.cart.addItem(product, 1);
  showToast(`"${product.name}" lisati ostukorvi!`);
}


/* ----------------------------------------
   Toast-teavituse funktsioon
---------------------------------------- */
export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;

  document.body.appendChild(toast);

  // Väike viivitus animatsiooni jaoks
  setTimeout(() => toast.classList.add("visible"), 20);

  // Eemaldamine pärast 2.5 s
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}



/* ----------------------------------------
   Navigeerimine
---------------------------------------- */
export function navigateToProduct(productId) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const product = window.appState.products.find(p => p.id === productId);
  if (product) renderProductDetailView(root, product);
}

export function navigateToAllProducts() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  renderAllProductsView(root, window.appState.products);
}

export function navigateToFavorites() {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const favs = window.appState.favorites;
  const section = document.createElement("section");
  section.className = "section";

  const title = document.createElement("h2");
  title.textContent = "Lemmikud";
  section.appendChild(title);

  if (favs.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Lemmikuid pole veel lisatud.";
    section.appendChild(msg);
    root.appendChild(section);
    return;
  }

  renderAllProductsView(root, favs);
}

export function navigateToCart() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  renderCartView(root, window.appState.cart);
}



/* ----------------------------------------
   Rakenduse INIT
---------------------------------------- */
function initApp() {
  window.appState = createMockData();

  navigateToAllProducts();

  // NAV nupud
  document.getElementById("nav-home").addEventListener("click", navigateToAllProducts);
  document.getElementById("nav-favorites").addEventListener("click", navigateToFavorites);
  document.getElementById("nav-cart").addEventListener("click", navigateToCart);

  // Logo → avaleht
  const logo = document.querySelector(".logo");
  if (logo) logo.addEventListener("click", navigateToAllProducts);
}

initApp();
