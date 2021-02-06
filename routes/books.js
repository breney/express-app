var express = require('express'),
    router = express.Router(),
    book = require('../models/books.js');

router.get('/', function(req, res) {
  book.find({}, function (err, data) {
    if (err) {
      res.send("ola baby");
      return;
    }
    res.send(data);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  book.findById(id, function (err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  });
});

router.post("/", function(req, res) {
  var obj = req.body;
  var model = new book(obj);
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
  book.findByIdAndUpdate(id, obj, function(err) {
    if (err) {
      res.send("error");
      return;
    }
    res.send("actualizado com sucesso");
  })
})

router.delete("/:id", function(req, res) {
  var id = req.params.id;
  book.findByIdAndRemove(id, function(err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  })
})

module.exports = router;