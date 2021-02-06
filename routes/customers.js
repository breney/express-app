var express = require('express'),
    router = express.Router(),
    customer = require('../models/customers');

router.get('/', function(req, res) {
  customer.find({}, function (err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(data);
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

router.post("/", function(req, res) {
  var obj = req.body;
  var model = new customer(obj);
  model.save(function(err) {
    if (err) {
      res.send("error");
      return;
    }
    res.send("criado com sucesso");
  })
})

router.post("/:id", function(req, res) {
  var id = req.params.id;
  var obj = req.body;
  customer.findByIdAndUpdate(id, obj, function(err) {
    if (err) {
      res.send("error");
      return;
    }
    res.send("actualizado com sucesso");
  })
})

router.delete("/:id", function(req, res) {
  var id = req.params.id;
  customer.findByIdAndRemove(id, function(err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  })
})

module.exports = router;
