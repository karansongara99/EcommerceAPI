const mongoose = require('mongoose')
const Customer = require('./model/CustomerSchema')
const express = require('express')
const bodyParser = require('body-parser')

const dburl = 'mongodb://localhost:27017/ecommerce'

mongoose.connect(dburl).then(() => {
  console.log('Connected Database Server')

  const app = express()

  app.use(bodyParser.json())

  //getAll
  app.get('/api/customer', async (req, res) => {
    const data = await Customer.find()
    res.send(data)
  })

  //Customer Dynamic Enter Name
  app.get('/api/customer/name/:name', async (req, res) => {
    try {
      const name = req.params.name
      const data = await Customer.find({ CustomerName: name })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res
          .status(404)
          .send({ message: `No customers found in name: ${name}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving customers.', error: error.message })
    }
  })

  //Customer Dynamic Enter City
  app.get('/api/customer/city/:city', async (req, res) => {
    try {
      const city = req.params.city
      const data = await Customer.find({ City: city })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res
          .status(404)
          .send({ message: `No customers found in city: ${city}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving customers.', error: error.message })
    }
  })

  //getByID
  app.get('/api/customer/:id', async (req, res) => {
    const data = await Customer.findOne({ CustomerID: req.params.id })
    res.send(data)
  })

  //delete
  app.delete('/api/customer/delete/:id', async (req, res) => {
    const data = await Customer.deleteOne({ CustomerID: req.params.id })
    res.send(data)
  })

  //insert (Create)
  app.post('/api/customer/create', async (req, res) => {
    const cus = new Customer({
      CustomerID: req.body.CustomerID,
      CustomerName: req.body.CustomerName,
      CustomerEmailID: req.body.CustomerEmailID,
      ContactNumber: req.body.ContactNumber,
      City: req.body.City,
      State: req.body.State,
      PinCode: req.body.PinCode
    })
    const data = await cus.save()
    res.send(data)
  })

  //Customer Dynamic Enter State
  app.get('/api/customer/state/:state', async (req, res) => {
    try {
      const state = req.params.state
      const data = await Customer.find({ State: state })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res
          .status(404)
          .send({ message: `No customers found in state: ${state}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving customers.', error: error.message })
    }
  })

  //update
  app.patch('/api/customer/update/:id', async (req, res) => {
    let cus = await Customer.findOne({ CustomerID: req.params.id })
    cus.CustomerID = req.body.CustomerID
    cus.CustomerName = req.body.CustomerName
    cus.CustomerEmailID = req.body.CustomerEmailID
    cus.ContactNumber = req.body.ContactNumber
    cus.City = req.body.City
    cus.State = req.body.State
    cus.PinCode = req.body.PinCode
    const data = await cus.save()
    res.send(data)
  })

  app.listen(4000, () => {
    console.log('Web server started 4000....')
  })
})
