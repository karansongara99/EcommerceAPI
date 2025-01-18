const mongoose = require('mongoose');

const schema = mongoose.Schema({
    ProductID: String,
    ProductTitle: String,
    ProductCategory: String,
    ProductPrice:Number,
    ProductQuantity:Number,
    ProductDescripiton:String
})

module.exports = mongoose.model("products",schema);