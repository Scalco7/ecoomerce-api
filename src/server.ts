import express from 'express'

import dotenv from 'dotenv'
import cors from 'cors';
import { productsRoute } from './routes/products.route';
import { couponRoute } from './routes/coupon.route';
import { orderRoute } from './routes/order.route';

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/products", productsRoute)
app.use("/api/coupon", couponRoute)
app.use("/api/order", orderRoute)
app.listen(process.env.PORT, () => console.log("heyy, api is listen on port: " + process.env.PORT))
