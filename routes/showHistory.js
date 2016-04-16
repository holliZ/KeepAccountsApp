'use strict';

let express = require('express'),
    router = express.Router(),
    Pool = require('../modles/Pool'),
    TITLE = "历史记录";

router.get('/', function(req, res, next) {
    let begin = "00:00:00";
    let end = "23:59:59";

    Pool.Items.getConnectionAll(function(err, result) {
        res.render('showHistory', {
            title : TITLE,
            days : result
        });
    }, `${req.query.begin} ${begin}`, `${req.query.end} ${end}`);
});

module.exports = router;
