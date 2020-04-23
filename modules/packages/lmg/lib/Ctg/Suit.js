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
var request_1 = __importDefault(require("@lianmed/request"));
var lodash_1 = require("lodash");
var Draw_1 = __importDefault(require("../Draw"));
var utils_1 = require("../services/utils");
var bindEvents_1 = __importDefault(require("./bindEvents"));
var DrawCTG_1 = __importDefault(require("./DrawCTG"));
var DrawAnalyse_1 = require("./drawTools/DrawAnalyse");
var DrawSelect_1 = require("./drawTools/DrawSelect");
var utils_2 = require("@lianmed/utils");
var sid = 0;
var Suit = (function (_super) {
    __extends(Suit, _super);
    function Suit(canvasgrid, canvasdata, canvasline, canvasselect, canvasanalyse, wrap, barTool, type) {
        var _this = _super.call(this) || this;
        _this.needScroll = false;
        _this.option = Suit.option;
        _this.initFlag = false;
        _this.sid = sid++;
        _this.log = (console && console.log) ? console.log.bind(console, 'suit', _this.sid) : function () { };
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
        _this.requestflag = false;
        _this.dragtimestamp = 0;
        _this.interval = 5000;
        _this.toolbarposition = 0;
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
        _this.contextgrid = canvasgrid.getContext('2d');
        _this.contextdata = canvasdata.getContext('2d');
        _this.contextline = canvasline.getContext('2d');
        _this.barTool = barTool;
        _this.drawobj = new DrawCTG_1.default(_this);
        _this.type = type;
        _this.drawAnalyse = new DrawAnalyse_1.DrawAnalyse(canvasanalyse, _this.width, _this.height, _this);
        _this.drawSelect = new DrawSelect_1.DrawSelect(canvasselect, _this);
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
    Object.defineProperty(Suit.prototype, "leftViewposition", {
        get: function () {
            return this.rightViewPosition >= this.width * 2 ? this.rightViewPosition - this.width * 2 : 0;
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
            this.emit('change:selectPoint', this.drawSelect.selectingBarPoint);
            this.updateBarTool();
            this.drawobj.drawdot((this.type > 0 && this.viewposition < this.width * 2) ? this.width * 2 : this.viewposition);
        },
        enumerable: true,
        configurable: true
    });
    Suit.prototype.init = function (data) {
        var _this = this;
        this.drawAnalyse.init();
        this.drawSelect.init();
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
        this.drawSelect.clearselect();
        this.drawobj.showcur(0, false);
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
            this.rightViewPosition = this.curr;
        }
        else {
            this.timerCtg(defaultinterval);
        }
        this.barTool.watch(function (value) {
            _this.getoffline();
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
            _this.drawSelect.updateSelectCur();
            _this.drawSelect.showselect();
            _this.drawobj.drawdot(_this.rightViewPosition, false);
        });
        this.barTool.watchGrab(function (value) {
            _this.getoffline();
            var _viewposition;
            value = ~~value * 2;
            if (_this.data.index < _this.canvasline.width * 2) {
                return;
            }
            _this.dragtimestamp = new Date().getTime();
            if (_this.rightViewPosition - value < _this.canvasline.width * 2) {
                _viewposition = _this.canvasline.width * 2;
                _this.drawobj.drawdot(_this.rightViewPosition, false);
                if (_this.drawSelect.selectend == 1) {
                    _this.drawSelect.endingBar.setLeft(_this.canvasline.width - Math.floor((_this.rightViewPosition - _this.drawSelect.selectrpend) / 2));
                }
                _this.drawSelect.showselect();
                _this.updateBarTool();
                return;
            }
            if (_this.rightViewPosition - value < _this.data.index) {
                _viewposition = _this.rightViewPosition - value;
                _this.drawobj.drawdot(_this.rightViewPosition, false);
            }
            else {
                _viewposition = _this.data.index;
                _this.drawobj.drawdot(_this.rightViewPosition, false);
            }
            _this.updateBarTool();
            _this.rightViewPosition = _viewposition;
            if (_this.drawSelect.selectend == 1 && _this.rightViewPosition - _this.drawSelect.selectrpend > -2) {
                _this.drawSelect.endingBar.setLeft(_this.canvasline.width - Math.floor((_this.rightViewPosition - _this.drawSelect.selectrpend) / 2));
            }
            else {
            }
            _this.drawSelect.showselect();
            _this.drawobj.drawdot(_this.rightViewPosition, false);
        });
        console.log('yyyyyyyyyyyy--------emit');
        this.emit('afterInit');
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
    Suit.prototype.updateBarTool = function () {
        this.drawSelect.updateSelectCur();
        var len = 100;
        if (this.data.index < this.canvasline.width * 4) {
            len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
        }
        this.toolbarposition = Math.floor(((this.canvasline.width - len) * (this.rightViewPosition - this.canvasline.width * 2)) /
            (this.data.index - this.canvasline.width * 2));
        this.barTool.setBarLeft(this.toolbarposition, false);
    };
    Suit.prototype.alarmOn = function (alarmType) {
        if (alarmType === void 0) { alarmType = ''; }
        this.lazyEmit('alarmOn', alarmType);
    };
    Suit.prototype.alarmOff = function (alarmType) {
        this.lazyEmit('alarmOff', alarmType);
    };
    Suit.prototype.destroy = function () {
        this.intervalIds.forEach(function (_) { return clearInterval(_); });
        this.canvasgrid = null;
        this.canvasdata = null;
        this.contextgrid = null;
        this.contextdata = null;
        this.canvasline = null;
        this.contextline = null;
        this.wrap = null;
        this.drawobj = null;
        this.barTool = null;
    };
    Suit.prototype._resize = function () {
        var _a = this.wrap.getBoundingClientRect(), width = _a.width, height = _a.height;
        Object.values(this).forEach(function (_) { return _ && _.resize && _.resize(width, height); });
    };
    Suit.prototype.setfetalposition = function (fhr1, fhr2, fhr3) {
        this.data.fetalposition.fhr1 = fhr1;
        this.data.fetalposition.fhr2 = fhr2;
        this.data.fetalposition.fhr3 = fhr3;
    };
    Suit.prototype.movescoller = function () { };
    Suit.prototype.InitFileData = function (oriobj) {
        console.log('InitFileData');
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
            if (key === 'analyse' && oridata) {
                Object.assign(CTGDATA.analyse, oridata);
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
            this.rightViewPosition = this.curr;
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
                if (_this.drawSelect.selectstartposition != 0) {
                    _this.drawSelect.startingBar.setLeft(0);
                }
                _this.drawdot();
            }
        }, dely);
        this.intervalIds.push(id);
    };
    Suit.prototype.onStatusChange = function (status) {
        return status;
    };
    Suit.prototype.getoffline = function () {
        var _this = this;
        var doc_id = this.data.docid;
        var offlineend = this.data.past;
        if (!this.requestflag && this.type == 0 && this.data.past > 0) {
            this.requestflag = true;
            request_1.default.get("/ctg-exams-data/" + doc_id).then(function (responseData) {
                if (responseData) {
                    _this.initfhrdata(responseData, _this.data, offlineend);
                    _this.data.past = 0;
                    _this.requestflag = false;
                }
            });
        }
        utils_2.event.emit('suit:keepData');
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
    Suit.prototype.getPointType = function (x, y) {
        var analysisData = this.drawAnalyse.analysisData;
        if (analysisData) {
            var edge_1 = 20;
            var _a = analysisData.analysis, acc = _a.acc, dec = _a.dec;
            var target = acc.find(function (_) { return (x < _.x + edge_1) && (x > _.x - edge_1); }) || dec.find(function (_) { return (x < _.x + edge_1) && (x > _.x - edge_1); });
            if (target && (y < (target.y + edge_1) && y > (target.y - edge_1))) {
                var isDec = 'type' in target;
                return isDec ? 'DecPoint' : 'AccPoint';
            }
        }
        return null;
    };
    return Suit;
}(Draw_1.default));
exports.Suit = Suit;
//# sourceMappingURL=Suit.js.map