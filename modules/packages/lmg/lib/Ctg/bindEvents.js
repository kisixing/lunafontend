"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    var _this = this;
    this
        .on('locking', function (value) {
        _this.selectflag = value;
        if (value) {
            _this.startingBar.setVisibility(true);
            _this.endingBar.setVisibility(true);
            _this.selectingBar.setVisibility(false);
        }
        else {
            _this.startingBar.setVisibility(false);
            _this.endingBar.setVisibility(false);
            _this.selectingBar.setVisibility(true);
        }
    })
        .on('customizing', function (value) {
        if (value && _this.selectflag) {
            _this.selectend = 1;
            if (_this.data.index < _this.canvasline.width * 2) {
                _this.endingBar.setVisibility(true);
                _this.endingBar.setLeft(Math.floor(_this.viewposition / 2));
            }
            else if (_this.viewposition - _this.selectrpend >= 0) {
                _this.endingBar.setVisibility(true);
                _this.endingBar.setLeft(_this.canvasline.width - Math.floor((_this.viewposition - _this.selectrpend) / 2));
            }
        }
        else {
            _this.selectend = 0;
            _this.endingBar.setVisibility(false);
            _this.drawobj.showselect();
        }
    })
        .on('setStartingTime', function (value) {
    })
        .on('setEndingTime', function (value) {
    })
        .on('showLine', function () {
        _this.createLine();
    })
        .on('selectAll', function () {
        _this.$selectrpend = _this.data.index - 2;
        _this.$selectrpstart = 0;
    })
        .on('selectForward', function () {
        var selectingBar = _this.selectingBar;
        var hasMoved = selectingBar.hasMoved;
        console.log('hasMoved', hasMoved);
        _this.selectBasedOnStartingBar(false);
        _this.updateBarTool();
        _this.drawobj.showselect();
    })
        .on('selectBackward', function () {
        var selectingBar = _this.selectingBar;
        var hasMoved = selectingBar.hasMoved;
        console.log('hasMoved', hasMoved);
        _this.selectBasedOnStartingBar();
        _this.drawobj.showselect();
        _this.updateBarTool();
    });
    this.log(this);
}
exports.default = default_1;
