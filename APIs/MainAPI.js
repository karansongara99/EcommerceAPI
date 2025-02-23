import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
dotenv.config();

import { router as CartRouter} from './Routers/CartRouter.js'
import CategoryRouter from './Routers/CategoryRouter.js'
import OrderRouter from './Routers/OrderRouter.js'
import ProductRouter from './Routers/ProductRouter.js'
import RemarkRouter from './Routers/RemarkRouter.js'
import UserRouter from './Routers/UserRouter.js'

const app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/webecommerce').then(() => {
    console.log("Ecommerce 🚀✈️ Database Connected....");
    

    app.use("/cart",CartRouter);
    app.use("/category",CategoryRouter);
    app.use("/order",OrderRouter);
    app.use("/product",ProductRouter);
    app.use("/remark",RemarkRouter);
    app.use("/user",UserRouter);

    app.listen(3000,()=>{
        console.log("Server Started at 🚀✈️");
    })
})