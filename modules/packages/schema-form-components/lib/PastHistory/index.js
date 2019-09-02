"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@uform/react");
var react_2 = __importDefault(require("react"));
var antd_1 = require("antd");
react_1.registerFormField('DiseaseHistory', react_1.connect()(function (_a) {
    var value = _a.value, onChange = _a.onChange, datasource = _a.datasource;
    return (react_2.default.createElement("div", null,
        react_2.default.createElement(antd_1.Checkbox.Group, { value: value, style: { width: '100%' }, onChange: onChange },
            react_2.default.createElement(antd_1.Row, null, datasource.map(function (d, index) {
                return (react_2.default.createElement(antd_1.Col, { span: 8, key: index + Math.random().toString() },
                    react_2.default.createElement(antd_1.Row, { gutter: 5, style: { marginBottom: '4px', lineHeight: '32px' } },
                        react_2.default.createElement(antd_1.Col, { span: 10 },
                            react_2.default.createElement(antd_1.Checkbox, { value: d, key: d }, d)),
                        value.includes(d) && (react_2.default.createElement(antd_1.Col, { span: 10 },
                            react_2.default.createElement(antd_1.Input, null))))));
            })))));
}));
