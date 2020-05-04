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
exports.ButtonTools = function (props) {
    var ctg = props.ctg, visible = props.visible, className = props.className, data = props.data;
    var _a = react_1.useState(new Set()), activeList = _a[0], setActiveList = _a[1];
    var audio_ref1 = react_1.useRef();
    var audio_ref2 = react_1.useRef();
    var audio_ref3 = react_1.useRef();
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
    react_1.useEffect(function () {
        var target = audioRefMap["audio_ref" + replayKey];
        Object.entries(audioRefMap).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            return v.current && v.current.pause();
        });
        if (target) {
            var audio_1 = target.current;
            var r = ctg.current.drawSelect.selectingBarPoint / ctg.current.data.index;
            audio_1.currentTime = r * audio_1.duration;
            audio_1.ontimeupdate = function () {
                var play_r = audio_1.currentTime / audio_1.duration;
                var index = ctg.current.data.index * play_r;
                var dis = (index - ctg.current.leftViewposition) / 2;
                ctg.current.drawSelect.selectingBar.setLeft(dis);
            };
            audio_1.onended = function () { return setReplayKey(0); };
            audio_1.play();
        }
    }, [replayKey]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(button_group_1.default, { size: "small", style: { position: 'absolute', right: 0, bottom: 0, opacity: visible ? 1 : 0 }, className: className },
            data && Array(data.fetal_num).fill(0).map(function (_, i) {
                var isTarget = replayKey === i + 1;
                return react_1.default.createElement(antd_1.Button, { key: "b" + i, type: isTarget ? 'primary' : 'default', onClick: function () { return setReplayKey(isTarget ? 0 : (i + 1)); } },
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