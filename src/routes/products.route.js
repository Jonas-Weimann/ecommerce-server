import { Router } from "express";
import { leerJSON, actualizarJSON } from "../utils.js"
import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.get("/",(req, res)=>{
    const productos = leerJSON("src/db/productos.json")
    const query = req.query
    if(query.limit){
        return res.json(productos.slice(0, query.limit))
    }
    res.json(productos)
})

router.get("/:pid",(req, res)=>{
    const productos = leerJSON("src/db/productos.json")
    const {pid} = req.params
    const producto = productos.find(producto => producto.id == pid)
    if(!producto){
        return res.status(404).json({error: "producto no encontrado"})
    }
    res.json(producto)
})

router.post("/",(req, res)=>{
    const productos = leerJSON("src/db/productos.json")
    const producto = req.body
    producto.id = uuidv4()
    producto.status = producto.status ?? true 
    if(!producto.title || !producto.description || !producto.code || !producto.price || !producto.stock || !producto.category){
        return res.status(400).json({error: "Hay campos obligatorios faltantes"})
    }
    const productosActualizados = productos.push(producto)
    actualizarJSON("src/db/productos.json", productosActualizados)
    res.json({mensaje: "Producto agregado con éxito"})
})

router.put("/:pid",(req, res)=>{
    const productos = leerJSON("src/db/productos.json")
    const productoActualizado = req.body
    const {pid} = req.params

    const productoEncontrado = productos.find(producto => producto.id === pid)
    if(!productoEncontrado){
        return res.status(404).json({error: "Producto no encontrado"})
    }

    const productoNuevo = {
        ...productoEncontrado,
        ...productoActualizado
    }

    const productosActualizados = productos.map(producto => producto.id === pid ? productoNuevo : producto)

    actualizarJSON("src/db/productos.json", productosActualizados)

    res.json({mensaje: "Producto actualizado con éxito"})
})

router.delete("/:pid",(req, res)=>{
    const productos = leerJSON("src/db/productos.json")
    const {pid} = req.params

    const productoEncontrado = productos.find(producto => producto.id === pid)
    if(!productoEncontrado){
        return res.status(404).json({error: "Producto no encontrado"})
    }

    const productosActualizados = productos.filter(producto => producto.id !== pid)

    actualizarJSON("src/db/productos.json", productosActualizados)

    res.json({mensaje: "Producto eliminado con éxito"})
})

export default router