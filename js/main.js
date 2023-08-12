document.addEventListener("DOMContentLoaded", function() {
    const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
    const carritoContainer = document.getElementById('carrito-container');
    const mostrarCarritoBtn = document.getElementById('mostrar-carrito');
    const limpiarCarritoButton = document.getElementById("limpiar-carrito");
    const realizarCompraBtn = document.getElementById('realizar-compra-btn');

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarCarrito() {
        const carritoList = carritoContainer.querySelector("#carrito");
        carritoList.innerHTML = "";
        carrito.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            carritoList.appendChild(listItem);
        });
    }

    agregarCarritoButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            const productId = event.target.getAttribute("data-id");
            
            fetch('../producto.json')
                .then(response => response.json())
                .then(productData => {
                    const selectedProduct = productData.find(producto => producto.id == productId);
        
                    if (selectedProduct) {
                        const productName = selectedProduct.nombre;
        
                        carrito.push(productName);
                        localStorage.setItem("carrito", JSON.stringify(carrito));
        
                        actualizarCarrito();
        
                        Swal.fire({
                            icon: 'success',
                            title: '¡Producto agregado!',
                            text: `Se ha agregado ${productName} al carrito.`,
                            timer: 2500,
                            showConfirmButton: false
                        });
                    }
                })
                .catch(error => {
                    console.error('Error al obtener los datos del producto:', error);
                });
        });
        
    });

    realizarCompraBtn.addEventListener('click', () => {

        Swal.fire({
            icon: 'success',
            title: '¡Compra Realizada!',
            text: '¡Tu compra ha sido realizada con éxito!',
            showConfirmButton: true
        });
        
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });

    limpiarCarritoButton.addEventListener('click', function() {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();

        Swal.fire({
            icon: 'success',
            title: '¡Carrito Vacio!',
            text: 'El contenido del carrito ha sido limpiado.',
            showConfirmButton: false,
            timer: 3000
        });
    });

    carritoContainer.addEventListener('mouseleave', function() {
        carritoContainer.classList.add('hidden');
    });

    mostrarCarritoBtn.addEventListener('click', () => {
        carritoContainer.classList.toggle('hidden');
        const totalContainer = document.getElementById('total');
        totalContainer.textContent = `Total: $${calcularTotal().toFixed(2)}`;
    });

    actualizarCarrito();
});