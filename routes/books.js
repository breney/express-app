var express = require('express'),
    router = express.Router();

var book = require('../models/books.js');

async function getAuthorsAndPublishers() {
    let data = {};

    await book.aggregate([{$unwind: '$author'}, {$group: {_id: '$author._id',  name: {$first: "$author.name"}, nationality: {$first: "$author.nationality"}}}])
        .then(result => data.authors = result)


    await book.aggregate([
        {$unwind: '$publisher'},
        {$group: {_id: '$publisher._id', name: {$first: "$publisher.name"}, address: {$first : "$publisher.address"}, phone:{$first : "$publisher.phone"}}}
    ]).then(result => data.publishers = result)


    return data;
}

router.get('/create', async function (req, res) {

    res.render('books/create', await getAuthorsAndPublishers());
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

router.get('/:id/edit', async function (req, res) {
    var id = req.params.id;
    let response =  await getAuthorsAndPublishers();
    await book.findById(id, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }

        res.render('books/edit', {book: data, publishers: response.publishers, authors: response.authors});
    });
});


module.exports = router;
