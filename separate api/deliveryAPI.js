const mongoose = require('mongoose')
const Delivery = require('./model/DeliverySchema')
const express = require('express')

const bodyParser = require('body-parser')

const dburl = 'mongodb://localhost:27017/ecommerce'

mongoose.connect(dburl).then(() => {
  console.log('Connected Database Server')

  const app = express()

  app.use(bodyParser.json())

  //getAll
  app.get('/api/delivery', async (req, res) => {
    const data = await Delivery.find()
    res.send(data)
  })

  //delivery Boy Name Start With R
  app.get('/api/delivery/name/R', async (req, res) => {
    try {
      const data = await Delivery.find({ DeliverName: /^R/ })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Delivery.')
    }
  })

  //Delievry Status Only Success
  app.get('/api/delivery/success', async (req, res) => {
    try {
      const data = await Delivery.find({ DeliveryStatus: 'Success' })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Delivery.')
    }
  })

  //Delievry Status Only Pending
  app.get('/api/delivery/pending', async (req, res) => {
    try {
      const data = await Delivery.find({ DeliveryStatus: 'Pending' })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Delivery.')
    }
  })

  //Delivery Dynamic Enter Deliver Name (Boy)
  app.get('/api/delivery/deliver/:name', async (req, res) => {
    try {
      const name = req.params.name
      const data = await Delivery.find({ DeliverName: name })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: `No Delivery found in name: ${name}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving Delivery.', error: error.message })
    }
  })

  //getByID
  app.get('/api/delivery/:id', async (req, res) => {
    const data = await Delivery.findOne({ DeliveryID: req.params.id })
    res.send(data)
  })

  //delete
  app.delete('/api/delivery/:id', async (req, res) => {
    const data = await Delivery.deleteOne({ DeliveryID: req.params.id })
    res.send(data)
  })

  //insert (Create)
  app.post('/api/delivery/create', async (req, res) => {
    const del = new Delivery({
      DeliveryID: req.body.DeliveryID,
      DeliverName: req.body.DeliverName,
      DeliveryAddress: req.body.DeliveryAddress,
      DeliveryDate: req.body.DeliveryDate,
      DeliveryDetail: req.body.DeliveryDetail,
      DeliveryStatus: req.body.DeliveryStatus,
      CustomerId: req.body.CustomerId,
      EmployeeID: req.body.EmployeeID,
      ProductID: req.body.ProductID,
      OrderID: req.body.OrderID
    })
    const data = await del.save()
    res.send(data)
  })

  //update
  app.patch('/api/delivery/update/:id', async (req, res) => {
    let del = await Delivery.findOne({ DeliveryID: req.params.id })
    del.DeliveryID = req.body.DeliveryID
    del.DeliverName = req.body.DeliverName
    del.DeliveryAddress = req.body.DeliveryAddress
    del.DeliveryDate = req.body.DeliveryDate
    del.DeliveryStatus = req.body.DeliveryStatus
    del.CustomerId = req.body.CustomerId
    del.EmployeeID = req.body.EmployeeID
    del.ProductID = req.body.ProductID
    del.OrderID = req.body.OrderID
    const data = await cus.save()
    res.send(data)
  })

  app.listen(4002, () => {
    console.log('Web server started 4002....')
  })
})
