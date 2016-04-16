'use strict';

class Items {
    constructor() {}
    static getConnectionAll(callback, begin, end) {
        console.log('Items search time', begin, end);
        let getSql = `select billlist.id as billid, itemlist.id as itemid, billlist.billtype, billtime, billlist.billamount as billamount, 
                        outaccount.accountgroup as accountoutgroup, outaccount.accountname as accountoutname, 
                        inaccount.accountgroup as accountingroup, inaccount.accountname as accountinname,  
                        itemlist.amount as itemamount,itemlist.itemname, categorygroup, categoryname
                        from billlist
                        inner join itemlist
                        on billlist.id = itemlist.billid
                        left join accounttable as outaccount
                        on billlist.accountidout = outaccount.id
                        left join accounttable as inaccount
                        on billlist.accountidin = inaccount.id
                        left join categorytable
                        on itemlist.categoryid = categorytable.id
                        where billtime between ? and ?
                        ORDER BY billlist.id desc, billtime desc;`;
        Items.connection.query(getSql, [begin, end], function(err, result) {
            try {
                if (err) {
                    console.log(`Items.getConnection error: ${err.message}`);
                    return;
                }

                let billsMap = new Map();
                for (let item of result) {
                    if (!billsMap.has(item.billid)) {
                        billsMap.set(item.billid, {
                            id: item.billid,
                            type: item.billtype,
                            time: item.billtime,
                            accountout: {
                                group: item.accountoutgroup,
                                name: item.accountoutname
                            },
                            accountin: {
                                group: item.accountingroup,
                                name: item.accountinname
                            },
                            amount: item.billamount,
                            item: []
                        });
                    }
                    billsMap.get(item.billid).item.push({
                        id: item.itemid,
                        note: item.itemname,
                        amount: item.itemamount,
                        category: {
                            group: item.categorygroup,
                            name: item.categoryname
                        }
                    });
                }

                let dayMap = new Map();
                for (let bill of billsMap.values()) {
                    let date = new Date(bill.time);
                    let dateKey = `${date.getMonth() + 1}月${date.getDate()}日`;
                    if (!dayMap.has(dateKey)) {
                        dayMap.set(dateKey, {
                            income:Number(0),
                            outlay:Number(0),
                            bills : []
                        });
                    }
                    if (bill.type == 'outlay') {
                        dayMap.get(dateKey).outlay += Number(bill.amount);
                    } else if(bill.type == 'income'){
                        dayMap.get(dateKey).income += Number(bill.amount);
                    }
                    dayMap.get(dateKey).bills.push(bill);
                }

                console.log('invoked[Items.getConnectionAll]');
                callback(err, JSON.stringify(Array.from(dayMap.entries())));
            } finally {
                if (Items.pool._freeConnections.indexOf(Items.connection) == -1) {
                    Items.connection.release();
                }
            }

        });
    }

    static getConnectionBill(callback, begin, end, needLastResult) {
        console.log('Items search time', begin, end);
        let getSql = `select id, billtype, billtime, billamount 
                        from billlist
                        where billtime between ? and ?
                        ORDER BY id desc, billtime desc;`;
        Items.connection.query(getSql, [begin, end], function(err, result) {
            try {
                if (err) {
                    console.log(`Items.getConnection error: ${err.message}`);
                    return;
                }

                let outlayAmount = Number(0);
                let incomeAmount = Number(0);
                for (let item of result) {
                    if (item.billtype == 'outlay') {
                        outlayAmount += Number(item.billamount);
                    } else if (item.billtype == 'income') {
                        incomeAmount += Number(item.billamount);
                    }
                }

                if (needLastResult) {
                    needLastResult = `还没有记账`;
                    if (result.length > 0) {
                        let lastBill = result[0];
                        if (lastBill.billtype == 'outlay') {
                            needLastResult = `最后一笔 [支出] ${lastBill.billamount}`;
                        } else if (lastBill.billtype == 'income') {
                            needLastResult = `最后一笔 [收入] ${lastBill.billamount}`;
                        } else if (lastBill.billtype == 'transfer') {
                            needLastResult = `最后一笔 [转账] ${lastBill.billamount}`;
                        }
                    }
                }

                console.log('invoked[Items.getConnectionBill]', result);
                callback(err, {
                    last: needLastResult,
                    outlay: outlayAmount,
                    income: incomeAmount
                });
            } finally {
                if (Items.pool._freeConnections.indexOf(Items.connection) == -1) {
                    Items.connection.release();
                }
            }

        });
    }
}
module.exports = Items;
