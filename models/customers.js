var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;

var customerSchema = new Schema({
    _id: {type: objectId, auto:true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    age: {type: Number, required: true}
}, {versionKey: false})

var customerModel = mongoose.model('customers', customerSchema, 'customers')

module.exports = customerModel;