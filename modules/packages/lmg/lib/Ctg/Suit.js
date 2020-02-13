"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DrawCTG_1 = __importDefault(require("./DrawCTG"));
var request_1 = __importDefault(require("@lianmed/request"));
var utils_1 = require("../services/utils");
var lodash_1 = require("lodash");
var Draw_1 = __importDefault(require("../Draw"));
var bindEvents_1 = __importDefault(require("./bindEvents"));
var sid = 0;
var Suit = (function (_super) {
    __extends(Suit, _super);
    function Suit(canvasgrid, canvasdata, canvasline, canvasselect, canvasanalyse, wrap, barTool, type) {
        var _this = _super.call(this) || this;
        _this.needScroll = false;
        _this.option = Suit.option;
        _this.initFlag = false;
        _this.sid = sid++;
        _this.log = console.log.bind(console, 'suit', _this.sid);
        _this.intervalIds = [];
        _this.starttime = '2019-09-26';
        _this.fetalcount = 1;
        _this.type = 0;
        _this.currentdot = 10;
        _this.currentx = 10;
        _this.viewposition = 0;
        _this.scollscale = 1;
        _this.buffersize = 16;
        _this.curr = -16;
        _this.alarm = 0;
        _this.ctgconfig = {
            normalarea: 'rgb(224,255,255)',
            selectarea: 'rgba(192,192,192,0.5)',
            rule: 'rgba(0,51,102,1)',
            scale: 'rgba(0,0,0,1)',
            primarygrid: 'rgba(100, 100, 100, 1)',
            secondarygrid: 'rgba(200, 200, 200, 1)',
            fhrcolor: ['green', 'blue', 'rgb(0,0,0)'],
            tococolor: 'rgb(0,0,0)',
            alarmcolor: 'rgb(255, 1, 1)',
            alarm_enable: true,
            alarm_high: 160,
            alarm_low: 110,
            print_interval: 20,
        };
        _this.fetalposition = {
            fhr1: '',
            fhr2: '',
            fhr3: '',
        };
        _this.printlen = 4800;
        _this.selectstart = 0;
        _this.selectstartposition = 0;
        _this.toolbarposition = 0;
        _this.selectrpstart = 0;
        _this.selectend = 0;
        _this.selectrpend = 0;
        _this.selectflag = false;
        _this.requestflag = false;
        _this.dragtimestamp = 0;
        _this.interval = 5000;
        _this.lazyEmit = lodash_1.throttle(function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.emit.apply(_this, __spreadArrays([type], args));
            return true;
        }, _this.emitInterval || 0);
        bindEvents_1.default.call(_this);
        _this.wrap = wrap;
        _this.canvasgrid = canvasgrid;
        _this.canvasdata = canvasdata;
        _this.canvasline = canvasline;
        _this.canvasselect = canvasselect;
        _this.canvasanalyse = canvasanalyse;
        _this.contextgrid = canvasgrid.getContext('2d');
        _this.contextdata = canvasdata.getContext('2d');
        _this.contextline = canvasline.getContext('2d');
        _this.contextselect = canvasselect.getContext('2d');
        _this.contextanalyse = canvasanalyse.getContext('2d');
        _this.barTool = barTool;
        _this.drawobj = new DrawCTG_1.default(_this);
        _this.type = type;
        if (_this.option) {
            _this.ctgconfig.tococolor = _this.option.tococolor;
            _this.ctgconfig.fhrcolor[0] = _this.option.fhrcolor1;
            _this.ctgconfig.fhrcolor[1] = _this.option.fhrcolor2;
            _this.ctgconfig.fhrcolor[2] = _this.option.fhrcolor3;
            if (_this.option.alarm_enable == '0') {
                _this.ctgconfig.alarm_enable = false;
            }
            else {
                _this.ctgconfig.alarm_enable = true;
            }
            _this.ctgconfig.alarm_enable = true;
            _this.ctgconfig.alarm_high = Number(_this.option.alarm_high);
            _this.ctgconfig.alarm_low = Number(_this.option.alarm_low);
            _this.ctgconfig.print_interval = Number(_this.option.print_interval) || 20;
        }
        return _this;
    }
    Object.defineProperty(Suit.prototype, "$selectrpend", {
        get: function () {
            return this.selectrpend;
        },
        set: function (value) {
            this.selectrpend = value;
            var absLen = (value - this.leftViewposition) / 2;
            this.endingBar.setLeft(absLen, false);
            this.drawobj.showselect();
            this.selectflag && this.drawobj.showcur(value);
            this.emit('endTime', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Suit.prototype, "$selectrpstart", {
        get: function () {
            return this.selectrpstart;
        },
        set: function (value) {
            this.selectrpstart = value;
            var absLen = (value - this.leftViewposition) / 2;
            this.startingBar.setLeft(absLen, false);
            this.drawobj.showselect();
            this.selectflag && this.drawobj.showcur(value);
            this.emit('startTime', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Suit.prototype, "leftViewposition", {
        get: function () {
            return this.viewposition >= this.width * 2 ? this.viewposition - this.width * 2 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Suit.prototype, "selectingBarPoint", {
        get: function () {
            return ~~(this.leftViewposition + this.selectingBar.getLeft() * 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Suit.prototype, "rightViewPosition", {
        get: function () {
            return this.viewposition;
        },
        set: function (value) {
            this.viewposition = value;
            this.updateBarTool();
            this.drawobj.drawdot(this.viewposition);
        },
        enumerable: true,
        configurable: true
    });
    Suit.prototype.init = function (data) {
        var _this = this;
        if (!data) {
            return;
        }
        this.initFlag = true;
        var defaultinterval = 500;
        this.data = data;
        this.currentdot = data.index;
        if (data.status) {
            this.type = 0;
        }
        else {
            this.type = 1;
            if (typeof data.index == 'undefined') {
                this.data = this.InitFileData(data);
                if (this.data.index > this.width * 2) {
                    this.needScroll = true;
                }
            }
        }
        this.createBar();
        this.drawobj.showcur(0, false);
        this.startingBar.setLeft(0);
        if (this.type > 0) {
            if (this.data.index > this.canvasline.width * 2) {
                this.curr = this.canvasline.width * 2;
                if (this.data.index < this.canvasline.width * 4) {
                    var len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
                    this.barTool.setBarWidth(len);
                }
                else {
                    this.barTool.setBarWidth(100);
                }
                this.barTool.setBarLeft(0, false);
            }
            else {
                this.barTool.setBarWidth(0);
                this.barTool.setBarLeft(0, false);
                this.curr = this.data.index;
            }
            this.drawobj.drawdot(this.canvasline.width * 2, false);
            this.viewposition = this.curr;
        }
        else {
            this.timerCtg(defaultinterval);
        }
        this.barTool.watch(function (value) {
            _this.toolbarposition = value;
            _this.dragtimestamp = new Date().getTime();
            var len = 100;
            if (_this.data.index < _this.canvasline.width * 4) {
                len = Math.floor((_this.canvasline.width * 4 - _this.data.index) / 2);
            }
            var _viewposition = _this.canvasline.width * 2 +
                Math.floor(((_this.data.index - _this.canvasline.width * 2) * value) / (_this.canvasline.width - len));
            if (_this.viewposition < _this.canvasline.width * 2) {
                _viewposition = _this.canvasline.width * 2;
            }
            _this.rightViewPosition = _viewposition;
            _this.updateSelectCur();
            _this.drawobj.showselect();
            _this.drawobj.drawdot(_this.viewposition, false);
            _this.log('gg', _this.viewposition, len, value);
        });
        this.barTool.watchGrab(function (value) {
            var _viewposition;
            value = ~~value * 2;
            if (_this.type == 0 && _this.data.past > 0) {
                if (!_this.requestflag) {
                    _this.requestflag = true;
                    _this.getoffline(_this.data.docid, _this.data.past);
                }
            }
            if (_this.data.index < _this.canvasline.width * 2) {
                return;
            }
            _this.dragtimestamp = new Date().getTime();
            if (_this.viewposition - value < _this.canvasline.width * 2) {
                _viewposition = _this.canvasline.width * 2;
                _this.drawobj.drawdot(_this.viewposition, false);
                if (_this.selectend == 1) {
                    _this.endingBar.setLeft(_this.canvasline.width - Math.floor((_this.viewposition - _this.selectrpend) / 2));
                }
                _this.drawobj.showselect();
                _this.updateBarTool();
                return;
            }
            if (_this.viewposition - value < _this.data.index) {
                _viewposition = _this.rightViewPosition - value;
                _this.drawobj.drawdot(_this.viewposition, false);
            }
            else {
                _viewposition = _this.data.index;
                _this.drawobj.drawdot(_this.viewposition, false);
            }
            _this.updateBarTool();
            _this.rightViewPosition = _viewposition;
            if (_this.selectend == 1 && _this.viewposition - _this.selectrpend > -2) {
                _this.endingBar.setLeft(_this.canvasline.width - Math.floor((_this.viewposition - _this.selectrpend) / 2));
            }
            else {
            }
            _this.drawobj.showselect();
        });
    };
    Suit.prototype.alarmOn = function (alarmType) {
        if (alarmType === void 0) { alarmType = ''; }
        this.lazyEmit('alarmOn', alarmType);
    };
    Suit.prototype.alarmOff = function (alarmType) {
        this.lazyEmit('alarmOff', alarmType);
    };
    Suit.prototype.createLine = function () {
        if (this.rowline)
            return;
        var barTool = this.barTool;
        var lineTool = (this.lineTool = barTool.createHLine('blue'));
        var rowline = lineTool.rowline, addDot = lineTool.addDot, setBase = lineTool.setBase;
        this.rowline = rowline.on('change:y', function (v) {
            console.log('rowline', v);
        });
        var dot0 = addDot({ left: 10 });
        var dot1 = addDot({ left: 100 });
        rowline.setStyle('background', '#FFCC99');
        dot0.setStyle('border-right-color', '#AA33AA');
        dot0.setStyle('border-bottom-color', '#AA33AA');
        dot1.setStyle('border-left-color', '#FF2233');
        dot1.setStyle('border-bottom-color', '#FF2233');
        dot0.on('change:x', function (v) {
            console.log('dot0', v);
        });
        dot1.on('change:x', function (v) {
            console.log('dot1', v);
        });
        var dot2 = addDot({ left: 100 });
        dot2.setVisibility(false);
        setBase(200);
        lineTool.toggleVisibility();
    };
    Suit.prototype.createBar = function () {
        var _this = this;
        if (this.startingBar && this.endingBar && this.selectingBar) {
            return;
        }
        this.createLine();
        var barTool = this.barTool;
        var startingBar = (this.startingBar = barTool.createRod('开始'));
        var endingBar = (this.endingBar = barTool.createRod('结束'));
        var selectingBar = (this.selectingBar = barTool.createRod('选择'));
        this.type === 0 && selectingBar.setVisibility(false);
        selectingBar.setLeft(0);
        startingBar.setLeft(0);
        endingBar.toggleVisibility();
        startingBar.toggleVisibility();
        selectingBar.on('change:x', function (value) {
            _this.drawobj.showcur(_this.selectingBarPoint, false);
        });
        startingBar.on('change:x', function (value) {
            _this.$selectrpstart = _this.leftViewposition + value * 2;
        });
        endingBar.on('change:x', function (value) {
            if (_this.data.index < _this.canvasline.width * 2) {
                _this.selectrpend = value * 2;
            }
            else {
                _this.selectrpend = _this.viewposition - (_this.canvasline.width - value) * 2;
            }
            if (_this.selectrpstart > _this.selectrpend) {
                return;
            }
            _this.drawobj.showselect();
            _this.emit('endTime', _this.selectrpend);
            _this.$selectrpend = _this.leftViewposition + value * 2;
        });
    };
    Suit.prototype.lockStartingBar = function (status) {
    };
    Suit.prototype.destroy = function () {
        this.intervalIds.forEach(function (_) { return clearInterval(_); });
        this.canvasgrid = null;
        this.canvasdata = null;
        this.contextgrid = null;
        this.contextdata = null;
        this.canvasline = null;
        this.contextline = null;
        this.canvasselect = null;
        this.contextselect = null;
        this.canvasanalyse = null;
        this.contextanalyse = null;
        this.wrap = null;
        this.drawobj = null;
        this.barTool = null;
    };
    Suit.prototype._resize = function () {
        this.drawobj.resize();
    };
    Suit.prototype.setfetalposition = function (fhr1, fhr2, fhr3) {
        this.data.fetalposition.fhr1 = fhr1;
        this.data.fetalposition.fhr2 = fhr2;
        this.data.fetalposition.fhr3 = fhr3;
    };
    Suit.prototype.updateBarTool = function () {
        this.updateSelectCur();
        var len = 100;
        if (this.data.index < this.canvasline.width * 4) {
            len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
        }
        this.toolbarposition = Math.floor(((this.canvasline.width - len) * (this.viewposition - this.canvasline.width * 2)) /
            (this.data.index - this.canvasline.width * 2));
        this.barTool.setBarLeft(this.toolbarposition, false);
    };
    Suit.prototype.updateSelectCur = function () {
        if (this.viewposition > this.canvasline.width * 2) {
            this.selectstart =
                this.selectstartposition * 2 + this.viewposition - 2 * this.canvasline.width;
        }
        else {
            this.selectstart = this.selectstartposition * 2;
        }
        this.drawobj.showcur(this.selectstart, false);
    };
    Suit.prototype.movescoller = function () { };
    Suit.prototype.InitFileData = function (oriobj) {
        var CTGDATA = {
            fhr: [[], [], []],
            toco: [],
            fm: [],
            fetal_num: 2,
            index: 0,
            starttime: '',
            fetalposition: {},
            analyse: { acc: [], dec: [], baseline: [], start: 0, end: 0 },
        };
        if (oriobj.docid) {
            var pureidarr = oriobj.docid.split('_');
            var pureid = pureidarr[2];
            CTGDATA.starttime = utils_1.convertstarttime(pureid);
        }
        if (typeof oriobj.fetalposition != 'undefined' &&
            oriobj.fetalposition != null &&
            oriobj.fetalposition != '') {
            var positionobj = JSON.parse(oriobj.fetalposition);
            CTGDATA.fetalposition = positionobj;
            console.log(oriobj.fetalposition, typeof this.data.fetalposition, this.data.fetalposition, this);
        }
        Object.keys(oriobj).forEach(function (key) {
            var oridata = oriobj[key];
            if (!oridata || oridata === '') {
                return false;
            }
            if (key === 'docid') {
                return false;
            }
            if (key === 'analyse') {
                Object.assign(CTGDATA.analyse, formatAnalyseData(oridata));
                return;
            }
            if (key === 'fhr1') {
                CTGDATA.index = oridata.length / 2;
            }
            for (var i = 0; i < CTGDATA.index; i++) {
                if (typeof oridata != 'string' || oridata.length < 2) {
                    return;
                }
                var hexBits = oridata.substring(0, 2);
                var data_to_push = parseInt(hexBits, 16);
                if (key === 'fhr1') {
                    CTGDATA.fhr[0][i] = data_to_push;
                }
                else if (key === 'fhr2') {
                    CTGDATA.fhr[1][i] = data_to_push;
                }
                else if (key === 'fhr3') {
                    CTGDATA.fhr[2][i] = data_to_push;
                }
                else if (key === 'toco') {
                    CTGDATA.toco[i] = data_to_push;
                }
                else if (key === 'fm') {
                    CTGDATA.fm[i] = data_to_push;
                }
                oridata = oridata.substring(2, oridata.length);
            }
        });
        return CTGDATA;
    };
    Suit.prototype.drawdot = function () {
        if (this.data.starttime &&
            this.data.starttime != '' &&
            this.data.status == 1 &&
            this.data.index > 0 &&
            this.isOn) {
            if (isNaN(this.data.csspan))
                return;
            this.curr =
                (Math.floor(new Date().getTime() / 1000) -
                    Math.floor(new Date(this.data.starttime).getTime() / 1000)) *
                    4 +
                    this.data.csspan;
            if (this.curr < 0)
                return;
            this.drawobj.drawdot(this.curr, true);
            this.viewposition = this.curr;
            if (this.data.index > this.canvasline.width * 2) {
                if (this.data.index < this.canvasline.width * 4) {
                    var len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
                    this.barTool.setBarWidth(len);
                }
                else {
                    this.barTool.setBarWidth(100);
                }
                this.barTool.setBarLeft(this.canvasline.width, false);
            }
            else {
                this.barTool.setBarWidth(0);
            }
        }
        else {
            this.alarmOff('');
            this.drawobj.showcur(this.data.index + 2, false);
            this.drawobj.drawdot(this.data.index + 2, false);
        }
    };
    Suit.prototype.timerCtg = function (dely) {
        var _this = this;
        var id = setInterval(function () {
            if (!_this) {
                clearInterval(id);
            }
            var curstamp = new Date().getTime();
            if (curstamp - _this.dragtimestamp > _this.interval) {
                if (_this.selectstartposition != 0) {
                    _this.startingBar.setLeft(0);
                }
                _this.drawdot();
            }
        }, dely);
        this.intervalIds.push(id);
    };
    Suit.prototype.onStatusChange = function (status) {
        return status;
    };
    Suit.prototype.getoffline = function (doc_id, offlineend) {
        var _this = this;
        request_1.default.get("/ctg-exams-data/" + doc_id).then(function (responseData) {
            if (responseData) {
                _this.initfhrdata(responseData, _this.data, offlineend);
                _this.data.past = 0;
                _this.requestflag = false;
            }
        });
    };
    Suit.prototype.initfhrdata = function (data, datacache, offindex) {
        Object.keys(data).forEach(function (key) {
            var oridata = data[key];
            if (!oridata) {
                return;
            }
            for (var i = 0; i < offindex; i++) {
                var hexBits = oridata.substring(0, 2);
                var data_to_push = parseInt(hexBits, 16);
                if (key === 'fhr1') {
                    datacache.fhr[0][i] = data_to_push;
                }
                else if (key === 'fhr2') {
                    if (datacache.fhr[1])
                        datacache.fhr[1][i] = data_to_push;
                }
                else if (key === 'fhr3') {
                    if (datacache.fhr[2])
                        datacache.fhr[2][i] = data_to_push;
                }
                else if (key === 'toco') {
                    datacache.toco[i] = data_to_push;
                }
                else if (key === 'fm') {
                    datacache.fm[i] = data_to_push;
                }
                oridata = oridata.substring(2, oridata.length);
            }
        });
    };
    Suit.prototype.selectBasedOnStartingBar = function (isLeft) {
        if (isLeft === void 0) { isLeft = true; }
        var _a = this, startingBar = _a.startingBar, endingBar = _a.endingBar, needScroll = _a.needScroll, width = _a.width, ctgconfig = _a.ctgconfig, data = _a.data, selectstart = _a.selectstart, baseViewposition = _a.leftViewposition, selectingBarPoint = _a.selectingBarPoint;
        var endPosition;
        if (isLeft) {
            if (this.selectingBarPoint < 1) {
                this.rightViewPosition = this.data.index;
                this.selectingBar.setLeft(this.width);
            }
            endPosition = this.selectingBarPoint - ctgconfig.print_interval * 240;
            this.$selectrpstart = endPosition < 0 ? 0 : endPosition;
            this.$selectrpend = this.selectingBarPoint;
        }
        else {
            if (this.selectingBarPoint + 10 >= data.index) {
                this.rightViewPosition = width * 2;
                this.selectingBar.setLeft(0);
            }
            endPosition = this.selectingBarPoint + ctgconfig.print_interval * 240;
            this.$selectrpend = endPosition > data.index ? data.index : endPosition;
            this.$selectrpstart = this.selectingBarPoint;
        }
    };
    return Suit;
}(Draw_1.default));
exports.Suit = Suit;
function formatAnalyseData(obj) {
    var keys = ['acc', 'baseline', 'dec', 'meanbaseline'];
    var arr = Object.entries(obj)
        .filter(function (_a) {
        var k = _a[0], v = _a[1];
        return keys.includes(k);
    })
        .map(function (_a) {
        var k = _a[0], v = _a[1];
        v = typeof v === 'string' ? v : '';
        return [
            k,
            v
                .split(',')
                .map(function (_) { return parseInt(_); })
                .filter(function (_) { return !isNaN(_); }),
        ];
    });
    return __assign(__assign({}, obj), arr.reduce(function (a, _a) {
        var _b;
        var k = _a[0], v = _a[1];
        return Object.assign(a, (_b = {}, _b[k] = v, _b));
    }, {}));
}
