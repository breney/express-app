var express = require('express'),
    router = express.Router(),
    customer = require('../models/customers');

router.get('/', function(req, res) {
  customer.find({}, function (err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.render('customers/create', data);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  customer.findById(id, function (err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  });
});

module.exports = router;
