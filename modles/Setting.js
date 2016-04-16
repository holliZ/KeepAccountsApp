'use strict';

class Setting {
    constructor() {}

    static getConnection(callback, enforce) {
        if (!(enforce || this.settingObj === undefined)) {
            callback(null, this.settingObj);
        } else {
            let getSql = 'select settingkey, settingvalue from setting;';
            Setting.connection.query(getSql, function(err, result) {
                try {
                    if (err) {
                        console.log(`Setting.getConnection error: ${err.message}`);
                        return;
                    }

                    this.settingObj = {};

                    for (let item of result) {
                        this.settingObj[item.settingkey] = item.settingvalue;
                    }

                    console.log('invoked[Setting.getConnection]');
                    callback(err, this.settingObj);
                } finally {
                    if (Setting.pool._freeConnections.indexOf(Setting.connection) == -1) {
                        Setting.connection.release();
                    }
                }

            });
        }
    }
}

module.exports = Setting;
