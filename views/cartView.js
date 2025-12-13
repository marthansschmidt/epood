function showRemoveInfo(message) {
  const info = document.createElement("div");
  info.className = "cart-info-toast";
  info.textContent = message;

  document.body.appendChild(info);

  // käivitab CSS-animatsiooni (visible klass)
  requestAnimationFrame(() => {
    info.classList.add("visible");
  });

  setTimeout(() => {
    info.classList.remove("visible");
  }, 2000);

  setTimeout(() => {
    info.remove();
  }, 2500);
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
     OSTUKORVI TOOTED KAARTIDENA
  ----------------------------------------- */
  const list = document.createElement("div");
  list.className = "cart-list";

  cart.items.forEach((item) => {
    const product = item.product;
    const qty = item.quantity;
    const unitPrice = product.price;
    const rowTotal = qty * unitPrice;

    const card = document.createElement("div");
    card.className = "cart-item-card";

    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    img.className = "cart-item-img";
    card.appendChild(img);

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const nameEl = document.createElement("h4");
    nameEl.textContent = product.name;
    info.appendChild(nameEl);

    const qtyEl = document.createElement("p");
    qtyEl.textContent = `Kogus: ${qty}x`;
    info.appendChild(qtyEl);

    const unitPriceEl = document.createElement("p");
    unitPriceEl.textContent = `Ühiku hind: ${unitPrice.toFixed(2)} €`;
    info.appendChild(unitPriceEl);

    const rowTotalEl = document.createElement("p");
    rowTotalEl.className = "cart-item-total";
    rowTotalEl.textContent = `Rida kokku: ${rowTotal.toFixed(2)} €`;
    info.appendChild(rowTotalEl);

    card.appendChild(info);

    /* -----------------------------------------
       EEMALDA NUPP + INFOTEADE
    ----------------------------------------- */
    const removeBtn = document.createElement("button");
    removeBtn.className = "cart-remove-btn";
    removeBtn.textContent = "X Eemalda";

    removeBtn.addEventListener("click", () => {
      const cartItem = cart.items.find(
        i => i.product.id === product.id
      );

      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        showRemoveInfo(`Vähendati: ${product.name}`);
      } else {
        cart.items = cart.items.filter(
          i => i.product.id !== product.id
        );
        showRemoveInfo(`Eemaldatud: ${product.name}`);
      }

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
