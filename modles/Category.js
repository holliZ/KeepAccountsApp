'use strict';

class Category {
    constructor() {}

    static getConnection(callback, enforce) {
        if (!(enforce || this.outlayArray === undefined || this.incomeArray === undefined)) {
            callback(null, this.outlayArray, this.incomeArray);
        } else {
            let getSql = 'select categorygroup, categoryname, categorytype from categorytable;';
            Category.connection.query(getSql, function(err, result) {
                try {
                    if (err) {
                        console.log(`Category.getConnection error: ${err.message}`);
                        return;
                    }

                    let outlaymap = new Map();
                    let incomemap = new Map();
                    this.outlayArray = new Array();
                    this.incomeArray = new Array();
                    for (let item of result) {
                        if (item.categorytype == 'outlay') {
                            if (!outlaymap.has(item.categorygroup)) {
                                outlaymap.set(item.categorygroup, new Set());
                            } 
                            outlaymap.get(item.categorygroup).add(item.categoryname);
                        } else if (item.categorytype == 'income') {
                            if (!incomemap.has(item.categorygroup)) {
                                incomemap.set(item.categorygroup, new Set());
                            } 
                            incomemap.get(item.categorygroup).add(item.categoryname);
                        }
                    }

                    for (let key of outlaymap.keys()) {
                        let obj = { val: key, sub: [] };
                        for (let value of outlaymap.get(key)) {
                            obj.sub.push(value);
                        }
                        this.outlayArray.push(obj);
                    }

                    for (let key of incomemap.keys()) {
                        let obj = { val: key, sub: [] };
                        for (let value of incomemap.get(key)) {
                            obj.sub.push(value);
                        }
                        this.incomeArray.push(obj);
                    }

                    console.log('invoked[Category.getConnection]');
                    callback(err, this.outlayArray, this.incomeArray);
                } finally {
                    if (Category.pool._freeConnections.indexOf(Category.connection) == -1) {
                        Category.connection.release();
                    }
                }

            });
        }
    }
}

module.exports = Category;
