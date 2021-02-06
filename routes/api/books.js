var express = require('express'),
    router = express.Router();

var book = require('../../models/books.js');

router.get('/', async function (req, res) {
    let data = {};

    await book.aggregate([{$unwind: '$author'}, {$group: {_id: '$author._id',  name: {$first: "$author.name"},}}])
        .then(result => data.authors = result)
        .catch(console.log)

    await book.aggregate([
        {$unwind: '$publisher'},
        {$group: {_id: '$publisher._id', name: {$first: "$publisher.name"},}}
    ]).then(result => data.publishers = result)
        .catch(console.log)

    console.log(data);
    res.render('books/create', data);
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    book.findById(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    });
});

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
    book.findByIdAndUpdate(id, obj, function (err) {
        if (err) {
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
