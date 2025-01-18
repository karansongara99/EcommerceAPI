const mongoose = require('mongoose')
const Product = require('./model/ProductSchema')
const express = require('express')
const bodyParser = require('body-parser')

const dburl = 'mongodb://localhost:27017/ecommerce'

mongoose.connect(dburl).then(() => {
  console.log('Connected Database Server')

  const app = express()

  app.use(bodyParser.json())

  //getAll
  app.get('/api/product', async (req, res) => {
    const data = await Product.find()
    res.send(data)
  })

  //Product Name Start With S (Task)
  app.get('/api/product/s', async (req, res) => {
    try {
      const data = await Product.find({ ProductTitle: /^S/ })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Products.')
    }
  })

  //Product Only Category Electronics
  app.get('/api/product/electronics', async (req, res) => {
    try {
      const data = await Product.find({ ProductCategory: /^E/ })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Products.')
    }
  })

  //Product Quantity greater than 2
  app.get('/api/product/gt2', async (req, res) => {
    try {
      const data = await Product.find({ ProductQuantity: { $gt: 1 } })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Products.')
    }
  })

  //Product Dynamic Enter Product Category
  app.get('/api/product/category/:category', async (req, res) => {
    try {
      const category = req.params.category
      const products = await Product.find({ ProductCategory: category })
      if (products.length > 0) {
        res.status(200).send(products)
      } else {
        res
          .status(404)
          .send({ message: `No products found in category: ${category}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving products.', error: error.message })
    }
  })

  //Product Dynamic Enter Product Quanity
  app.get('/api/product/quantity/:quantity', async (req, res) => {
    try {
      const quantity = req.params.quantity
      const data = await Product.find({ ProductQuantity: quantity })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: `No product found in Quanity: ${quantity}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving products.', error: error.message })
    }
  })

  //Product Dynamic Enter Title
  app.get('/api/product/title/:title', async (req, res) => {
    try {
      const title = req.params.title
      const data = await Product.find({ ProductTitle: title })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: `No product found in title: ${title}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving products.', error: error.message })
    }
  })

  //getByID
  app.get('/api/product/:id', async (req, res) => {
    const data = await Product.findOne({ ProductID: req.params.id })
    res.send(data)
  })

  //delete
  app.delete('/api/product/delete/:id', async (req, res) => {
    const data = await Product.deleteOne({ ProductID: req.params.id })
    res.send(data)
  })

  //insert (Create)
  app.post('/api/product/create', async (req, res) => {
    const pro = new Product({
      ProductID: req.body.ProductID,
      ProductTitle: req.body.ProductTitle,
      ProductCategory: req.body.ProductCategory,
      ProductPrice: req.body.ProductPrice,
      ProductQuantity: req.body.ProductQuantity,
      ProductDescripiton: req.body.ProductDescripiton
    })
    const data = await pro.save()
    res.send(data)
  })

  //update
  app.patch('/api/product/update/:id', async (req, res) => {
    let pro = await Product.findOne({ ProductID: req.params.id })
    pro.ProductID = req.body.ProductID
    pro.ProductTitle = req.body.ProductTitle
    pro.ProductCategory = req.body.ProductCategory
    pro.ProductPrice = req.body.ProductPrice
    pro.ProductQuantity = req.body.ProductQuantity
    pro.ProductDescripiton = req.body.ProductDescripiton
    const data = await cus.save()
    res.send(data)
  })

  app.listen(4001, () => {
    console.log('Web server started 4001....')
  })
})
