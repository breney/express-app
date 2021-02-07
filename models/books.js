var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;

var bookSchema = new Schema({
    _id: {type: objectId, auto: true},
    name: {type: String, required: true},
    isbn: {type: String, required: true},
    edition: {type: Number, required: true},
    author: {_id: {type: objectId}, name: {type: String}, nationality: {type: String}},
    publisher: {_id: {type: objectId}, name: {type: String}, address: {type: String}, phone: {type: String}},
}, {versionKey: false})

var bookModel = mongoose.model('books', bookSchema, 'books')

module.exports = bookModel;
