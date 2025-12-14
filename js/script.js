let products = [
    {
        id: 1,
        name: "iPhone 13",
        image: "img/test.avif",
        description: "Потужний смартфон з чудовою камерою.",
        type: "phone",
        price: 28000
    },
    {
        id: 2,
        name: "MacBook Air",
        image: "img/test.avif",
        description: "Легкий та швидкий ноутбук для роботи.",
        type: "laptop",
        price: 45000
    }
];

let cart = [];

let productsContainer = document.querySelector('.products-div');
let btnGroup = document.querySelector('.btn-group');

function renderProducts(items) {
    productsContainer.innerHTML = ""
    if (items.length == 0) {
        productsContainer.innerHTML = '<p>Товарів не знайдено</p>'
        return;
    }

    items.forEach(function(item) {
        let productHTML = `
            <article class="product" data-id="${item.id}">
                <img src="${item.image}" alt="" class="product-img">
                <h3 class="product-title">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <p class="product-price"><strong>${item.price} грн</strong></p>
                <button type="button" class="btn btn-primary add-to-cart-btn">До кошику</button>
            </article>
        `
        productsContainer.innerHTML += productHTML
    })
}

function applyFilters(categoryType) {
    if (categoryType == "all") {
        renderProducts(products)
    } else {
        let filteredProducts = products.filter(product => product.type == categoryType);
        renderProducts(filteredProducts)
    }
}

function addToCart(productId) {
    let cartProduct = cart.find(p => p.id == productId);
    if (cartProduct) {
        cartProduct.quantity += 1;
    }
    else {
        let product = products.find(p => p.id == productId);
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Товар додано!")
}

let productsMap = {
    "Всі": "all",
    "Телефони": "phone",
    "Ноутбуки": "laptop"
}

function setupFilterButtons() {
    for (let button of btnGroup.children) {
        button.addEventListener("click", function() {
            let category = productsMap[button.innerHTML]
            applyFilters(category)
        })
    }
}

productsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        let productCard = event.target.closest('.product');
        let productId = parseInt(productCard.dataset.id)
        addToCart(productId)
    }
})

renderProducts(products)
setupFilterButtons()
