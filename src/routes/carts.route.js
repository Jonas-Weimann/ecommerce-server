import { Router } from "express";
import { leerJSON, actualizarJSON } from "../utils.js"
import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.post("/", (req, res) =>{
    const carritos = leerJSON("src/db/carritos.json")
    const carrito = req.body
    carrito.id = uuidv4()
    if(!carrito.products || !Array.isArray(carrito.products)){
        return res.status(400).json({error: "El carrito debe tener una lista de productos"})
    }
    carritos.push(carrito)
    actualizarJSON("src/db/carritos.json", carritos)
    res.json({mensaje: "Carrito agregado con éxito"})
})

router.get("/:cid", (req, res)=>{
    const carritos = leerJSON("src/db/carritos.json")
    const { cid } = req.params
    const carrito = carritos.find(carrito => carrito.id === cid)
    if(!carrito){
        return res.status(404).json({error: "Carrito no encontrado"})
    }
    res.send(carrito.products)
})

router.post("/:cid/product/:pid", (req, res) => {
    const carritos = leerJSON("src/db/carritos.json")
    const productos = leerJSON("src/db/productos.json")
    const { cid, pid } = req.params
    const carrito = carritos.find(carrito => carrito.id === cid)
    const producto = productos.find(producto => producto.id === pid)
    if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" })
    }
    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" })
    }

    const productoEnCarrito = carrito.products.find(prod => prod.product === pid)
    if (productoEnCarrito) {
        productoEnCarrito.quantity++;
    } else {
        carrito.products.push({ product: pid, quantity: 1 })
    }
    const carritosActualizados = carritos.map(cart => cart.id === cid ? carrito : cart)
    actualizarJSON("src/db/carritos.json", carritosActualizados)
    return res.json({ mensaje: "Producto agregado con éxito" })
})

export default router