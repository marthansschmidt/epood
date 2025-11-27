export class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    describe() {
        return `${this.name} | ${this.price}€ | Kategooria: ${this.category}`;
    }

    static discountedPrice(price, percent) {
    const discounted = price - (price * (percent / 100));
    return Number(discounted.toFixed(2));
}
}
