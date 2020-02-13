"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function heard(received_msg) {
    var devdata = received_msg.data;
    var servertime = utils_1.convertstarttime(devdata.time);
    this.span = Math.floor(new Date(servertime).getTime() / 1000 - new Date().getTime() / 1000) * 4 - 12;
}
exports.heard = heard;
