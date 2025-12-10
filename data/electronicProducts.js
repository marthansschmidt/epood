import { Product } from "../constructors/product.js";

export const electronicProducts = [
  new Product(
    101,
    "HyperNova X15 Gaming Laptop",
    "Elektroonika",
    1499.99,
    "15.6'' 165Hz QHD ekraan, RTX 4070, 16GB RAM, 1TB SSD.",
    "https://via.placeholder.com/250x160?text=HyperNova+X15",
    true
  ),

  new Product(
    102,
    "AeroSound Pro Wireless Headphones",
    "Elektroonika",
    199.00,
    "Aktiivne mürasummutus, 40h aku, Bluetooth 5.3.",
    "https://via.placeholder.com/250x160?text=AeroSound+Pro",
    false
  ),

  new Product(
    103,
    "SkyVision 55'' 4K OLED TV",
    "Elektroonika",
    899.99,
    "55'' OLED ekraan HDR10+ toega, 120Hz.",
    "https://via.placeholder.com/250x160?text=SkyVision+OLED",
    true
  )
];
