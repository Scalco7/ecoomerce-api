import express from 'express'
import { Router, Request, Response } from 'express'

import dotenv from 'dotenv'
import cors from 'cors';
import { productsRoute } from './routes/products.route';

dotenv.config()
const app = express()
const route = Router()

app.use(express.json())
app.use(cors())

route.get('test', (req: Request, res: Response) => {
    res.status(200).json({ message: "Deu certo" })
})

app.use("/products", productsRoute)
app.use(route)
app.listen(process.env.PORT, () => console.log("heyy, api is listen on port: " + process.env.PORT))
