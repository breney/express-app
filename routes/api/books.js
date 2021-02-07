var express = require('express'),
    router = express.Router();

var book = require('../../models/books.js');

router.post('/', function (req, res) {
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

router.post('/:id', function (req, res) {
    var id = req.params.id;
    var obj = req.body;
    book.findByIdAndUpdate(id, obj, {useFindAndModify: true}, function (err) {
        if (err) {
            console.log(err);
            res.send("error");
            return;
        }
        res.send("actualizado com sucesso");
    })
})

router.delete('/:id', function (req, res) {
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
