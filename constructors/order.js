export class Order {
  constructor(id, customer, items, createdAt = new Date()) {
    this.id = id;
    this.customer = customer;
    this.items = items;
    this.createdAt = createdAt;
  }

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
