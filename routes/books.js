var express = require('express'),
    router = express.Router();

var book = require('../models/books.js');

router.get('/create', async function (req, res) {
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

router.get('/', function (req, res) {
    book.find({}, function (err, data) {
        if (err) {
            res.send(err);
            return;
        }

        console.log(data)
        res.render('books/index', {books: data});
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    book.findById(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        console.log(data);
        res.render('books/book', data);
    });
});

module.exports = router;
