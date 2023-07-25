let nombreUsuario = prompt('Ingrese su nombre');
let apellidoUsuario = prompt('Ingrese su apellido');
let edadUsuario = prompt('Ingrese su edad');

let usuario = {
    nombre: nombreUsuario,
    apellido: apellidoUsuario,
    edad: parseInt(edadUsuario),
    saludar: function() {
        alert('Bienvenido a tienda online: ' + this.nombre + ' ' + this.apellido);
  }
};

while (isNaN(usuario.edad) || usuario.edad < 18) {
    edadUsuario = prompt('Debe ingresar una edad válida y ser mayor o igual a 18 años. Ingrese su edad nuevamente:');
    usuario.edad = parseInt(edadUsuario);
}

usuario.saludar();

class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

class Venta {
    constructor() {
      this.carrito = [];
      this.total = 0;
    }
  
    agregarProducto(producto, cantidad) {
        if (producto.stock >= cantidad) {
          this.carrito.push({ producto, cantidad });
          producto.stock -= cantidad;
          this.total += producto.precio * cantidad;
          alert(`${cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
        } else {
          alert(`Lo sentimos, no hay suficiente stock de ${producto.nombre}.`);
        }
      }
    
      mostrarCarrito() {
        let carritoInfo = "Carrito de compra:\n";
        this.carrito.forEach((item) => {
          carritoInfo += `${item.cantidad} ${item.producto.nombre}(s) - Precio unitario: $${item.producto.precio}\n`;
        });
        carritoInfo += `Total a pagar: $${this.total}`;
        alert(carritoInfo);
      }
}

const productos = [
    new Producto("Camiseta", 20, 10),
    new Producto("Pantalón", 30, 8),
    new Producto("Buzo", 40, 5),
  ];
  
const venta = new Venta();
  
    productos.forEach((producto) => {
        const cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto.nombre} que desea comprar:`));
        venta.agregarProducto(producto, cantidad);
  });

const listaDeProductos = productos.map((producto) => producto.nombre);
console.log("Listado de productos disponibles: " + listaDeProductos);

venta.mostrarCarrito();