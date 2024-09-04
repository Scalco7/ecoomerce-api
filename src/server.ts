import express from 'express'
import { Router } from 'express'

import dotenv from 'dotenv'
import cors from 'cors';
import { productsRoute } from './routes/products.route';

dotenv.config()
const app = express()
const route = Router()

app.use(express.json())
app.use(cors())

app.use("/products", productsRoute)
app.listen(process.env.PORT, () => console.log("heyy, api is listen on port: " + process.env.PORT))
