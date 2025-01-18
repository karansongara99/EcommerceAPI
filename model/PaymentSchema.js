const mongoose = require('mongoose');

const schema = mongoose.Schema({
    PaymentID: String,
    PaymentType:String,
    PaymentAmount:Number,
    PaymentDate:Date,
    PaymentStatus:String,
    PaymentTransactionNO:Number,
    CustomerName: String
})

module.exports = mongoose.model("payments",schema);