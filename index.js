const mongoose = require('mongoose')
const Customer = require('./model/CustomerSchema')
const Product = require('./model/ProductSchema')
const Employee = require('./model/EmployeeSchema')
const Order = require('./model/OrderSchema')
const Delivery = require('./model/DeliverySchema')
const Payment = require('./model/PaymentSchema')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

/*------

separate api folder
separate model Schema
.env file port setup
The separate content within api code. 
Here's a main file index.js run in all api:

*/

const dburl = 'mongodb://localhost:27017/ecommerce'

mongoose.connect(dburl).then(() => {
  console.log('Connected Database Server')

  const app = express()

  //Middleware
  app.use(bodyParser.json())

  //API Code Start-------------------------------

  //Customer Start

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
        res.status(404).send({ message: `No customers found in name: ${name}` })
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
        res.status(404).send({ message: `No customers found in city: ${city}` })
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

  //Customer End

  //Product Start

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
        res
          .status(404)
          .send({ message: `No product found in Quanity: ${quantity}` })
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

  //Product End

  //Employee Start

  //getAll
  app.get('/api/employee', async (req, res) => {
    const data = await Employee.find()
    res.send(data)
  })

  //Employee Name Start With K (Task)
  app.get('/api/employee/K', async (req, res) => {
    try {
      const data = await Employee.find({ EmployeeName: /^K/ })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving employees.')
    }
  })

  //Employee Dynamic Enter Employee Name
  app.get('/api/employee/name/:name', async (req, res) => {
    try {
      const name = req.params.name
      const data = await Employee.find({ EmployeeName: name })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: `No employee found in name: ${name}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving Employee.', error: error.message })
    }
  })

  //Employee Dynamic Enter name
  app.get('/api/employee/name/:name', async (req, res) => {
    try {
      const name = req.params.name
      const data = await Employee.find({ EmployeeName: name })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: `No employee found in state: ${name}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving Employee.', error: error.message })
    }
  })

  //Employee Dynamic Enter State
  app.get('/api/employee/state/:state', async (req, res) => {
    try {
      const state = req.params.state
      const data = await Employee.find({ State: state })
      if (data.length > 0) {
        res.status(200).send(data)
      } else {
        res
          .status(404)
          .send({ message: `No employee found in state: ${state}` })
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send({ message: 'Error retrieving employee.', error: error.message })
    }
  })

  //Employee City Only Rajkot City (Task)
  app.get('/api/employee/Rajkot', async (req, res) => {
    try {
      const data = await Employee.find({ City: /^R/ })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving employees.')
    }
  })

  //Employee State Only Maharastra
  app.get('/api/employee/Maharastra', async (req, res) => {
    try {
      const data = await Employee.find({ State: /^M/ })
      res.send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error retrieving employees.')
    }
  })

  //getByID
  app.get('/api/employee/:id', async (req, res) => {
    const data = await Employee.findOne({ EmployeeID: req.params.id })
    res.send(data)
  })

  //delete
  app.delete('/api/employee/:id', async (req, res) => {
    const data = await Employee.deleteOne({ EmployeeID: req.params.id })
    res.send(data)
  })

  //insert (Create)
  app.post('/api/employee/create', async (req, res) => {
    const emp = new Employee({
      EmployeeID: req.body.EmployeeID,
      EmployeeName: req.body.EmployeeName,
      EmployeeEmailID: req.body.EmployeeEmailID,
      ContactNumber: req.body.ContactNumber,
      City: req.body.City,
      State: req.body.State
    })
    const data = await emp.save()
    res.send(data)
  })

  //update
  app.patch('/api/employee/update/:id', async (req, res) => {
    let emp = await Employee.findOne({ EmployeeID: req.params.id })
    emp.EmployeeID = req.body.EmployeeID
    emp.EmployeeName = req.body.EmployeeName
    emp.EmployeeEmailID = req.body.EmployeeEmailID
    emp.ContactNumber = req.body.ContactNumber
    emp.City = req.body.City
    emp.State = req.body.State
    const data = await emp.save()
    res.send(data)
  })

  //Employee End

  //Order Start

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

  //Order End

  //Delivery Start

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

  //Delivery End

  //Payemnt Start

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
  //Payment End

  //API Code End---------------------------------

  /*------

separate api folder
separate model Schema
.env file port setup
The separate content within api code. 
Here's a main file index.js run in all api:

*/

  app.listen(process.env.PORT, () => {
    console.log('Web server started 3005....')
  })
})
