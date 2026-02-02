export class Cart {
  constructor() {
    // items: { product: Product, quantity: number }
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
