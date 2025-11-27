export class Order {
    constructor(cart) {
        this.orderDate = new Date();
        this.cart = cart;
    }

    printOrder() {
        console.log("Tellimuse kuupäev:", this.orderDate.toLocaleString());
        console.log("Tooted:");

        this.cart.items.forEach(i => {
            console.log(`- ${i.product.name} x${i.quantity} = ${i.product.price * i.quantity}€`);
        });

        console.log("Kogusumma:", this.cart.calculateTotal() + "€");
    }
}
