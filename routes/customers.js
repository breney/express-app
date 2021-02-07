var express = require('express'),
    router = express.Router(),
    customer = require('../models/customers');

router.get('/', function (req, res) {
    customer.find({}, function (err, data) {
        res.render('customers/index', {customers: data});
    });
});

router.get('/create', function (req, res) {
    customer.find({}, function (err, data) {
        res.render('customers/create');
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    customer.findById(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('customers/customer', data);
    });
});

router.get('/:id/edit', function (req, res) {
    var id = req.params.id;
    customer.findById(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        console.log(data);
        res.render('customers/edit', data);
    });
});

module.exports = router;
