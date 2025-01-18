const mongoose = require('mongoose')
const Order = require('./model/OrderSchema')
const express = require('express')
const bodyParser = require('body-parser')

const dburl = 'mongodb://localhost:27017/ecommerce'

mongoose.connect(dburl).then(() => {
  console.log('Connected Database Server')

  const app = express()

  app.use(bodyParser.json())

  //getAll
  app.get('/api/order', async (req, res) => {
    const data = await Order.find()
    res.send(data)
  })

  //Order Status Only Success
  app.get('/api/order/success', async (req, res) => {
    try {
      const data = await Order.find({ OrderStatus: 'Success' })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Order.')
    }
  })

  //Order Status Only Pending
  app.get('/api/order/pending', async (req, res) => {
    try {
      const data = await Order.find({ OrderStatus: 'Pending' })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Order.')
    }
  })

  //getByID
  app.get('/api/order/:id', async (req, res) => {
    const data = await Order.findOne({ OrderID: req.params.id })
    res.send(data)
  })

  //delete
  app.delete('/api/order/:id', async (req, res) => {
    const data = await Order.deleteOne({ OrderID: req.params.id })
    res.send(data)
  })

  //insert (Create)
  app.post('/api/order', async (req, res) => {
    const ord = new Order({
      OrderID: req.body.OrderID,
      OrderStatus: req.body.OrderStatus,
      OrderDate: req.body.OrderDate,
      Quanity: req.body.Quanity,
      UnitPrice: req.body.UnitPrice,
      ProductID: req.body.ProductID,
      CustomerID: req.body.CustomerId
    })
    const data = await ord.save()
    res.send(data)
  })

  //update
  app.patch('/api/order/:id', async (req, res) => {
    let ord = await Order.findOne({ OrderID: req.params.id })
    ord.OrderID = req.body.OrderID
    ord.OrderStatus = req.body.OrderStatus
    ord.OrderDate = req.body.OrderDate
    ord.Quanity = req.body.Quanity
    ord.UnitPrice = req.body.UnitPrice
    ord.ProductID = req.body.ProductID
    ord.CustomerId = req.body.CustomerId
    const data = await ord.save()
    res.send(data)
  })

  app.listen(4003, () => {
    console.log('Web server started 4003....')
  })
})
