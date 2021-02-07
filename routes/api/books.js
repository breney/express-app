var express = require('express'),
    router = express.Router();

var book = require('../../models/books.js');

router.post('/', function (req, res) {
    author = JSON.parse(req.body.author);
    publisher = JSON.parse(req.body.publisher);
    var obj = {
        name : req.body.name,
        isbn: req.body.isbn,
        edition: req.body.edition,
        author:{
            name: author.name,
            nationality: author.nationality
        },
        publisher: {
            name: publisher.name,
            address: publisher.address,
            phone: publisher.phone
        }
    };
    console.log(obj);
    var model = new book(obj);
    console.log(model);
    model.save(function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.redirect("/books");
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
