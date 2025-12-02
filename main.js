class ClothingItem {
    size = "";
    color = "";
    type = "";
    imageSource = "";
    name = "";
    price = 0;
    constructor(size, color, type, imageSource, name, price) {
        this.size = size;
        this.color = color;
        this.type = type;
        this.imageSource = imageSource;
        this.name = name;
        this.price = Number(price);
    }
}

let closetArray = new Array(15);
