document.getElementById("carritoLogo").addEventListener("click", () =>{
    document.getElementById("Carrito").classList.toggle("active")
})



let Carrito = JSON.parse(localStorage.getItem("Carrito")) || []

const productosLista = [
    {
        id: 1,
        img: "producto1.jpg",
        nombre: "Producto 1", 
        precio: 56
        
    },
    {
        id: 2,
        img: "producto2.jpg",
        nombre: "Producto 2", 
        precio: 45
        
    },
    {
        id: 3,
        img: "producto3.jpg",
        nombre: "Producto 3", 
        precio: 87
        
    },
    {
        id: 4,
        img: "producto4.jpg",
        nombre: "Producto 4", 
        precio: 30
        
    },
    {
        id: 5,
        img: "producto5.jpg",
        nombre: "Producto 5", 
        precio: 99
        
    },
    {
        id: 6,
        img: "producto6.jpg",
        nombre: "Producto 6", 
        precio: 100
        
    }
]

const productosDom = document.getElementById("productos")
const productosCarritoDom = document.getElementById("productosCarrito")
const Total = document.getElementById("total")
const VaciarCarrito = document.getElementById("vaciarCarrito")


productosLista.forEach(prod => {
    productosDom.innerHTML += `<div class="producto">
                                    <img src=${prod.img}>
                                    <h3>${prod.nombre}</h3>
                                    <p>$ <span>${prod.precio}</span></p>
                                    <a class="btn">Agregar al carrito</a>
                                </div>`

})
const botonEliminar = () =>{
    const botonesRestar = document.getElementsByClassName("restarProducto")
    const ArrayBotonesRestar = Array.from(botonesRestar)

    ArrayBotonesRestar.forEach(prod =>{
        prod.addEventListener("click", (e) =>{
            let index = Carrito.findIndex(prod => prod.nombre == e.target.parentElement.parentElement.children[0].innerText)
            let producto = Carrito[index]
            if(producto.cantidad == 1){
                Carrito.splice(index, 1)
            }else{
                producto.cantidad -= 1
            }
            actualizarCarrito()
        })
    })
}

const botonSumar = () =>{
    const botonesSumar = document.getElementsByClassName("sumarProducto")
    const ArrayBotonesSumar = Array.from(botonesSumar)

    ArrayBotonesSumar.forEach(prod =>{
        prod.addEventListener("click", (e) =>{
            let index = Carrito.findIndex(prod => prod.nombre == e.target.parentElement.parentElement.children[0].innerText)
            let producto = Carrito[index]
            producto.cantidad += 1
            actualizarCarrito()
        })
    })
}



const actualizarCarrito = () =>{
    productosCarritoDom.innerHTML = ""
    Carrito.forEach(prod =>{
        productosCarritoDom.innerHTML += `
            <div id="producto">
                <h4>${prod.nombre}</h4>
                <p>$ ${prod.precio}</p>
                <div class="cantidadCarrito">
                    <p>Cantidad: ${prod.cantidad} </p>
                    <button class="restarProducto">-</button>
                    <button class="sumarProducto">+</button>
                </div>
                
            </div>
        `
    })
    
    
    Total.innerText = "Total: $ " + Carrito.reduce((acc, prod) =>{
        return acc + prod.precio * prod.cantidad
    }, 0)
    botonEliminar()
    botonSumar()
    localStorage.setItem("Carrito", JSON.stringify(Carrito))
}


const botones = document.getElementsByClassName("btn")
const ArrayBotones = Array.from(botones)

ArrayBotones.forEach(prod => {
    prod.addEventListener("click", (event)=>{
        let producto = Carrito.find(prod => prod.nombre == event.target.parentElement.children[1].innerText)
        if(producto){
            producto.cantidad += 1
        }else{
            Carrito.push({
                nombre: event.target.parentElement.children[1].innerText,
                cantidad: 1,
                precio: Number(event.target.parentElement.children[2].children[0].innerText)
            })
        }
        
        actualizarCarrito()
    })
})
VaciarCarrito.addEventListener("click", ()=>{
    Carrito = []
    actualizarCarrito()
})
document.addEventListener("DOMContentLoaded", () =>{
    actualizarCarrito()
})