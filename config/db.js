var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost:27017/library_db', { useNewUrlParser: true }).then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

module.exports = connection;