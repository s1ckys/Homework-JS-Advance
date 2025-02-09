function Product(name, category, hasDiscount, price) {
    this.name = name;
    this.category = category;
    this.hasDiscount = hasDiscount;
    this.price = price;
}

let products = [
    new Product("Apple", "Food", true, 15),
    new Product("Banana", "Food", false, 10),
    new Product("Carrot", "Food", true, 5),
    new Product("Detergent", "Cleaning", false, 25),
    new Product("Eggplant", "Food", false, 30),
    new Product("Flour", "Food", true, 12),
    new Product("Grapes", "Food", false, 18),
    new Product("Hand Soap", "Cleaning", true, 22),
    new Product("Ice Cream", "Food", true, 8),
    new Product("Juice", "Beverage", false, 20),
    new Product("Ketchup", "Food", false, 6),
    new Product("Lettuce", "Food", true, 4),
    new Product("Milk", "Beverage", true, 9),
    new Product("Notebook", "Stationery", false, 30),
    new Product("Orange", "Food", true, 14)
];

let expensiveProducts = products.filter(product => product.price > 20);
console.log("Products with price greater than 20:", expensiveProducts);

let discountedFoodNames = products
    .filter(product => product.category === "Food" && product.hasDiscount)
    .map(product => product.name);
console.log("Food products on discount:", discountedFoodNames);

let discountedPrices = products
    .filter(product => product.hasDiscount)
    .map(product => product.price);
console.log("Prices of discounted products:", discountedPrices);

let vowels = ["A", "E", "I", "O", "U"];
let vowelProducts = products
    .filter(product => vowels.includes(product.name[0].toUpperCase()) && !product.hasDiscount)
    .map(product => ({ name: product.name, price: product.price }));
console.log("Products with name starting with a vowel and not on discount:", vowelProducts);
