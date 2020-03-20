"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
function endpoint_user_confirm_msg(received_msg) {
    antd_1.message.info(received_msg.data.content);
}
exports.endpoint_user_confirm_msg = endpoint_user_confirm_msg;
//# sourceMappingURL=endpoint_user_confirm_msg.js.map