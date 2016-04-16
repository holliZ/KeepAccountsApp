'use strict';

class Account {
    constructor() {}

    static getConnection(callback, enforce) {
        if (!(enforce || this.accountArray === undefined)) {
            callback(null, this.accountArray);
        } else {
            let getSql = 'select accountgroup, accountname, balance from accounttable;';
            Account.connection.query(getSql, function(err, result) {
                try {
                    if (err) {
                        console.log(`Account.getConnection error: ${err.message}`);
                        return;
                    }

                    let accountmap = new Map();
                    this.accountArray = new Array();
                    for (let item of result) {
                        if (!accountmap.has(item.accountgroup)) {
                            accountmap.set(item.accountgroup, new Map());
                        }
                        accountmap.get(item.accountgroup).set(item.accountname, item.balance);
                    }

                    for (let accounts of accountmap.entries()) {
                        let obj = { val: accounts[0], sub: [] };
                        for (let items of accounts[1].entries()) {
                            obj.sub.push({ val: items[0], balance: items[1] });
                        }
                        this.accountArray.push(obj);
                    }

                    console.log('invoked[Account.getConnection]');
                    callback(err, this.accountArray);
                } finally {
                    if (Account.pool._freeConnections.indexOf(Account.connection) == -1) {
                        Account.connection.release();
                    }
                }

            });
        }
    }
}

module.exports = Account;
