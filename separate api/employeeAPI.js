const mongoose = require('mongoose')
const Employee = require('./model/EmployeeSchema')
const express = require('express')
const bodyParser = require('body-parser')

const dburl = 'mongodb://localhost:27017/ecommerce'

mongoose.connect(dburl).then(() => {
  console.log('Connected Database Server')

  const app = express()

  app.use(bodyParser.json())

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

  app.listen(4004, () => {
    console.log('Web server started 4004....')
  })
})
