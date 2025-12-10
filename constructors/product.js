export class Product {
  constructor(id, name, category, price, description, imageUrl, isFavorite = false) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.isFavorite = isFavorite;
  }
}
