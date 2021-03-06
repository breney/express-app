var express = require('express'),
    router = express.Router(),
    customer = require('../../models/customers');


router.post("/", function(req, res) {
  var obj = req.body;
  console.log(req.body);
  var model = new customer(obj);
  model.save(function(err,data) {
    if (err) {
      res.send("error");
      return;
    }
    console.log('criado com sucesso');
    res.redirect('/customers');
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
    res.render('customers/edit', data);
  })
})

module.exports = router;
