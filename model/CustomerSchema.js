const mongoose = require('mongoose');

const schema = mongoose.Schema({
    CustomerID: String,
    CustomerName: String,
    CustomerEmailID:String,
    ContactNumber: Number,
    City:String,
    State:String,
    PinCode:Number
})

module.exports = mongoose.model("customers",schema);