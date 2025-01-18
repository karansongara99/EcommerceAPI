const mongoose = require('mongoose')

const schema = mongoose.Schema({
  OrderID: String,
  OrderStatus: String,
  OrderDate: Date,
  Quanity: Number,
  UnitPrice: Number,
  ProductID: String,
  CustomerID: String
})

module.exports = mongoose.model('orders', schema)
