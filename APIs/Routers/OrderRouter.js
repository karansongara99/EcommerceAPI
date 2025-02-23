import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import OrderSchema from '../../Schemas/OrderSchema.js';

const router = express.Router();
router.use(bodyParser.json());

// 1. Get All Orders
router.get("/", async (req, res) => {
    const orders = await OrderSchema.find().populate("UserID ProductItems.ProductID");
    res.send(orders);
});

// 2. Get Order by ID
router.get("/orders/:id", async (req, res) => {
    const { id } = req.params;
    const order = await OrderSchema.findById(id).populate("UserID ProductItems.ProductID");
    if(!req.params.id){
        return res.status(400).send("Order ID is required");
    }
    if (!order) {
        return res.send("Order not found");
    }
    res.send(order);
});

// 3. Create New Order
router.post("/orders", async (req, res) => {
    const { OrderID, UserID, ProductItems, TotalAmount, OrderDate } = req.body;

    const newOrder = new OrderSchema({
        OrderID,
        UserID,
        ProductItems,
        TotalAmount,
        OrderDate
    });

    await newOrder.save();
    res.send({ message: "Order created successfully", order: newOrder });
});

// 5. Delete Order by ID
router.delete("/orders/:id", async (req, res) => {
    const { id } = req.params;
    const order = await OrderSchema.findByIdAndDelete(id);
    
    if (!order) {
        return res.send("Order not found");
    }
    res.send("Order deleted successfully");
});

export default router;