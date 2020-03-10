"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    var _this = this;
    this
        .on('locking', function (value) {
        _this.drawSelect.selectflag = value;
        if (value) {
            _this.drawSelect.startingBar.setVisibility(true);
            _this.drawSelect.endingBar.setVisibility(true);
            _this.drawSelect.selectingBar.setVisibility(false);
        }
        else {
            _this.drawSelect.startingBar.setVisibility(false);
            _this.drawSelect.endingBar.setVisibility(false);
            _this.drawSelect.selectingBar.setVisibility(true);
        }
    })
        .on('customizing', function (value) {
        if (value && _this.drawSelect.selectflag) {
            _this.drawSelect.selectend = 1;
            if (_this.data.index < _this.canvasline.width * 2) {
                _this.drawSelect.endingBar.setVisibility(true);
                _this.drawSelect.endingBar.setLeft(Math.floor(_this.rightViewPosition / 2));
            }
            else if (_this.rightViewPosition - _this.drawSelect.selectrpend >= 0) {
                _this.drawSelect.endingBar.setVisibility(true);
                _this.drawSelect.endingBar.setLeft(_this.canvasline.width - Math.floor((_this.rightViewPosition - _this.drawSelect.selectrpend) / 2));
            }
        }
        else {
            _this.drawSelect.selectend = 0;
            _this.drawSelect.endingBar.setVisibility(false);
            _this.drawSelect.showselect();
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
        _this.drawSelect.$selectrpend = _this.data.index - 2;
        _this.drawSelect.$selectrpstart = 0;
    })
        .on('selectForward', function () {
        _this.drawSelect.selectBasedOnStartingBar(false);
    })
        .on('selectBackward', function () {
        _this.drawSelect.selectBasedOnStartingBar();
    });
    this.log(this);
}
exports.default = default_1;
