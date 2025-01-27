document.getElementById("carritoLogo").addEventListener("click", () =>{
    document.getElementById("Carrito").classList.toggle("active")
})

document.getElementById("vaciarCarrito").addEventListener("click", ()=>{
    
        Swal.fire({
            text: "Carrito vaciado!",
            icon: "success",
            toast: true, 
            showConfirmButton: false,
            timer: 1500
    
        })
        
})


let Carrito = JSON.parse(localStorage.getItem("Carrito")) || []


const productosDom = document.getElementById("productos")
const carritoDom = document.getElementById("contenedorCarrito")
const VaciarCarrito = document.getElementById("vaciarCarrito")
const comprar = document.getElementById("finalizarCompra")
const totalDom = document.getElementById("total")
const verMasDom = document.getElementById("verMas")
let ultimoValor = 0
let productosArray



function actualizarCarrito(){
    carritoDom.innerHTML = ""

    localStorage.setItem("Carrito", JSON.stringify(Carrito))

    Carrito.forEach(el => {
        const {id, imagen, nombre, precio, cantidad} = el

        const container = document.createElement("div")
        container.classList.add("card-carrito")

        const cantidadDom = document.createElement ("div")
        cantidadDom.classList.add("cantDom")

        const img = document.createElement("img")
        const titulo = document.createElement("h3")
        const precioDOM = document.createElement("p")

        titulo.innerText = nombre
        img.src = imagen
        precioDOM.innerText = "$" + precio

        img.classList.add("imagenCart")

        const botonMas = document.createElement("button")
        const botonMenos = document.createElement("button")
        const cantidadTexto = document.createElement("p")

        botonMas.innerText = "+"
        botonMenos.innerText = "-"
        cantidadTexto.innerText = cantidad

        botonMas.classList.add("btnCart")
        botonMenos.classList.add("btnCart")


        botonMas.addEventListener("click", ()=>{
            let index = Carrito.findIndex(el => el.id == id)
        
            Carrito[index].cantidad += 1
            actualizarCarrito()   
        })

        botonMenos.addEventListener("click", ()=>{
            let index = Carrito.findIndex(el => el.id == id)
            
            if(Carrito[index].cantidad == 1){
                
                Carrito.splice(index, 1)
            }else{
                Carrito[index].cantidad -= 1
            }
            actualizarCarrito()
        })

        container.append(img, titulo)
        cantidadDom.append(precioDOM, botonMenos,  cantidadTexto, botonMas)
        carritoDom.append(container, cantidadDom)
    })
    totalDom.innerText = "Total: $ " + Carrito.reduce((acc, el) =>{
        return acc + el.precio * el.cantidad
    }, 0)
    
   
}





VaciarCarrito.addEventListener("click", ()=>{
    Carrito = []
    actualizarCarrito()
})



function creadoraDeCards({id, nombre, precio, imagen}){
    
    const container = document.createElement("div")
    container.classList.add("producto")

    const img = document.createElement("img")
    const titulo = document.createElement("h2")
    const precioDOM = document.createElement("p")
    const boton = document.createElement("button")

    boton.classList.add("btn")

    img.src = imagen
    titulo.innerText = nombre
    precioDOM.innerText = "$" + precio
    precioDOM.classList.add("precioProd")
    img.classList.add("imagenProd")

    boton.innerText = "Agregar al carrito"

    container.append(img, titulo, precioDOM, boton)

    boton.addEventListener("click", () =>{
        let index = Carrito.findIndex(el => el.id == id)
        
        if(index == -1){
            Carrito.push({
                id,
                imagen,
                nombre,
                precio, 
                cantidad: 1

            })
        }else(
            Carrito[index].cantidad += 1
        )

        actualizarCarrito()

        Swal.fire({
            title: nombre + " agregado al carrito",
            timer : 1000,
            showConfirmButton: false,  
            toast: true,
            position: "bottom-start",
            background: "#91B882",
            color: "#fff",
            iconColor: "#fff",
            padding: "0"
        })
    })

    productosDom.appendChild(container)
}
comprar.addEventListener("click", ()=>{
    let total = Carrito.reduce((acc, el) =>{
        return acc + el.precio * el.cantidad 

    }, 0)

    if (total == 0){
        Swal.fire({
            title: "Su carrito está vacío",
            confirmButtonText: "Seguir comprando",
            confirmButtonColor:  "#91b882",
        })
    }else{
        Swal.fire({
            title: "El total de su compra es: $ " + total,
            showCancelButton: true,
            cancelButtonText: "Seguir comprando",
            confirmButtonColor:  "#91b882",
            confirmButtonText: "Comprar"
        }).then((result) =>{
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Gracias por su compra!\n Ingrese su email",
                    input: "email",
                    confirmButtonColor:  "#91b882"
                }).then((result) =>{
                    Swal.fire({
                        title: "Su pedido está en camino!",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    Carrito = []
                    actualizarCarrito()
                })
            }else if (result.isDenied){
                return
            }
        })
    }
})

verMasDom.addEventListener("click", (e) =>{
    let aux = ultimoValor + 1

    if (aux >= productosArray.length){
        e.target.innerText = "No hay mas productos para mostrar"
        return
    }

    if(ultimoValor + 5 > productosArray.length){
        for (let i = aux; i <= aux + 5; i++) {
            creadoraDeCards(productosArray[i])
            ultimoValor = i
        }

    }else{
        for(let i = aux; i <= aux + 5; i++){
            creadoraDeCards(productosArray[i])
            ultimoValor = i
        }
    }

})

document.addEventListener("DOMContentLoaded", async () =>{
    const response = await fetch('data.json')
    const data = await response.json()

    productosArray = data
    
    for (let i = 0; i <= 5; i++) {
        creadoraDeCards(productosArray[i])
        ultimoValor = i
    }

    
    actualizarCarrito()
})

