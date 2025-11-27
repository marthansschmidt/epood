import { Order } from "./order.js";

export class Customer {
    constructor(name) {
        this.name = name;
        this.orderHistory = [];
    }

    placeOrder(cart) {
        const order = new Order(cart);
        this.orderHistory.push(order);
        return order;
    }

    printOrderHistory() {
        console.log(`\nTellimuste ajalugu: ${this.name}`);

        this.orderHistory.forEach((order, i) => {
            console.log(
                `${i + 1}. Kuupäev: ${order.orderDate.toLocaleString()} | Summa: ${order.cart.calculateTotal()}€`
            );
        });
    }
}
