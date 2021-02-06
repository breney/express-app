var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost:27017/library_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log("Mongo Connected"))
    .catch(console.log);

module.exports = connection;
