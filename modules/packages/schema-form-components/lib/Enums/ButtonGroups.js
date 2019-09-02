"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("@uform/antd");
var enumsCreator_1 = require("../utils/enumsCreator");
antd_1.registerFormField('bloodgroup_abo', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([
    { value: '0', label: 'A型' },
    { value: '1', label: 'B型' },
    { value: '2', label: 'O型' },
    { value: '3', label: 'AB型' },
])));
antd_1.registerFormField('bloodgroup_rh', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([{ value: '0', label: '阴性' }, { value: '1', label: '阳性' }])));
antd_1.registerFormField('menstrual_volume', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([
    { value: '0', label: '少' },
    { value: '1', label: '中' },
    { value: '2', label: '多' },
])));
antd_1.registerFormField('dysmenorrhea', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([
    { value: '0', label: '无' },
    { value: '1', label: '偶尔' },
    { value: '2', label: '经常' },
])));
antd_1.registerFormField('true_or_false', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([{ value: '0', label: '否' }, { value: '1', label: '是' }])));
antd_1.registerFormField('fetal_movement', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([
    { value: '0', label: '无' },
    { value: '1', label: '三个月' },
    { value: '2', label: '四个月' },
    { value: '3', label: '五个月' },
])));
antd_1.registerFormField('presentation', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([
    { value: '0', label: '/' },
    { value: '1', label: '头' },
    { value: '2', label: '臀' },
    { value: '3', label: '足' },
    { value: '4', label: '复合' },
    { value: '5', label: '其他' },
], 'small')));
antd_1.registerFormField('join', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([
    { value: '0', label: '/' },
    { value: '1', label: '浮' },
    { value: '2', label: '浅入' },
    { value: '3', label: '半入' },
    { value: '4', label: '全入' },
], 'small')));
antd_1.registerFormField('nursing_way', antd_1.connect({})(enumsCreator_1.buttonGroupCreator([{ value: '0', label: '母乳' }, { value: '1', label: '奶粉' }])));
