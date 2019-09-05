'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var data = [
  {
    level: '0',
    risks: [
      {
        key: '20101',
        cured: false,
        fator: '',
        remark: '',
      },
    ],
    infectiousDisease: {
      HIV: true,
      HIVNote: '啊啊',
    },
  },
  function(value) {
    console.log('default value', value);
  },
];
var context = react_1.default.createContext(data);
exports.default = context;
