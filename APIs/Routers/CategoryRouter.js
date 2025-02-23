import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import CategorySchema from '../../Schemas/CategorySchema.js';

const router = express.Router();
router.use(bodyParser.json());

// 1. Get All Categories
router.get("/", async (req, res) => {
    const categories = await CategorySchema.find();
    res.send(categories);
});

// 2. Get Category by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const category = await CategorySchema.findById(id);

    if (!category) {
        return res.send("Category not found");
    }
    res.send(category);
});

// 3. Insert a New Category
router.post("/", async (req, res) => {
    const { CategoryID, CategoryName } = req.body;

    const newCategory = new CategorySchema({
        CategoryID,
        CategoryName
    });

    await newCategory.save();
    res.send({ message: "Category created successfully", category: newCategory });
});

// 4. Update Category by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { CategoryID, CategoryName } = req.body;
    const category = await CategorySchema.findById(id);

    if (!category) {
        return res.send("Category not found");
    }
    
    category.CategoryID = CategoryID;
    category.CategoryName = CategoryName;

    await category.save();
    res.send("Category updated successfully");
});

// 5. Delete Category by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const category = await CategorySchema.findByIdAndDelete(id);
    
    if (!category) {
        return res.send("Category not found");
    }
    res.send("Category deleted successfully");
});

//Product Dynamic Enter Product Category
router.get('/title/:category', async (req, res) => {
      const category = req.params.category
      const products = await CategorySchema.find({ CategoryName: category })
      if (products.length > 0) {
        res.send(products)
      } else {
        res.send({ message: `No products found in category: ${category}` })
      }
  })

export default router;