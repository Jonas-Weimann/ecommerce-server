import express from "express"
import ProductsRoute from "./routes/products.route.js"
import CartsRoute from "./routes/carts.route.js"
import { __dirname } from "./utils.js"

const app = express()

app.use(express.json())
app.use('/api/products/', ProductsRoute)
app.use('/api/carts/', CartsRoute)

app.listen(8080, ()=>{
    console.log("Server is running on port 8080")
})