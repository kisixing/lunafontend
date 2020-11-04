"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("@lianmed/request"));
var utils_1 = require("@lianmed/utils");
var paramMap = {
    startDate: 'visitDate.greaterOrEqualThan',
    endDate: 'visitDate.lessOrEqualThan',
    note: 'note.contains'
};
function queryRule(data) {
    return __awaiter(this, void 0, void 0, function () {
        var params, page, p;
        return __generator(this, function (_a) {
            params = data.params;
            page = params.page;
            p = __assign(__assign({}, (Object.entries(params).reduce(function (p, _a) {
                var k = _a[0], v = _a[1];
                k = paramMap[k] || k;
                v = (v && v._isAMomentObject) ? utils_1.formatDate(v) : v;
                p["" + k] = v || undefined;
                return p;
            }, {}))), { page: (page - 1) || 0 });
            console.log('params', p);
            return [2, Promise.all([
                    request_1.default.get('/prenatal-visitspage', {
                        params: p,
                    }),
                    request_1.default.get('/prenatal-visits/count', {
                        params: p,
                    }).catch(function () { return 20; })
                ]).then(function (arr) {
                    return {
                        data: arr[0],
                        total: arr[1],
                        success: true,
                        pageSize: 20,
                        current: 1,
                    };
                })];
        });
    });
}
exports.queryRule = queryRule;
function queryHistory(data) {
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            params = {
                'note.equals': data.note
            };
            return [2, request_1.default.get('/diagnosis-histories', { params: params }).then(function (data) {
                    return data.map(function (_a) {
                        var analysis = _a.analysis, diagnosis = _a.diagnosis, result = _a.result, other = __rest(_a, ["analysis", "diagnosis", "result"]);
                        var _analysis, _diagnosis, _result;
                        try {
                            _analysis = JSON.parse(analysis);
                        }
                        catch (error) {
                            _analysis = {};
                        }
                        try {
                            _diagnosis = JSON.parse(diagnosis);
                        }
                        catch (error) {
                            _diagnosis = {};
                        }
                        try {
                            _result = JSON.parse(result);
                        }
                        catch (error) {
                            _result = {};
                        }
                        return __assign({ analysis: _analysis, diagnosis: _diagnosis, result: _result }, other);
                    });
                })];
        });
    });
}
exports.queryHistory = queryHistory;
function removeHistory(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, request_1.default.delete('/diagnosis-histories/' + params.id, {
                    successText: '删除成功'
                })];
        });
    });
}
exports.removeHistory = removeHistory;
function updateHistory(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, request_1.default.put('/diagnosis-histories', {
                    data: __assign(__assign({}, data), { result: data.result ? JSON.stringify(data.result) : undefined, diagnosis: data.diagnosis ? JSON.stringify(data.diagnosis) : undefined, analysis: data.analysis ? JSON.stringify(data.analysis) : undefined }),
                    successText: '保存成功'
                })];
        });
    });
}
exports.updateHistory = updateHistory;
function addRule(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, request_1.default.get('/rule', {
                    method: 'POST',
                    data: __assign(__assign({}, params), { method: 'post' }),
                })];
        });
    });
}
exports.addRule = addRule;
function updateLable(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, request_1.default.put('/ctg-labels', {
                    data: data,
                })];
        });
    });
}
exports.updateLable = updateLable;
//# sourceMappingURL=service.js.map