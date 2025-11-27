import { Product } from "./product.js";
import { Cart } from "./cart.js";
import { Customer } from "./customer.js";


const laptop = new Product(1, "Sülearvuti", 799.99, "Elektroonika");
const phone = new Product(2, "Telefon", 699.99, "Elektroonika");

console.log(laptop.describe());
console.log(phone.describe());

console.log("Allahindlus 10%:", Product.discountedPrice(laptop.price, 10));



const cart = new Cart();
cart.addProduct(laptop, 1);
cart.addProduct(phone, 2);

console.log("Kogusumma:", cart.calculateTotal());
console.log("Kokku tooteid ostukorvis:", cart.totalItems);


const customer = new Customer("Jaanus Maasik");

customer.placeOrder(cart);
customer.printOrderHistory();
