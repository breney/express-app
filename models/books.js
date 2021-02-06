var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;

var bookSchema = new Schema({
    _id: {type: objectId, auto:true},
    name: {type: String, required: true},
    isbn: {type: String, required: true},
    edition: {type: String, required: true},
    author: [{name: {type: String}, nationality: {type:String}}],
    publisher: [{name: {type: String}, address: {type:String}, phone: {type:String}}],
}, {versionKey: false})

var bookModel = mongoose.model('Book', bookSchema, 'books')

module.exports = bookModel;