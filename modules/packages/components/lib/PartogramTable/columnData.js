"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        title: '检查时间',
        key: 'visitTime',
        type: 'date',
        width: '200px',
    },
    {
        title: '产程时间',
        key: 'duringTime',
        type: 'string',
    },
    {
        title: '宫口开张',
        key: 'cervix',
        type: 'number',
    },
    {
        title: '抬头下降',
        key: 'engagement',
        type: 'select',
        dataset: [
            { value: '+5', label: '+5' },
            { value: '+4', label: '+4' },
            { value: '+3', label: '+3' },
            { value: '+2', label: '+2' },
            { value: '+1', label: '+1' },
            { value: '0', label: '0' },
            { value: '-1', label: '-1' },
            { value: '-2', label: '-2' },
            { value: '-3', label: '-3' },
            { value: '-4', label: '-4' },
            { value: '-5', label: '-5' },
        ],
    },
    {
        title: '血压',
        key: 'bp',
        type: 'string',
    },
    {
        title: '宫缩',
        key: 'vagina',
        type: 'string',
    },
    {
        title: '羊水性状',
        key: 'adnexa',
        type: 'select',
        dataset: [
            { value: '0', label: '清' },
            { value: '1', label: '1度' },
            { value: '2', label: '2度' },
            { value: '3', label: '3度' },
        ],
    },
    {
        title: '事件',
        key: 'note',
        type: 'select',
        width: 200,
        dataset: [
            { value: '无', label: '无' },
            { value: '阴检', label: '阴检' },
            { value: '人工破膜', label: '人工破膜' },
            { value: '吸氧', label: '吸氧' },
            { value: '滴催', label: '滴催' },
            { value: '宫颈封闭', label: '宫颈封闭' },
            { value: '肛查', label: '肛查' },
            { value: '剖宫产', label: '剖宫产' },
        ],
    },
    {
        title: '记录人',
        key: 'doctor',
        type: 'string',
        disabled: true
    },
];
//# sourceMappingURL=columnData.js.map