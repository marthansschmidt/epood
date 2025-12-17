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

    info.innerHTML = `
      <h4>${product.name}</h4>
      <p>Ühiku hind: ${product.price.toFixed(2)} €</p>
      <p class="cart-item-total">
        Rida kokku: ${(cartItem.quantity * product.price).toFixed(2)} €
      </p>
    `;

    /* -----------------------------------------
       + / - NUPUD
    ----------------------------------------- */
    const qtyControls = document.createElement("div");
    qtyControls.className = "cart-qty-controls";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "–";

    const qtyText = document.createElement("span");
    qtyText.textContent = cartItem.quantity;

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

      rootElement.innerHTML = "";
      renderCartView(rootElement, cart);
    });

    plusBtn.addEventListener("click", () => {
      cartItem.quantity++;
      showRemoveInfo(`Lisati: ${product.name}`);

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
      cart.items = cart.items.filter(
        i => i.product.id !== product.id
      );

      showRemoveInfo(`Eemaldatud kõik: ${product.name}`);

      rootElement.innerHTML = "";
      renderCartView(rootElement, cart);
    });

    card.appendChild(removeBtn);
    list.appendChild(card);
  });

  section.appendChild(list);

  const totalEl = document.createElement("h3");
  totalEl.textContent = "Kokku: " + cart.getTotal().toFixed(2) + " €";
  section.appendChild(totalEl);

  rootElement.appendChild(section);
}
