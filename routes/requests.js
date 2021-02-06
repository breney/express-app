var express = require('express'),
    router = express.Router(),
    request = require('../models/requests'),
    book = require('../models/books');

router.get('/', function(req, res) {

  book.find( {} , function (err, data) {
    res.render('requests/create', {books : data });

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

module.exports = router;
