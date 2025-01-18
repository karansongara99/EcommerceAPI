const mongoose = require('mongoose')
const Payment = require('./model/PaymentSchema')
const express = require('express')
const bodyParser = require('body-parser')

const dburl = 'mongodb://localhost:27017/ecommerce'

mongoose.connect(dburl).then(() => {
  console.log('Connected Database Server')

  const app = express()

  //Middleware
  app.use(bodyParser.json())

  //getAll
  app.get('/api/payment', async (req, res) => {
    const data = await Payment.find()
    res.send(data)
  })

  //Payment Type Only Cash on Delivery (Task)
  app.get('/api/payment/type/cash', async (req, res) => {
    try {
      const data = await Payment.find({ PaymentType: 'Cash On Delivery' })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Payment.')
    }
  })

  //Payment Status Completed (Task)
  app.get('/api/payment/status/completed', async (req, res) => {
    try {
      const data = await Payment.find({ PaymentStatus: 'Completed' })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Payment.')
    }
  })

  //Payment Status Pending
  app.get('/api/payment/status/pending', async (req, res) => {
    try {
      const data = await Payment.find({ PaymentStatus: 'Pendings' })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving Payment.')
    }
  })

  //Payment Dynamic Enter Payemnt Type
  app.get('/api/payment/type/:type', async (req, res) => {
    try {
      const type = req.params.type
      const data = await Payment.find({ PaymentType: type })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: `No Payment found in Type: ${type}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving payment.', error: error.message })
    }
  })

  //getByID
  app.get('/api/payment/:id', async (req, res) => {
    const data = await Payment.findOne({ PaymentID: req.params.id })
    res.send(data)
  })

  //delete
  app.delete('/api/payment/:id', async (req, res) => {
    const data = await Payment.deleteOne({ PaymentID: req.params.id })
    res.send(data)
  })

  //insert (Create)
  app.post('/api/payment', async (req, res) => {
    const pay = new Payment({
      PaymentID: req.body.PaymentID,
      PaymentType: req.body.PaymentType,
      PaymentAmount: req.body.PaymentAmount,
      PaymentDate: req.body.PaymentDate,
      PaymentStatus: req.body.PaymentStatus,
      PaymentTransactionNO: req.body.PaymentTransactionNO,
      CustomerName: req.body.CustomerName
    })
    const data = await pay.save()
    res.send(data)
  })

  //update
  app.patch('/api/payment/:id', async (req, res) => {
    let pay = await Payment.findOne({ ProductID: req.params.id })
    ;(pay.PaymentID = req.body.PaymentID),
      (pay.PaymentType = req.body.PaymentType),
      (pay.PaymentAmount = req.body.PaymentAmount),
      (pay.PaymentDate = req.body.PaymentDate),
      (pay.PaymentStatus = req.body.PaymentStatus),
      (pay.PaymentTransactionNO = req.body.PaymentTransactionNO),
      (pay.CustomerName = req.body.CustomerName)
    const data = await pay.save()
    res.send(data)
  })

  app.listen(4005, () => {
    console.log('Web server started 4005....')
  })
})
