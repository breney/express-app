var express = require('express'),
    router = express.Router(),
    book = require('../models/books.js');

router.get('/books', function (req, res) {
    book.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    });
});

router.get('/books/:id', function (req, res) {
    var id = req.params.id;
    book.findById(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    });
});

router.post('/books', function (req, res) {
    var obj = req.body;
    var model = new book(obj);
    model.save(function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("criado com sucesso");
    })
})

router.post('/books/:id', function (req, res) {
    var id = req.params.id;
    var obj = req.body;
    book.findByIdAndUpdate(id, obj, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("actualizado com sucesso");
    })
})

router.delete('books/:id', function (req, res) {
    var id = req.params.id;
    book.findByIdAndRemove(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    })
})

module.exports = router;
