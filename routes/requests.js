var express = require('express'),
    router = express.Router(),
    request = require('../models/requests'),
    book = require('../models/books'),
    customer = require('../models/customers');

router.get('/', function (req, res) {
    request.find({}, function (err, data) {
        res.render('requests/index', {requests: data, customers : customer});
    })
});

router.get('/create', function (req,res){
    book.find({}, function (err, data) {
        res.render('requests/create', {books: data});

    });
})

router.get('/:id', function (req, res) {
    var id = req.params.id;
    request.findById(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    });
});

module.exports = router;
