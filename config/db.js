var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

module.exports = connection;