'use strict';

class Bill {
    constructor(obj) {
        obj = obj || {};
        this.billObj = {
            billTime: obj.time,
            billParrentAccountOut: obj.parrentAccountOut,
            billSubAccountOut: obj.subAccountOut,
            billParrentAccountIn: obj.parrentAccountIn,
            billSubAccountIn: obj.subAccountIn,
            billType: obj.billType,
            billAmount: Number(0)
        };
        if (this.billObj.billType !== 'outlay' && this.billObj.billType !== 'income' && this.billObj.billType !== 'transfer') {
            this.billObj = {};
        }
        this.itemArray = new Array();
    }

    addItem(obj) {
        obj = obj || {};
        let itemObj = {
            note: obj.note,
            amount: Number(obj.amount),
        };
        this.billObj.billAmount += Number(obj.amount);
        if (obj.category) {
            let datas = obj.category.split('/');
            if (datas.length == 2) {
                itemObj.parentCategory = datas[0];
                itemObj.subCategory = datas[1];
            }
        }
        this.itemArray.push(itemObj);
    }

    checkBillValid() {
        console.log('billObj', this.billObj);
        console.log('itemArray', this.itemArray);
        if (this.billObj.billType === 'outlay') {
            return this.checkBillProp('billTime') && this.checkBillProp('billParrentAccountOut') && this.checkBillProp('billSubAccountOut') && this.checkItemProp('parentCategory') && this.checkItemProp('subCategory') && this.checkItemProp('note') && this.checkItemProp('amount');
        } else if (this.billObj.billType === 'income') {
            return this.checkBillProp('billTime') && this.checkBillProp('billParrentAccountIn') && this.checkBillProp('billSubAccountIn') && this.checkItemProp('parentCategory') && this.checkItemProp('subCategory') && this.checkItemProp('note') && this.checkItemProp('amount');
        } else if (this.billObj.billType === 'transfer') {
            return this.checkBillProp('billTime') && this.checkBillProp('billParrentAccountOut') && this.checkBillProp('billSubAccountOut') && this.checkBillProp('billParrentAccountIn') && this.checkBillProp('billSubAccountIn') && this.checkItemProp('note') && this.checkItemProp('amount');
        } else {
            return false;
        }
    }

    checkBillProp(key) {
        let result = this.billObj[key] !== undefined;
        if (!result) console.log(key, ':undefined');
        return result;
    }

    checkItemProp(key) {
        for (let item of this.itemArray) {
            if (item[key] === undefined) {
                console.log(key, ':undefined');
                return false;
            }
        }
        return true;
    }

    getConnection(callback) {
        if (this.checkBillValid()) {
            let proc, procParams, addSql = '',
                addParams = [];
            if (this.billObj.billType === 'outlay') {
                proc = 'call addOutlayBill(?,?,?,?,@billid);';
                procParams = [this.billObj.billParrentAccountOut, this.billObj.billSubAccountOut, this.billObj.billTime, this.billObj.billAmount];
                addSql = 'INSERT INTO itemlist(billid, categoryid, itemname, amount) VALUES';
                for (let index in this.itemArray) {
                    let item = this.itemArray[index];
                    addSql += '(?,(select id from categorytable where categorygroup = ? && categoryname = ? && categorytype = ?),?,?),';
                    addParams.push('billid');
                    addParams.push(item.parentCategory);
                    addParams.push(item.subCategory);
                    addParams.push('outlay');
                    addParams.push(item.note);
                    addParams.push(item.amount);
                }
                addSql = addSql.substring(0, addSql.length - 1) + ";";
            } else if (this.billObj.billType === 'income') {
                proc = 'call addIncomeBill(?,?,?,?,@billid);';
                procParams = [this.billObj.billParrentAccountIn, this.billObj.billSubAccountIn, this.billObj.billTime, this.billObj.billAmount];
                addSql = 'INSERT INTO itemlist(billid, categoryid, itemname, amount) VALUES';
                let item = this.itemArray[0];
                addSql += '(?,(select id from categorytable where categorygroup = ? && categoryname = ? && categorytype = ?),?,?);';
                addParams.push('billid');
                addParams.push(item.parentCategory);
                addParams.push(item.subCategory);
                addParams.push('income');
                addParams.push(item.note);
                addParams.push(item.amount);
            } else if(this.billObj.billType === 'transfer'){
                proc = 'call addTransferBill(?,?,?,?,?,?,@billid);';
                procParams = [this.billObj.billParrentAccountOut, this.billObj.billSubAccountOut, this.billObj.billParrentAccountIn, this.billObj.billSubAccountIn, this.billObj.billTime, this.billObj.billAmount];
                addSql = 'INSERT INTO itemlist(billid, itemname, amount) VALUES(?,?,?);';
                let item = this.itemArray[0];
                addParams.push('billid');
                addParams.push(item.note);
                addParams.push(item.amount);
            }

            Bill.connection.query(proc, procParams, function(err, result) {
                try {
                    if (err) {
                        console.log('Bill.getConnection [exec proc error] - :' + err);
                        return;
                    }
                    console.log('invoked[Bill.getConnection proc]', result);
                    let billid = result[0][0].billid;
                    console.log('addSql', addSql);
                    Bill.connection.query(addSql, addParams.map(x => {
                        if (x === 'billid') return billid;
                        else return x;
                    }), function(err, result) {
                        try {
                            if (err) {
                                console.log('Bill.getConnection error - :' + err);
                                return;
                            }
                            console.log('invoked[Bill.getConnection sql]', result);
                            callback(err, result);
                        } finally {
                            if (Bill.pool._freeConnections.indexOf(Bill.connection) == -1) {
                                Bill.connection.release();
                            }
                        }
                    });
                } finally {
                    if (Bill.pool._freeConnections.indexOf(Bill.connection) == -1) {
                        Bill.connection.release();
                    }
                }
            });
        } else {
            callback(new Error('错误的表单数据'));
        }

    }
}

module.exports = Bill;

// let array = [,'a','b'];
// console.log(array.map(x => {if(x == 'a') return 1; else return x;}));


// let a = "a,";
// console.log(a.substring(0, a.length -1) + ';');
