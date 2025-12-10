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

    // Kaardi wrapper
    const card = document.createElement("div");
    card.className = "cart-item-card";

    /* --- Pilt --- */
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    img.className = "cart-item-img";
    card.appendChild(img);

    /* --- Info blokk --- */
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
       EEMALDA NUPP – PAREMALE JOONDATUD
    ----------------------------------------- */
    const removeBtn = document.createElement("button");
    removeBtn.className = "cart-remove-btn";
    removeBtn.textContent = "X Eemalda";

    removeBtn.addEventListener("click", () => {
      cart.removeItem(product.id);          // eemalda toode ostukorvist
      rootElement.innerHTML = "";           // tühjenda
      renderCartView(rootElement, cart);    // joonista uuesti
    });

    card.appendChild(removeBtn);

    list.appendChild(card);
  });

  section.appendChild(list);

  /* -----------------------------------------
     OSTUKORVI KOKKU
  ----------------------------------------- */
  const totalEl = document.createElement("h3");
  totalEl.textContent = "Kokku: " + cart.getTotal().toFixed(2) + " €";
  section.appendChild(totalEl);

  rootElement.appendChild(section);
}
