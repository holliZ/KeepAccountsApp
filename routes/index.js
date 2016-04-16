'use strict';

let express = require('express'),
    router = express.Router(),
    Pool = require('../modles/Pool'),
    TITLE = "首页";

/* GET home page. */
router.get('/', function(req, res, next) {
    let today = getToday(new Date());
    let thisWeek = getThisWeek(new Date());
    let thisMonth = getThisMonth(new Date());
    let thisYear = getThisYear(new Date());
    let begin = "00:00:00";
    let end = "23:59:59";
    let resObj = {
        title: TITLE,
        todayFormat: `${today.year}年${today.month}月${today.date}日`,
        weekFormat: `${thisWeek[0].month}月${thisWeek[0].date}日-${thisWeek[1].month}月${thisWeek[1].date}日`,
        monthFormat: `${thisMonth[0].month}月${thisMonth[0].date}日-${thisMonth[1].month}月${thisMonth[1].date}日`,
        yearFormat: `${thisYear[0].month}月${thisYear[0].date}日-${thisYear[1].month}月${thisYear[1].date}日`,
        todayBeginEnd: `${today.year}-${today.month}-${today.date}`,
        weekBegin: `${thisWeek[0].year}-${thisWeek[0].month}-${thisWeek[0].date}`,
        weekEnd: `${thisWeek[1].year}-${thisWeek[1].month}-${thisWeek[1].date}`,
        monthBegin: `${thisMonth[0].year}-${thisMonth[0].month}-${thisMonth[0].date}`,
        monthEnd: `${thisMonth[1].year}-${thisMonth[1].month}-${thisMonth[1].date}`,
        yearBegin: `${thisYear[0].year}-${thisYear[0].month}-${thisYear[0].date}`,
        yearEnd: `${thisYear[1].year}-${thisYear[1].month}-${thisYear[1].date}`,
    };

    Pool.Items.getConnectionBill(function(err, result) {
        resObj.lastResult = result.last;
        resObj.todayIncome = result.income;
        resObj.todayOutlay = result.outlay;
        Pool.Items.getConnectionBill(function(err, result) {
            resObj.weekIncome = result.income;
            resObj.weekOutlay = result.outlay;
            Pool.Items.getConnectionBill(function(err, result) {
                resObj.monthIncome = result.income;
                resObj.monthOutlay = result.outlay;
                Pool.Items.getConnectionBill(function(err, result) {
                    resObj.yearIncome = result.income;
                    resObj.yearOutlay = result.outlay;
                    res.render('index', resObj);
                }, `${resObj.yearBegin} ${begin}`, `${resObj.yearEnd} ${end}`);
            }, `${resObj.monthBegin} ${begin}`, `${resObj.monthEnd} ${end}`);
        }, `${resObj.weekBegin} ${begin}`, `${resObj.weekEnd} ${end}`);
    }, `${resObj.todayBeginEnd} ${begin}`, `${resObj.todayBeginEnd} ${end}`, true);
});

module.exports = router;

let getToday = (now) => {
    return { year: now.getFullYear(), month: now.getMonth() + 1, date: now.getDate() };
};
let getThisWeek = (now) => {
    let day = now.getDay();
    day = day == 0 ? 7 : day;
    let firstDate = {
        month: now.getMonth(),
        date: now.getDate() - day + 1
    };
    let lastDate = {
        month: now.getMonth(),
        date: now.getDate() - day + 7
    };
    return [validDay(now, firstDate), validDay(now, lastDate)];
};

let getThisMonth = (now) => {
    let firstDate = {
        month: now.getMonth(),
        date: 1
    };
    let lastDate = {
        month: now.getMonth() + 1,
        date: 0
    };
    return [validDay(now, firstDate), validDay(now, lastDate)];
};

let getThisYear = (now) => {
    let firstDate = {
        month: 0,
        date: 1
    };
    let lastDate = {
        month: 12,
        date: 0
    };
    return [validDay(now, firstDate), validDay(now, lastDate)];
};

let validDay = (now, day) => {
    now.setMonth(day.month);
    now.setDate(day.date);
    day.month = now.getMonth();
    day.date = now.getDate();
    return { year: now.getFullYear(), month: now.getMonth() + 1, date: now.getDate() };
};
