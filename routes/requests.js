var express = require('express'),
    router = express.Router(),
    request = require('../models/requests'),
    book = require('../models/books');

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

router.get('/create', function (req,res){
    book.find({}, function (err, data) {
        res.render('requests/create', {books: data});

    });
})

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
