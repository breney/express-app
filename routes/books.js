var express = require('express'),
    router = express.Router(),
    pessoa = require('../models/books.js');

router.get('/', function(req, res) {
  pessoa.find({}, function (err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  pessoa.findById(id, function (err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  });
});

router.post("/", function(req, res) {
  var obj = req.body;
  var model = new pessoa(obj);
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
  pessoa.findByIdAndUpdate(id, obj, function(err) {
    if (err) {
      res.send("error");
      return;
    }
    res.send("actualizado com sucesso");
  })
})

router.delete("/:id", function(req, res) {
  var id = req.params.id;
  pessoa.findByIdAndRemove(id, function(err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  })
})

module.exports = router;
