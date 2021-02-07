var express = require('express'),
    router = express.Router(),
    request = require('../models/requests'),
    book = require('../models/books'),
    customer = require('../models/customers');

const {ObjectId} = require("bson");


router.get('/', async function (req, res) {

    let requests = {}

    await request.aggregate([{
        $lookup: {
            from: 'customers',
            localField: 'customer_id',
            foreignField: '_id',
            as: 'customer'
        }},
        {$lookup: {
            from: 'books',
            localField: 'books',
            foreignField: '_id',
            as: 'books'
        },
    },{$unwind: "$customer" }]).then(result => requests = result)

    console.log(requests);
    res.render('requests/index', {requests: requests});
});

router.get('/create', async function(req,res){

    let books = {};
    let customers = {};

    await customer.aggregate([{$project : { name : 1}}]).then(result => customers = result);

    await book.aggregate([{$project : { name : 1}}]).then(result => books = result);

    res.render('requests/create', {books: books, customers: customers});


});

router.get('/:id/edit', function (req, res) {
    const id = req.params.id;

    request.aggregate([
        {
            $lookup: {
                from: 'customers',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customer'
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: 'books',
                foreignField: '_id',
                as: 'books'
            }
        },
        {
            $unwind: "$customer"
        },
        {
            $match: {
                _id:ObjectId(id)
            }
        }
    ]).then(function (request) {
        book.find({}, function (err, data) {
            let books = data;
            request = request[0];

            books.forEach(function (element, index) {
                request.books.forEach(function (e) {
                    books[index].selected = e._id.toString() === element._id.toString();
                })
            })
            res.render('requests/edit', {books, request});
        });
    })


});

router.get('/:id', async function (req, res) {
    var id = req.params.id;

    let requests;

    await request.aggregate([{
        $lookup: {
            from: 'customers',
            localField: 'customer_id',
            foreignField: '_id',
            as: 'customer'
        }},
        {$lookup: {
                from: 'books',
                localField: 'books',
                foreignField: '_id',
                as: 'books'
            },
        },{$unwind: "$customer" }, {$match : {_id : ObjectId(id)}}]).then(result => requests = result)

    res.render('requests/request', {request: requests[0]});
});

module.exports = router;
