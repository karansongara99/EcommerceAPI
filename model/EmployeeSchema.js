const mongoose = require('mongoose');

const schema = mongoose.Schema({
    EmployeeID: String,
    EmployeeName: String,
    EmployeeEmailID:String,
    ContactNumber: Number,
    City:String,
    State:String,
})

module.exports = mongoose.model("employees",schema);