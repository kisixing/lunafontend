"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var request_1 = __importDefault(require("@lianmed/request"));
var button_group_1 = __importDefault(require("antd/lib/button/button-group"));
var antd_1 = require("antd");
var utils_1 = require("@lianmed/utils");
exports.ButtonTools = function (props) {
    var ctg = props.ctg, visible = props.visible, className = props.className, data = props.data;
    var _a = react_1.useState(new Set()), activeList = _a[0], setActiveList = _a[1];
    var audio_ref1 = react_1.useRef();
    var audio_ref2 = react_1.useRef();
    var audio_ref3 = react_1.useRef();
    var timeoutId = react_1.useRef();
    var _b = react_1.useState(0), replayKey = _b[0], setReplayKey = _b[1];
    var audioRefMap = {
        audio_ref1: audio_ref1,
        audio_ref2: audio_ref2,
        audio_ref3: audio_ref3
    };
    var prefix = request_1.default.configure.prefix;
    var btns = [
        {
            text: '心音回放',
            onClick: function () {
                var lineTool = ctg.current.lineTool;
                lineTool && lineTool.toggleVisibility();
            }
        }
    ];
    function stopPlay() {
        utils_1.event.emit('ctg:replay', '', 0);
        clearInterval(timeoutId.current);
    }
    react_1.useEffect(function () {
        function cb() {
            var r = (ctg.current.drawSelect.selectingBarPoint / ctg.current.data.index) || 0;
            var index = ctg.current.data.index * r;
            var i = 0;
            timeoutId.current = setInterval(function () {
                var dis = (index - ctg.current.leftViewposition) / 2;
                console.log('go', dis + 1 * (++i));
                ctg.current.drawSelect.selectingBar.setLeft(dis + 1 * (++i));
            }, 500);
        }
        utils_1.event
            .on('ctg:canReplay', cb);
        return function () {
            utils_1.event
                .off('ctg:canReplay', cb);
            clearInterval(timeoutId.current);
        };
    }, []);
    react_1.useEffect(function () {
    }, [replayKey, data]);
    react_1.useEffect(function () {
        setReplayKey(0);
        stopPlay();
    }, [data]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(button_group_1.default, { size: "small", style: { position: 'absolute', right: 0, bottom: 0, opacity: visible ? 1 : 0 }, className: className },
            data && Array(data.fetal_num).fill(0).map(function (_, i) {
                var isTarget = replayKey === i + 1;
                return react_1.default.createElement(antd_1.Button, { key: "b" + i, type: isTarget ? 'primary' : 'default', onClick: function () {
                        var k = isTarget ? 0 : (i + 1);
                        var id = k ? data.docid + "_" + replayKey : '';
                        setReplayKey(k);
                        var r = (ctg.current.drawSelect.selectingBarPoint / ctg.current.data.index) || 0;
                        var index = ctg.current.data.index * r;
                        id ? utils_1.event.emit('ctg:replay', id, index / 4) : stopPlay();
                    } },
                    "\u7B2C",
                    i + 1,
                    "\u80CE\u5FC3\u97F3\u56DE\u653E");
            }),
            btns.map(function (_, index) {
                var _set = new Set(activeList);
                var isExist = _set.has(index);
                return react_1.default.createElement(antd_1.Button, { type: isExist ? 'primary' : 'default', key: index, onClick: function () {
                        if (isExist) {
                            _set.delete(index);
                        }
                        else {
                            _set.add(index);
                        }
                        _.onClick();
                        setActiveList(_set);
                    } }, _.text);
            })),
        data && Array(data.fetal_num).fill(0).map(function (_, i) {
            return react_1.default.createElement("audio", { ref: audioRefMap["audio_ref" + (i + 1)], src: prefix + "/ctg-exams-audio/" + data.docid + "_" + (i + 1) });
        })));
};
//# sourceMappingURL=ButtonTools.js.map