
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];


products.forEach((element) => {
    document.querySelector('ul').innerHTML += `<li>${element.name} price: ${element.price} stock-cost: ${element.stock}</li>`
})

const totalPrices = products.reduce((accumulated, valueToSum) => accumulated + valueToSum.price, 0 )
document.querySelector('ul').innerHTML += `<li><strong>precio total: ${totalPrices}</strong></li>`


const cate = 'Accessories'
let productsFiltered = products.filter((element) =>
    element.category == cate
);

console.log(productsFiltered);

productsFiltered.forEach((element) => {
    document.querySelector('ul').innerHTML += `
    <br>
    <li><em>${element.name} price: ${element.price} stock-cost: ${element.stock}</em></li>`
})


let nombre = 'Watch';
const div = document.createElement('div');
const lista = products.find((element) => element.name === nombre)
div.textContent = `${lista.name} ${lista.category}`;
console.log(lista);

document.querySelector('body').appendChild(div);

console.log(products.every((element) => element.stock > 0 ));


let arrayNames = [];

products.map((element) => {
    arrayNames.push(element.name)
})

console.log(arrayNames);
