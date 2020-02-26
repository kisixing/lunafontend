"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var msg_1 = require("../types/msg");
exports.msgTpl = (_a = {
        base: {
            error: false,
            errorCode: '',
            errorText: '',
            status: 'sending',
            id: '',
            from: '',
            to: '',
            toJid: '',
            time: '',
            type: '',
            body: {},
            ext: {},
            bySelf: false
        }
    },
    _a[msg_1.EMsgBodyType.txt] = {
        type: msg_1.EMsgBodyType.txt,
        msg: ''
    },
    _a[msg_1.EMsgBodyType.img] = {
        type: msg_1.EMsgBodyType.img,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    _a[msg_1.EMsgBodyType.file] = {
        type: msg_1.EMsgBodyType.file,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    _a[msg_1.EMsgBodyType.video] = {
        type: msg_1.EMsgBodyType.video,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    _a[msg_1.EMsgBodyType.audio] = {
        type: msg_1.EMsgBodyType.audio,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: ''
    },
    _a);
