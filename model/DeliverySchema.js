const mongoose = require('mongoose');

const schema = mongoose.Schema({
    DeliveryID : String,
    DeliverName: String,
    DeliveryAddress: String,
    DeliveryDate:Date,
    DeliveryStatus: String,
    CustomerID: String,
    EmployeeID: String,
    ProductID: String,
    OrderID:String
})

module.exports = mongoose.model("deliverys",schema);