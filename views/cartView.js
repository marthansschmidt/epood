import { updateCartCount } from "../main.js";

const VAT_RATE = 0.24;
const VAT_DIVISOR = 1 + VAT_RATE;

function showRemoveInfo(message) {
  const info = document.createElement("div");
  info.className = "cart-info-toast";
  info.textContent = message;

  document.body.appendChild(info);

  requestAnimationFrame(() => {
    info.classList.add("visible");
  });

  setTimeout(() => info.classList.remove("visible"), 2000);
  setTimeout(() => info.remove(), 2500);
}

/* -----------------------------------------
   TELLIMUSE KINNITUSE POPUP
----------------------------------------- */
function showOrderConfirmation() {
  const overlay = document.createElement("div");
  overlay.className = "order-overlay";

  const popup = document.createElement("div");
  popup.className = "order-popup";

  popup.innerHTML = `
    <h3>Teie tellimus on kinnitatud</h3>
    <button class="order-popup-btn">OK</button>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".order-popup-btn").addEventListener("click", () => {
    overlay.remove();
  });
}

export function renderCartView(rootElement, cart) {
  const section = document.createElement("section");
  section.className = "section";
  section.id = "cart-view";

  const title = document.createElement("h2");
  title.textContent = "Ostukorv";
  section.appendChild(title);

  /* -----------------------------------------
     TÜHI OSTUKORV
  ----------------------------------------- */
  if (!cart.items.length) {
    const emptyText = document.createElement("p");
    emptyText.textContent = "Ostukorv on tühi.";
    section.appendChild(emptyText);
    rootElement.appendChild(section);

    updateCartCount();
    return;
  }

  /* -----------------------------------------
     OSTUKORVI TOOTED
  ----------------------------------------- */
  const list = document.createElement("div");
  list.className = "cart-list";

  cart.items.forEach((item) => {
    const product = item.product;
    const cartItem = cart.items.find(i => i.product.id === product.id);

    const card = document.createElement("div");
    card.className = "cart-item-card";

    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    img.className = "cart-item-img";
    card.appendChild(img);

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const unitGross = product.price;
    const unitNet = unitGross / VAT_DIVISOR;
    const unitVat = unitGross - unitNet;

    const qty = cartItem.quantity;

    const rowGross = qty * unitGross;
    const rowNet = rowGross / VAT_DIVISOR;
    const rowVat = rowGross - rowNet;

    info.innerHTML = `
      <h4>${product.name}</h4>
      <p>Ühiku hind (KM-ga): ${unitGross.toFixed(2)} €</p>
      <p>Kogus: ${qty}</p>
      <p class="cart-item-total">Kokku: ${rowGross.toFixed(2)} €</p>
     
    `;

    /* -----------------------------------------
       + / - NUPUD
    ----------------------------------------- */
    const qtyControls = document.createElement("div");
    qtyControls.className = "cart-qty-controls";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "–";

    const qtyText = document.createElement("span");
    qtyText.textContent = qty;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";

    minusBtn.addEventListener("click", () => {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        showRemoveInfo(`Vähendati: ${product.name}`);
      } else {
        cart.items = cart.items.filter(i => i.product.id !== product.id);
        showRemoveInfo(`Eemaldatud: ${product.name}`);
      }

      updateCartCount();
      rootElement.innerHTML = "";
      renderCartView(rootElement, cart);
    });

    plusBtn.addEventListener("click", () => {
      cartItem.quantity++;
      showRemoveInfo(`Lisati: ${product.name}`);

      updateCartCount();
      rootElement.innerHTML = "";
      renderCartView(rootElement, cart);
    });

    qtyControls.appendChild(minusBtn);
    qtyControls.appendChild(qtyText);
    qtyControls.appendChild(plusBtn);

    info.appendChild(qtyControls);
    card.appendChild(info);

    /* -----------------------------------------
       EEMALDA KÕIK NUPP
    ----------------------------------------- */
    const removeBtn = document.createElement("button");
    removeBtn.className = "cart-remove-btn";
    removeBtn.textContent = "❌ Eemalda kõik";

    removeBtn.addEventListener("click", () => {
      cart.items = cart.items.filter(i => i.product.id !== product.id);

      showRemoveInfo(`Eemaldatud kõik: ${product.name}`);

      updateCartCount();
      rootElement.innerHTML = "";
      renderCartView(rootElement, cart);
    });

    card.appendChild(removeBtn);
    list.appendChild(card);
  });

  section.appendChild(list);

  /* -----------------------------------------
     KOKKUVÕTE: KM-ta + KM + KM-ga
     Eeldus: cart.getTotal() tagastab KM-ga summa
  ----------------------------------------- */
  const totalGross = cart.getTotal();           
  const totalNet = totalGross / VAT_DIVISOR;    
  const totalVat = totalGross - totalNet;       

  const totalsWrap = document.createElement("div");
  totalsWrap.className = "cart-totals";

  totalsWrap.innerHTML = `
    <p>Vahesumma (KM-ta): ${totalNet.toFixed(2)} €</p>
    <p>Käibemaks (${(VAT_RATE * 100).toFixed(0)}%): ${totalVat.toFixed(2)} €</p>
    <h3>Kokku: ${totalGross.toFixed(2)} €</h3>
  `;

  section.appendChild(totalsWrap);

  /* -----------------------------------------
     KINNITA TELLIMUS NUPP
  ----------------------------------------- */
  const orderBtn = document.createElement("button");
  orderBtn.className = "order-btn";
  orderBtn.textContent = "KINNITA TELLIMUS";

  orderBtn.addEventListener("click", () => {
    showOrderConfirmation();

    cart.items = [];

    updateCartCount();

    rootElement.innerHTML = "";
    renderCartView(rootElement, cart);
  });

  section.appendChild(orderBtn);

  rootElement.appendChild(section);

  updateCartCount();
}