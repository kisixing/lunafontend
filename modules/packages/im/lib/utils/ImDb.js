"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dexie_1 = __importDefault(require("dexie"));
var DB_ENABLE = true;
var DB_VERSION = 2;
var TABLE_NAME = 'webim_history';
var TABLE_INDEX_KEYS = ['id', 'from', 'to', 'type', 'isUnread', 'status', 'toJid'];
var ImDb = (function () {
    function ImDb() {
    }
    ImDb.prototype.init = function (username, pageLimit) {
        var _a;
        if (pageLimit === void 0) { pageLimit = 10; }
        this.pageLimit = pageLimit;
        if (!DB_ENABLE || this.db) {
            return;
        }
        var db = new dexie_1.default(username);
        db.version(DB_VERSION).stores((_a = {},
            _a[TABLE_NAME] = TABLE_INDEX_KEYS.join(','),
            _a));
        this.db = db;
        this.$_TABLE = db.table(TABLE_NAME);
    };
    ImDb.prototype.exec = function (cb1, cb2) {
        return new Promise(function (resolve, reject) {
            if (DB_ENABLE) {
                cb1(resolve);
            }
            else {
                cb2 && cb2(reject);
            }
        });
    };
    ImDb.prototype.getUnreadList = function () {
        var $_TABLE = this.$_TABLE;
        return this.exec(function (resolve) {
            $_TABLE.where('isUnread').equals(1).toArray().then(function (res) { return resolve(res); });
        });
    };
    ImDb.prototype.fetchMessage = function (id, chatType, offset, limit) {
        if (chatType === void 0) { chatType = 'chat'; }
        if (offset === void 0) { offset = 0; }
        limit = limit || this.pageLimit;
        var $_TABLE = this.$_TABLE;
        return this.exec(function (resolve) {
            $_TABLE.where('type')
                .equals(chatType)
                .filter(function (item) {
                if (item.error) {
                    return false;
                }
                if (chatType === 'chat') {
                    return item.from === id || item.to === id;
                }
                else {
                    return item.to === id;
                }
            })
                .reverse()
                .offset(offset)
                .limit(limit)
                .sortBy('time')
                .then(function (res) {
                resolve(res.reverse());
            });
        });
    };
    ImDb.prototype.readMessage = function (chatType, id) {
        var $_TABLE = this.$_TABLE;
        var key = chatType === 'chat' ? 'from' : 'to';
        return this.exec(function (resolve) {
            var _a;
            $_TABLE.where((_a = { 'type': chatType }, _a[key] = id, _a['isUnread'] = 1, _a))
                .modify({ 'isUnread': 0 })
                .then(function (res) {
                resolve(res);
            });
        });
    };
    ImDb.prototype.updateMessageStatus = function (id, status) {
        var $_TABLE = this.$_TABLE;
        return this.exec(function (resolve) {
            $_TABLE.where('id')
                .equals(id)
                .modify({ 'status': status })
                .then(function (res) {
                resolve(res);
            });
        });
    };
    ImDb.prototype.deleteMessage = function (id) {
        console.log('ddddd', id);
        var $_TABLE = this.$_TABLE;
        return this.exec(function (resolve) {
            $_TABLE.where('id')
                .equals(id)
                .delete()
                .then(function (res) { return resolve(res); });
        });
    };
    ImDb.prototype.updateMessageMid = function (mid, id) {
        var _this = this;
        setTimeout(function () {
            var $_TABLE = _this.$_TABLE;
            return _this.exec(function (resolve) {
                $_TABLE.where('id')
                    .equals(id)
                    .modify({ 'toJid': mid })
                    .then(function (res) { return console.log('res', res); });
            });
        }, 1000);
    };
    ImDb.prototype.addMessage = function (message, isUnread) {
        if (isUnread === void 0) { isUnread = 0; }
        var $_TABLE = this.$_TABLE;
        if (!message.error) {
            return this.exec(function (resolve) {
                $_TABLE.where('id').equals(message.id).count().then(function (res) {
                    if (res === 0) {
                        message.isUnread = isUnread;
                        $_TABLE.add(message)
                            .then(function (res) { return resolve(res); })
                            .catch(function (e) { return console.log('add messaga:', e); });
                    }
                });
            });
        }
    };
    ImDb.prototype.clearMessage = function (chatType, id) {
        var $_TABLE = this.$_TABLE;
        return this.exec(function (resolve) {
            $_TABLE.where('type')
                .equals(chatType)
                .filter(function (item) {
                if (chatType === 'chat') {
                    return item.from === id || item.to === id;
                }
                else {
                    return item.to === id;
                }
            })
                .delete()
                .then(function (res) { return resolve(res); });
        });
    };
    return ImDb;
}());
exports.ImDb = ImDb;
;
exports.imDb = new ImDb();
window.appDb = exports.imDb;
