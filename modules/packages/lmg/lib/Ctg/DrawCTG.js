"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date, format) {
    if (!date)
        return;
    if (!format)
        format = 'yyyy-MM-dd';
    switch (typeof date) {
        case 'string':
            date = new Date(date.replace(/-/, '/'));
            break;
        case 'number':
            date = new Date(date);
            break;
    }
    if (!(date instanceof Date))
        return;
    var dict = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: ('' + (date.getMonth() + 101)).substr(1),
        dd: ('' + (date.getDate() + 100)).substr(1),
        HH: ('' + (date.getHours() + 100)).substr(1),
        mm: ('' + (date.getMinutes() + 100)).substr(1),
        ss: ('' + (date.getSeconds() + 100)).substr(1),
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
}
var DrawCTG = (function () {
    function DrawCTG(suit, xspan, yspan, scalespan, fhroffset, baseleft, basetop, min, max) {
        var _this = this;
        if (xspan === void 0) { xspan = 40; }
        if (yspan === void 0) { yspan = 1; }
        if (scalespan === void 0) { scalespan = 30; }
        if (fhroffset === void 0) { fhroffset = -20; }
        if (baseleft === void 0) { baseleft = 0; }
        if (basetop === void 0) { basetop = 10; }
        if (min === void 0) { min = 50; }
        if (max === void 0) { max = 210; }
        this.sethorizontal = function (length, startposition, drawtimespan) {
            if (drawtimespan === void 0) { drawtimespan = true; }
            var _a = _this, setrules = _a.setrules, gridcontext = _a.gridcontext, baseleft = _a.baseleft, min = _a.min, max = _a.max, xspan = _a.xspan;
            if (drawtimespan) {
                _this.starttime = _this.suit.data.starttime;
            }
            if (_this.starttime == '') {
                _this.starttime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
            }
            var offsetpx = Math.floor((startposition % (xspan * 2)) / 2);
            var offseti = Math.floor(startposition / (xspan * 2));
            var offsetlpx = 40 - Math.floor((length % xspan));
            var offsetmin = startposition / (xspan * 2 * 3);
            var linecount = Math.ceil(length / xspan);
            var primaryflag = linecount % 3;
            var primaryscaleflag = linecount % 6;
            var minflag = (linecount) % 2;
            for (var i = linecount; i > 0; i--) {
                var ioff = i + offseti;
                gridcontext.beginPath();
                gridcontext.strokeStyle = _this.suit.ctgconfig.secondarygrid;
                gridcontext.lineWidth = 0.8;
                if (ioff % 3 == primaryflag) {
                    gridcontext.strokeStyle = _this.suit.ctgconfig.primarygrid;
                }
                if (startposition == 0) {
                    if (ioff % 6 == primaryscaleflag) {
                        if (drawtimespan) {
                            _this.setscalestyle(gridcontext, _this.suit.ctgconfig.scale);
                            var fMinutes = Math.floor(offsetmin - (1.0 * (linecount - i)) / 3);
                            if (fMinutes >= 0) {
                                var tmpyoffset = Math.floor((max - min) * _this.yspan + _this.scalespan / 4) + _this.basetop;
                                gridcontext.fillText(fMinutes + '分', baseleft + xspan * i + baseleft - offsetpx - offsetlpx - 20, tmpyoffset);
                            }
                        }
                    }
                }
                else {
                    if (ioff % 6 == primaryscaleflag) {
                        if (drawtimespan) {
                            var firstoffset = 0;
                            _this.setscalestyle(gridcontext, _this.suit.ctgconfig.scale);
                            var fMinutes = Math.floor(offsetmin - (1.0 * (linecount - i)) / 3);
                            var tmpyoffset = Math.floor((max - min) * _this.yspan + _this.scalespan / 4) + _this.basetop;
                            if (fMinutes == 0) {
                                firstoffset = 10;
                            }
                            if (offseti > linecount - i - 2) {
                                var flag = Math.ceil(ioff / 6) % 2;
                                if (flag == minflag) {
                                    var date = new Date(_this.starttime);
                                    var timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
                                    if (startposition == 0 && i == 1) {
                                        gridcontext.fillText(timescale, length - offsetpx, tmpyoffset);
                                    }
                                    else {
                                        gridcontext.fillText(timescale, baseleft + xspan * i - offsetpx - offsetlpx - 10 + firstoffset, tmpyoffset);
                                    }
                                }
                                else {
                                    fMinutes = Math.ceil(fMinutes);
                                    if (startposition == 0 && i == 0) {
                                        gridcontext.fillText(fMinutes + '分', baseleft - offsetpx, tmpyoffset);
                                    }
                                    else {
                                        gridcontext.fillText(fMinutes + '分', baseleft + xspan * i + baseleft - offsetpx - offsetlpx - 10 + firstoffset, tmpyoffset);
                                    }
                                }
                            }
                        }
                    }
                }
                gridcontext.moveTo(xspan * i - offsetlpx + baseleft - offsetpx, (max - min) * _this.yspan + _this.scalespan + _this.basetop);
                gridcontext.lineTo(xspan * i - offsetlpx + baseleft - offsetpx, (max - min + 100) * _this.yspan + _this.scalespan + _this.basetop);
                gridcontext.moveTo(xspan * i - offsetlpx + baseleft - offsetpx, 0 + _this.basetop);
                gridcontext.lineTo(xspan * i - offsetlpx + baseleft - offsetpx, (max - min) * _this.yspan + _this.basetop);
                gridcontext.stroke();
                if (ioff % 6 == primaryscaleflag) {
                    setrules(xspan * (i + 3) + baseleft - offsetlpx - offsetpx);
                }
            }
        };
        this.sethorizontalright = function (length, startposition, drawtimespan) {
            if (drawtimespan === void 0) { drawtimespan = true; }
            var _a = _this, setrules = _a.setrules, gridcontext = _a.gridcontext, baseleft = _a.baseleft, min = _a.min, max = _a.max, xspan = _a.xspan;
            if (drawtimespan) {
                _this.starttime = _this.suit.data.starttime;
            }
            if (_this.starttime == '') {
                _this.starttime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
            }
            var offsetpx = Math.floor(((length - startposition) % (xspan * 2)) / 2);
            var offseti = Math.floor(startposition / (xspan * 2));
            var offsetmin = startposition / (xspan * 2 * 3);
            var linecount = Math.ceil(length / (xspan * 2));
            var lineoff = length % (xspan * 2);
            var primaryflag = linecount % 3;
            var primaryscaleflag = linecount % 6;
            for (var i = linecount * 2; i > 0; i--) {
                var ioff = i + offseti;
                gridcontext.beginPath();
                gridcontext.strokeStyle = _this.suit.ctgconfig.secondarygrid;
                gridcontext.lineWidth = 0.8;
                if (ioff % 3 == primaryflag) {
                    gridcontext.strokeStyle = _this.suit.ctgconfig.primarygrid;
                }
                if (ioff % 6 == primaryscaleflag) {
                    if (drawtimespan) {
                        _this.setscalestyle(gridcontext, _this.suit.ctgconfig.scale);
                        var fMinutes = Math.ceil(offsetmin - (1.0 * (linecount * 2 - i)) / 3);
                        var tmpyoffset = Math.floor((max - min) * _this.yspan + _this.scalespan / 4) + _this.basetop;
                        if (offseti > linecount * 2 - i - 2) {
                            var flag = Math.ceil((ioff - 1) / 6) % 2;
                            if (flag == 1) {
                                var date = new Date(_this.starttime);
                                var timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
                                if (startposition == 0 && i == 1) {
                                    gridcontext.fillText(timescale, length - offsetpx, tmpyoffset);
                                }
                                else {
                                    gridcontext.fillText(timescale, baseleft + xspan * i - offsetpx - 10, tmpyoffset);
                                }
                            }
                            else {
                                fMinutes = Math.ceil(fMinutes);
                                if (startposition == 0 && i == 0) {
                                    gridcontext.fillText(fMinutes + '分', baseleft - offsetpx, tmpyoffset);
                                }
                                else {
                                    gridcontext.fillText(fMinutes + '分', baseleft + xspan * i + baseleft - offsetpx - 10, tmpyoffset);
                                }
                            }
                        }
                    }
                }
                gridcontext.moveTo(xspan * i + baseleft - 40 + lineoff + offsetpx, (max - min) * _this.yspan + _this.scalespan + _this.basetop);
                gridcontext.lineTo(xspan * i + baseleft - 40 + lineoff + offsetpx, (max - min + 100) * _this.yspan + _this.scalespan + _this.basetop);
                gridcontext.moveTo(xspan * i + baseleft - 40 + lineoff + offsetpx, 0 + _this.basetop);
                gridcontext.lineTo(xspan * i + baseleft - 40 + lineoff + offsetpx, (max - min) * _this.yspan + _this.basetop);
                gridcontext.stroke();
                if (ioff % 6 == primaryscaleflag) {
                    setrules(xspan * (i + 3) + baseleft - offsetpx);
                }
            }
        };
        this.setvertical = function (_maxline, startposition) {
            var _a = _this, gridcontext = _a.gridcontext, baseleft = _a.baseleft, min = _a.min, max = _a.max;
            for (var i = 0; i < (max - min) / 10 + 1; i++) {
                gridcontext.beginPath();
                gridcontext.lineWidth = 0.8;
                if (i % 3 == 0) {
                    gridcontext.strokeStyle = _this.suit.ctgconfig.primarygrid;
                }
                else {
                    gridcontext.strokeStyle = _this.suit.ctgconfig.secondarygrid;
                }
                gridcontext.moveTo(baseleft, _this.yspan * i * 10 + _this.basetop);
                gridcontext.lineTo(_maxline, _this.yspan * i * 10 + _this.basetop);
                gridcontext.stroke();
            }
            for (var i = 0; i < 12; i++) {
                gridcontext.beginPath();
                gridcontext.lineWidth = 0.8;
                gridcontext.strokeStyle = _this.suit.ctgconfig.primarygrid;
                if (i % 2 == 1) {
                    gridcontext.strokeStyle = _this.suit.ctgconfig.secondarygrid;
                }
                gridcontext.moveTo(baseleft, (max - min + i * 10) * _this.yspan + _this.scalespan + _this.basetop);
                gridcontext.lineTo(_maxline, (max - min + i * 10) * _this.yspan + _this.scalespan + _this.basetop);
                gridcontext.stroke();
            }
        };
        this.setrules = function (x) {
            var _a = _this, min = _a.min, max = _a.max, gridcontext = _a.gridcontext;
            gridcontext.beginPath();
            _this.setscalestyle(gridcontext, _this.suit.ctgconfig.rule);
            for (var i = 1; i < (max - min) / 10 + 1; i++) {
                if (i % 3 == 1) {
                    gridcontext.fillText(String(max - (i - 1) * 10), x, (i - 1) * 10 * _this.yspan + 2);
                }
            }
            for (var i = 0; i < 11; i++) {
                if (i % 2 == 0) {
                    gridcontext.fillText(String((10 - i) * 10), x, (max - min + i * 10) * _this.yspan + _this.basetop + _this.scalespan);
                }
            }
            gridcontext.stroke();
        };
        this.showcur = function (x, eventemit) {
            if (eventemit === void 0) { eventemit = false; }
            var _a = _this, suit = _a.suit, datacontext = _a.datacontext;
            if (!suit.data)
                return;
            var _b = suit.data, fhr = _b.fhr, toco = _b.toco;
            var curpostion = 10;
            var EMPTY_SYMBOL = '-- --';
            var startx = x;
            var fontsize = Math.floor(suit.height / 20);
            fontsize = fontsize < 16 ? 16 : fontsize;
            datacontext.clearRect(0, 0, fontsize * 10, fontsize * 5);
            datacontext.textAlign = 'left';
            datacontext.textBaseline = 'top';
            if (typeof (fhr[0]) == "undefined") {
                return;
            }
            if (x < suit.data.index + 1) {
                for (var i = startx; i > 0; i--) {
                    if (typeof (fhr[0][x]) != "undefined") {
                        x = i;
                        break;
                    }
                }
            }
            var alarm = 0;
            var label = '';
            var span = '';
            var offsetfhr = '';
            for (var i = 0; i < suit.data.fetal_num; i++) {
                label = '';
                offsetfhr = '';
                span = '';
                datacontext.font = 'bold ' + fontsize + 'px arial';
                datacontext.fillStyle = suit.ctgconfig.fhrcolor[i];
                var cv = fhr[i] && fhr[i][x];
                var curvalue = (typeof cv !== 'number' || cv < 1 || cv > 240) ? EMPTY_SYMBOL : cv.toString();
                datacontext.fillStyle = suit.ctgconfig.alarmcolor;
                if (suit.ctgconfig.alarm_enable && cv > suit.ctgconfig.alarm_high) {
                    if (eventemit) {
                        console.log('心率过高', cv);
                        _this.suit.alarmHigh();
                    }
                    alarm = 1;
                    _this.suit.alarm = alarm;
                }
                else if (suit.ctgconfig.alarm_enable && cv < suit.ctgconfig.alarm_low) {
                    if (eventemit) {
                        console.log('心率过低', cv, _this.suit.ctgconfig.alarm_delay);
                        _this.suit.alarmLow();
                    }
                    alarm = 1;
                    _this.suit.alarm = alarm;
                }
                else {
                    datacontext.fillStyle = suit.ctgconfig.fhrcolor[i];
                }
                if (alarm == 0 && suit.ctgconfig.alarm_enable && _this.suit.alarm == 1) {
                    console.log('恢复', cv, curvalue, alarm, _this.suit.alarm, suit.ctgconfig.alarm_high < cv, suit.ctgconfig.alarm_low > cv, x);
                    _this.suit.alarmOff();
                    _this.suit.alarm = alarm;
                }
                if (i == 0) {
                    if (suit.data.fetalposition && typeof (suit.data.fetalposition.fhr1) != 'undefined') {
                        label = suit.data.fetalposition.fhr1;
                    }
                }
                else if (i == 1) {
                    if (suit.data.fetalposition && typeof (suit.data.fetalposition.fhr2) != 'undefined') {
                        label = suit.data.fetalposition.fhr2;
                    }
                    offsetfhr = ' ' + _this.fhroffset;
                }
                else if (i == 2) {
                    if (suit.data.fetalposition && typeof (suit.data.fetalposition.fhr3) != 'undefined') {
                        label = suit.data.fetalposition.fhr3;
                    }
                    offsetfhr = ' ' + -_this.fhroffset;
                }
                else {
                    label = '';
                }
                if (typeof (label) == 'undefined') {
                    label = '';
                }
                if (label.length > 0 || i > 0) {
                    span = '    ';
                }
                datacontext.fillText('FHR' + (i + 1) + span + ' : ' + curvalue, 10, curpostion);
                if (label.length > 0 || i > 0) {
                    datacontext.font = 'bold ' + fontsize / 2 + 'px arial';
                    datacontext.fillText(label, 10 + fontsize * 2.8, curpostion);
                    datacontext.fillText(offsetfhr, 10 + fontsize * 2.8, curpostion + fontsize / 2);
                }
                curpostion += fontsize;
            }
            datacontext.fillStyle = suit.ctgconfig.tococolor;
            var tocoCv = toco[x];
            var tocoCurValue = (typeof tocoCv !== 'number' || tocoCv === -1 || tocoCv > 100) ? EMPTY_SYMBOL : tocoCv.toString();
            datacontext.font = "bold " + fontsize + "px arial";
            datacontext.fillText("TOCO: " + tocoCurValue, 10, curpostion);
        };
        this.showfm = function (postion) {
            var _a = _this, gridcontext = _a.gridcontext, max = _a.max, min = _a.min;
            var yposition = _this.yspan * (max - min) + _this.basetop + 18;
            gridcontext.beginPath();
            gridcontext.strokeStyle = 'rgb(0,0,0)';
            gridcontext.lineWidth = 6;
            gridcontext.moveTo(postion, yposition);
            gridcontext.lineTo(postion, yposition + 6);
            gridcontext.stroke();
        };
        this.suit = suit;
        this.gridcontext = suit.contextgrid;
        this.linecontext = suit.contextline;
        this.datacontext = suit.contextdata;
        this.xspan = xspan;
        this.yspan = yspan;
        this.scalespan = scalespan;
        this.basetop = basetop;
        this.baseleft = baseleft;
        this.fhroffset = fhroffset;
        this.min = min;
        this.max = max;
        this.starttime = suit.starttime;
    }
    DrawCTG.prototype.resize = function () {
        var _a = this.suit, width = _a.width, height = _a.height;
        var oldwidth = JSON.parse(JSON.stringify(this.suit.canvasline.width));
        console.log('resize', oldwidth);
        this.suit.canvasline.width = width;
        this.suit.canvasline.height = height;
        this.suit.canvasgrid.width = width;
        this.suit.canvasgrid.height = height;
        this.suit.canvasdata.width = width;
        this.suit.canvasdata.height = height;
        this.yspan = (height - this.scalespan - this.basetop) / (this.max + 100 - this.min);
        console.log('resize', this.suit.data, this.suit.rightViewPosition, this.suit.toolbarposition, oldwidth, width);
        if (typeof (this.suit.data) != 'undefined') {
            if (this.suit.data.index > width * 2) {
                this.suit.rightViewPosition = Math.floor(2 * width);
                if (this.suit.data.index < width * 4) {
                    var len = Math.floor((width * 4 - this.suit.data.index) / 2);
                    this.suit.barTool.setBarWidth(len);
                }
                else {
                    this.suit.barTool.setBarWidth(100);
                }
                this.suit.barTool.setBarLeft(Math.floor(this.suit.toolbarposition * width / oldwidth), false);
            }
            else {
                this.drawdot(width * 2);
            }
        }
        else {
            this.drawgrid(width * 2, false);
        }
        if (this.suit.drawSelect.selectstartposition > width) {
            this.suit.drawSelect.startingBar.setLeft(width);
        }
    };
    DrawCTG.prototype.drawgrid = function (cur, drawtimespan) {
        if (drawtimespan === void 0) { drawtimespan = true; }
        var _a = this, suit = _a.suit, sethorizontal = _a.sethorizontal, setvertical = _a.setvertical, gridcontext = _a.gridcontext;
        var cwidth = suit.canvasline.width;
        var cheight = suit.canvasline.height;
        gridcontext.clearRect(0, 0, cwidth, cheight);
        gridcontext.fillStyle = suit.ctgconfig.normalarea;
        gridcontext.fillRect(0, 50 * this.yspan + this.basetop, cwidth, 50 * this.yspan);
        sethorizontal(cwidth, cur, drawtimespan);
        setvertical(cwidth, cur);
    };
    DrawCTG.prototype.drawdotright = function (cur) {
    };
    DrawCTG.prototype.drawdot = function (cur, isemit) {
        if (isemit === void 0) { isemit = false; }
        cur = Math.round(cur);
        var _a = this, suit = _a.suit, linecontext = _a.linecontext, max = _a.max;
        var drawAnalyse = suit.drawAnalyse;
        var _b = suit.data, fhr = _b.fhr, toco = _b.toco, fm = _b.fm;
        if (typeof (fhr[0]) == "undefined") {
            this.drawgrid(cur, false);
            return;
        }
        this.drawgrid(cur);
        if (suit.type == 0) {
            this.showcur(cur, isemit);
        }
        var lastx = 0;
        var lasty = 0;
        linecontext.clearRect(0, 0, suit.canvasline.width, suit.canvasline.height);
        var start = cur - suit.canvasline.width * 2 > 0 ? cur - suit.canvasline.width * 2 : 0;
        var alarmstate = 0;
        for (var fetal = 0; fetal < suit.data.fetal_num; fetal++) {
            linecontext.beginPath();
            linecontext.strokeStyle = suit.ctgconfig.fhrcolor[fetal];
            linecontext.lineWidth = 1;
            var curfhroffset = 0;
            if (fetal == 1) {
                curfhroffset = this.fhroffset;
            }
            else if (fetal == 2) {
                curfhroffset = -this.fhroffset;
            }
            for (var i_1 = start; i_1 < cur; i_1++) {
                if (i_1 % 2 == 1)
                    continue;
                if (start == 0) {
                    lastx = Math.floor((suit.canvasline.width * 2 - cur + i_1) / 2);
                }
                else {
                    lastx = Math.floor((i_1 - start) / 2);
                }
                var inneri = i_1;
                if (i_1 == start) {
                    linecontext.moveTo(lastx, (max - fhr[fetal][start] - curfhroffset) * this.yspan + this.basetop);
                    continue;
                }
                if (typeof (fhr[fetal][inneri]) != "undefined" && fhr[fetal][inneri] && fhr[fetal][inneri] != 0) {
                    lasty = fhr[fetal][inneri];
                }
                else {
                    if (fhr[fetal][inneri] + curfhroffset > this.max && fhr[fetal][inneri] + curfhroffset < this.min) {
                        continue;
                    }
                    linecontext.moveTo(lastx, (max - 0 - curfhroffset) * this.yspan + this.basetop);
                    continue;
                }
                if (i_1 > 1 && (typeof (fhr[fetal][inneri - 2]) == "undefined" || fhr[fetal][inneri - 2] == 0 || Math.abs(lasty - fhr[fetal][inneri - 2]) > 30) || ((fhr[fetal][inneri - 2] + curfhroffset) < this.min) || ((fhr[fetal][inneri - 2] + curfhroffset) > this.max)) {
                    linecontext.moveTo(lastx, (max - fhr[fetal][inneri] - curfhroffset) * this.yspan + this.basetop);
                }
                else {
                    if (suit.ctgconfig.alarm_enable && (lasty > suit.ctgconfig.alarm_high || lasty < suit.ctgconfig.alarm_low)) {
                        var type = 1;
                        var minoff = 0;
                        var curstand = lasty;
                        if (alarmstate != type) {
                            if (lasty > suit.ctgconfig.alarm_high && fhr[fetal][inneri - 2] < suit.ctgconfig.alarm_high) {
                                minoff = (lasty - suit.ctgconfig.alarm_high) / (lasty - fhr[fetal][inneri - 2]);
                                curstand = suit.ctgconfig.alarm_high;
                            }
                            else if (lasty < suit.ctgconfig.alarm_low && fhr[fetal][inneri - 2] > suit.ctgconfig.alarm_low) {
                                minoff = (lasty - suit.ctgconfig.alarm_low) / (lasty - fhr[fetal][inneri - 2]);
                                curstand = suit.ctgconfig.alarm_low;
                            }
                            else {
                                minoff = 0;
                                curstand = lasty;
                            }
                            this.linecontext.lineTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
                            this.linecontext.stroke();
                            this.linecontext.beginPath();
                            linecontext.lineWidth = 1;
                            this.linecontext.strokeStyle = suit.ctgconfig.alarmcolor;
                            alarmstate = 1;
                            this.linecontext.moveTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
                        }
                    }
                    else {
                        var type = 0;
                        var minoff = 0;
                        var curstand = lasty;
                        if (alarmstate != type) {
                            if (fhr[fetal][inneri - 2] > suit.ctgconfig.alarm_high) {
                                minoff = (lasty - suit.ctgconfig.alarm_high) / (lasty - fhr[fetal][inneri - 2]);
                                curstand = suit.ctgconfig.alarm_high;
                            }
                            else if (fhr[fetal][inneri - 2] < suit.ctgconfig.alarm_low) {
                                minoff = (lasty - suit.ctgconfig.alarm_low) / (lasty - fhr[fetal][inneri - 2]);
                                curstand = suit.ctgconfig.alarm_low;
                            }
                            this.linecontext.lineTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
                            this.linecontext.stroke();
                            this.linecontext.beginPath();
                            linecontext.lineWidth = 1;
                            this.linecontext.strokeStyle = suit.ctgconfig.fhrcolor[fetal];
                            alarmstate = 0;
                            this.linecontext.moveTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
                        }
                    }
                    this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan + this.basetop);
                }
                this.suit.drawAnalyse.drawflag(this.linecontext, lastx, (max - lasty - curfhroffset) * this.yspan, i_1);
            }
            this.linecontext.stroke();
        }
        lastx = 0;
        lasty = 0;
        linecontext.beginPath();
        linecontext.strokeStyle = suit.ctgconfig.tococolor;
        linecontext.lineWidth = 1;
        for (var i = start; i < cur - 2; i++) {
            if (i % 2 == 1)
                continue;
            if (start == 0) {
                lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
            }
            else {
                lastx = Math.floor((i - start) / 2);
            }
            if (toco[i] && toco[i] === -1) {
                continue;
            }
            if (toco[i - 2] === -1) {
                console.log('sd', suit.canvasline.height - toco[i] * this.yspan);
                linecontext.moveTo(lastx, suit.canvasline.height - toco[i] * this.yspan);
                continue;
            }
            if (i > 2 && typeof (toco[i]) != "undefined" && typeof (toco[i - 2]) != "undefined" && toco[i] != 255) {
                linecontext.lineTo(lastx, suit.canvasline.height - toco[i] * this.yspan);
            }
            else {
                if (typeof (toco[i]) != "undefined" && toco[i] != 255) {
                    linecontext.moveTo(lastx, suit.canvasline.height - toco[i] * this.yspan);
                }
                else if (typeof (toco[i - 2]) != "undefined" && toco[i] != 255) {
                    linecontext.moveTo(lastx, suit.canvasline.height - toco[i - 2] * this.yspan);
                }
                else {
                    linecontext.moveTo(lastx, suit.canvasline.height);
                }
            }
        }
        linecontext.stroke();
        for (var i = start; i < cur; i++) {
            if (i % 2 == 1)
                continue;
            if (start == 0) {
                lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
            }
            else {
                lastx = Math.floor((i - start) / 2);
            }
            if (fm[i] == 128 || fm[i] == 1) {
                i = i + 2;
                this.showfm(lastx);
            }
        }
        drawAnalyse.drawBaseline(cur, 'black', this.yspan, this.xspan, max, this.basetop);
    };
    DrawCTG.prototype.setscalestyle = function (context, color) {
        context.font = 'bold 10px consolas';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.font = 'bold 10px arial';
        context.fillStyle = color;
    };
    return DrawCTG;
}());
exports.default = DrawCTG;
//# sourceMappingURL=DrawCTG.js.map