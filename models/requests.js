var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;

var requestSchema = new Schema({
    _id: {type: objectId, auto:true},
    data_begin: {type: Date, required: true},
    data_end: {type: Date, required: true},
    books: {type: Array, required: true},
    customer_id: {type: objectId, auto:true},
    librarian: [{name : {type: String} , address: {type:String}, phone: {type:String}, schedule: {type:Date}}],
}, {versionKey: false})

var requestModel = mongoose.model('requests', requestSchema, 'requests')

module.exports = requestModel;