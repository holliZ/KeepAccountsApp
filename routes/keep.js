'use strict';

let express = require('express'),
    router = express.Router(),
    Pool = require('../modles/Pool'),
    TITLE = "记一笔";

router.get('/', function(req, res, next) {
    Pool.Category.getConnection(function(err, outlay, income) {
        let outlayCategoryDatas = outlay;
        let incomeCategoryDatas = income;

        Pool.Account.getConnection(function(err, account) {
            let accountDatas = account;

            Pool.Setting.getConnection(function(err, settings) {
                let outlayDefaultCategory = settings['outlay_default_category'];
                let incomeDefaultCategory = settings['income_default_category'];
                let outlayDefaultAccount = settings['outlay_default_account'];
                let incomeDefaultAccount = settings['income_default_account'];

                // console.log('outlayCategoryDatas:', JSON.stringify(outlayCategoryDatas));
                // console.log('incomeCategoryDatas:', JSON.stringify(incomeCategoryDatas));
                // console.log('accountDatas:', JSON.stringify(accountDatas));

                res.render('keep', {
                    title: TITLE,
                    accountDatas: JSON.stringify(accountDatas),
                    outlayCategoryDatas: JSON.stringify(outlayCategoryDatas),
                    incomeCategoryDatas: JSON.stringify(incomeCategoryDatas),
                    outlayDefaultCategory: outlayDefaultCategory,
                    outlayDefaultAccount: outlayDefaultAccount,
                    incomeDefaultCategory: incomeDefaultCategory,
                    incomeDefaultAccount: incomeDefaultAccount
                });
            });
        });
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    if (req.body.outlay === 'outlay') {
        outlay(req, res);
    } else if (req.body.income === 'income') {
        income(req, res);
    } else if (req.body.transfer === 'transfer') {
        transfer(req, res);
    }
});

function outlay(req, res) {
    if (req.body.save !== undefined || req.body.nextKeep !== undefined) {
        let bill = new Pool.Bill({
            time: req.body.datetime,
            parrentAccountOut: req.body.parentAccountContent,
            subAccountOut: req.body.subAccountContent,
            billType: req.body.outlay,
        });

        let itemMap = new Map();
        for (let item in req.body) {
            if (item.startsWith('item')) {
                let datas = item.split('_');
                let key = datas[0];
                let val = datas[1];
                if (!itemMap.has(key)) {
                    itemMap.set(key, {});
                }
                itemMap.get(key)[val] = req.body[item];
            }
        }

        for (let item of itemMap.values()) {
            bill.addItem({
                category: item.category,
                note: item.note,
                amount: item.amount,
            });
        }

        bill.getConnection(function(err) {
            if (req.body.nextKeep !== undefined) {
                console.log('nextKeep');
                res.redirect('/keep');
            } else {
                res.redirect('/');
            }
        });
    }
}

function income(req, res) {
    if (req.body.save !== undefined || req.body.nextKeep !== undefined) {
        let bill = new Pool.Bill({
            time: req.body.datetime,
            parrentAccountIn: req.body.parentAccountContent,
            subAccountIn: req.body.subAccountContent,
            billType: req.body.income,
        });

        bill.addItem({
            category: req.body.item_category,
            note: req.body.item_note,
            amount: req.body.item_amount,
        });

        bill.getConnection(function(err) {
            if (req.body.nextKeep !== undefined) {
                console.log('nextKeep');
                res.redirect('/keep');
            } else {
                res.redirect('/');
            }
        });
    }
}

function transfer(req, res) {
    if (req.body.save !== undefined || req.body.nextKeep !== undefined) {
        let bill = new Pool.Bill({
            time: req.body.datetime,
            parrentAccountOut: req.body.parentAccountContentOut,
            subAccountOut: req.body.subAccountContentOut,
            parrentAccountIn: req.body.parentAccountContentIn,
            subAccountIn: req.body.subAccountContentIn,
            billType: req.body.transfer,
        });

        bill.addItem({
            note: req.body.item_note,
            amount: req.body.item_amount,
        });

        bill.getConnection(function(err) {
            if (req.body.nextKeep !== undefined) {
                console.log('nextKeep');
                res.redirect('/keep');
            } else {
                res.redirect('/');
            }
        });
    }
}

module.exports = router;
