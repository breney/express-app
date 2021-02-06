var express = require('express'),
    router = express.Router(),
    request = require('../../models/requests');

router.get('/', function(req, res) {
  request.find({}, function (err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  request.findById(id, function (err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  });
});

router.post("/", function(req, res) {
  var obj = req.body;
  var model = new request(obj);
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
  request.findByIdAndUpdate(id, obj, function(err) {
    if (err) {
      res.send("error");
      return;
    }
    res.send("actualizado com sucesso");
  })
})

router.delete("/:id", function(req, res) {
  var id = req.params.id;
  request.findByIdAndRemove(id, function(err, data) {
    if (err) {
      res.send("error");
      return;
    }
    res.send(data);
  })
})

module.exports = router;
