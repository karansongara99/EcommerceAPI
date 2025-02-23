import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import CartSchema from '../../Schemas/CartSchema.js';

const router = express.Router();
router.use(bodyParser.json());

//Get Cart All
router.get('/', async (req, res) => {
    const data = await CartSchema.find()
    res.send(data)
})

// Get User Cart (by UserID)
router.get("/:id", async (req, res) => {
    const data = await CartSchema.find({ UserID: req.params.id });
    res.send(data);
});

// Empty Cart (by UserID)
router.delete("/:id", async (req, res) => {
    await CartSchema.deleteMany({ UserID: req.params.id });
    res.send("Cart emptied successfully");
});

// Add Item to Cart
router.post("/:userId", async (req, res) => {
    const { ProductID, ProductQuantity } = req.body;
    const { userId } = req.params;
    const cart = await CartSchema.findOne({ UserID: userId});

    if(!cart){
        const newCartItem = new CartSchema({
            ProductID,
            ProductQuantity,
            UserID: userId
        });
    
        await newCartItem.save();
        res.send("Product added to cart");
    }

    if (existingItem) {
        existingItem.ProductQuantity += ProductQuantity;
        await existingItem.save();
        return res.send("Product quantity updated");
    }
    
    

   
   
});

// Update Cart (by CartID)
router.put("/item/:cartId", async (req, res) => {
    const { cartId } = req.params;
    const { ProductQuantity } = req.body;
    const cartItem = await CartSchema.findById(cartId);

    if (!cartItem) {
        return res.send("Cart item not found");
    }

    cartItem.ProductQuantity = ProductQuantity;
    
    await cartItem.save();
    res.send("Product quantity updated");
});

// Remove Item from Cart (by CartID)
router.delete("/item/:cartId", async (req, res) => {
    const deletedItem = await CartSchema.findByIdAndDelete(req.params.cartId);

    if (!deletedItem) {
        return res.send("Cart item not found");
    }
    res.send("Cart item removed");
});

export {router};