"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("@uform/antd");
var enumsCreator_1 = require("../utils/enumsCreator");
antd_1.registerFormField('edema', antd_1.connect({})(enumsCreator_1.selectCreator([
    { value: '0', label: '-' },
    { value: '1', label: '轻' },
    { value: '2', label: '中' },
    { value: '3', label: '重' },
])));
antd_1.registerFormField('icterus', antd_1.connect({})(enumsCreator_1.selectCreator([
    { value: '0', label: '无' },
    { value: '1', label: '轻' },
    { value: '2', label: '中' },
    { value: '3', label: '重' },
])));
antd_1.registerFormField('pregnancy_outcome', antd_1.connect({})(enumsCreator_1.selectCreator([{ value: '0', label: '顺产' }, { value: '1', label: '流产' }])));
