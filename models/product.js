class Product {
    constructor(id, ownerId, title, imageUrl, description, price) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

export default Product;