"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cst_1 = require("./Cst");
var Cstoct_1 = require("./Cstoct");
var Fischer_1 = require("./Fischer");
var Krebs_1 = require("./Krebs");
var Nst_1 = require("./Nst");
var Sogc_1 = require("./Sogc");
var strategies = {
    Cst: Cst_1.Cst,
    Cstoct: Cstoct_1.Cstoct,
    Fischer: Fischer_1.Fischer,
    Krebs: Krebs_1.Krebs,
    Nst: Nst_1.Nst,
    Sogc: Sogc_1.Sogc,
};
exports.default = (function (key, oldData) {
    var s = strategies[key];
    return s && s(oldData);
});
//# sourceMappingURL=index.js.map