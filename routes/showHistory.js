'use strict';

let express = require('express'),
    router = express.Router(),
    Pool = require('../modles/Pool'),
    TITLE = "历史记录";

router.get('/', function(req, res, next) {
    let begin = "00:00:00";
    let end = "23:59:59";

    Pool.Items.getConnectionAll(function(err, income, outlay, result) {
        console.log('showHistory', income, outlay, result);
        res.render('showHistory', {
            title : TITLE,
            income : income,
            outlay : outlay,
            days : result
        });
    }, `${req.query.begin} ${begin}`, `${req.query.end} ${end}`);
});

module.exports = router;
