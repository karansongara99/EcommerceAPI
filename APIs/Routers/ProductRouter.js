import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import ProductSchema from '../../Schemas/ProductSchema.js';

const router = express.Router();
router.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../Images/ProductImage'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add Product API (POST)
router.post("/create/product", upload.single('ProductImage'), async (req, res) => {
    const { ProductID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
    const ProductImage = req.file ? req.file.filename : null;

    const newProduct = new ProductSchema({
        ProductID,
        ProductImage,
        ProductName,
        ProductDescription,
        ProductPrice,
        ProductQuantity,
        ProductDiscount,
        CategoryID
    });

    await newProduct.save();
    res.send("Product created successfully");
});

// Update Product API (PUT)
router.put("/:id", upload.single('ProductImage'), async (req, res) => {
    const { ProductID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductDiscount, CategoryID } = req.body;
    const ProductImage = req.file ? req.file.filename : null;

    const updatedProduct = await ProductSchema.findByIdAndUpdate(
        req.params.id,
        {
            ProductID,
            ProductName,
            ProductDescription,
            ProductPrice,
            ProductQuantity,
            ProductDiscount,
            CategoryID,
            ProductImage: ProductImage || undefined
        },
        { new: true }
    );

    if (!updatedProduct) {
        return res.send("Product not found");
    }
    res.send("Product updated successfully");
});

// Get All Products (GET)
router.get("/", async (req, res) => {
    const products = await ProductSchema.find();
    console.log(products);
    res.send(products);
});

// Get Product By ID (GET)
router.get("/:id", async (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Product ID is required");
    }
    const product = await ProductSchema.findById(req.params.id);

    if (!product) {
        return res.send("Product not found");
    }
    res.send(product);
});

// Delete Product By ID (DELETE)
router.delete("/:id", async (req, res) => {
    const deletedProduct = await ProductSchema.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
        return res.send("Product not found");
    }
    res.send("Product deleted successfully");
});

//Product Dynamic Enter Name
router.get('/name/:name', async (req, res) => {
    
      const name = req.params.name
      const data = await ProductSchema.find({ ProductName: name })
      if (data.length > 0) {
        res.send(data)
      } else {
        res.send({ message: `No product found in title: ${name}` })
      }
  })

export default router;