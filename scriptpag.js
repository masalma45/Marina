const cartBtn = document.getElementById('cart-btn');
const cartContent = document.getElementById('cart-content');
let cartVisible = false;

// Muestra u oculta el carrito al hacer clic en el botón de carrito
cartBtn.addEventListener('click', () => {
    cartVisible = !cartVisible;
    cartContent.style.display = cartVisible ? 'block' : 'none';
});

let cart = [];

// Agrega funcionalidad a los botones "Agregar al Carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.getAttribute('data-product');
        addToCart(product);
    });
});

// Función para agregar un producto al carrito
function addToCart(product) {
    cart.push(product);
    updateCartUI();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Actualiza la interfaz del carrito
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    
    // Limpiar los items actuales
    cartItems.innerHTML = '';

    // Mostrar los productos en el carrito
    cart.forEach((product, index) => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            ${product} 
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(newItem);
    });

    // Actualiza el contador de productos
    cartCount.textContent = cart.length;
}
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    console.log('Form submitted:', { name, email, message });
    
    alert('Thank you for contacting us!');
    document.getElementById('contactForm').reset();
});
