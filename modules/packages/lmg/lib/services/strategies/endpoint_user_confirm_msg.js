"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("antd/lib/message/index"));
function endpoint_user_confirm_msg(received_msg) {
    index_1.default.info(received_msg.data.content);
}
exports.endpoint_user_confirm_msg = endpoint_user_confirm_msg;
//# sourceMappingURL=endpoint_user_confirm_msg.js.map