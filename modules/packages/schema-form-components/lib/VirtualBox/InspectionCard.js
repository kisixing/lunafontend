'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('@uform/antd');
exports.default = antd_1.createVirtualBox('inspection_card', function(props) {
  return react_1.default.createElement(
    'div',
    {
      className: 'code-box-meta markdown',
      style: {
        position: 'relative',
        fontSize: '14px',
        lineHeight: '2',
        border: '1px solid #ccc',
        margin: '16px 0',
        borderRadius: '2px',
      },
    },
    react_1.default.createElement(
      'div',
      {
        className: 'code-box-title',
        style: {
          position: 'absolute',
          marginLeft: '16px',
          padding: '1px 8px',
          top: '-14px',
          background: '#fff',
        },
      },
      react_1.default.createElement('span', null, props.title)
    ),
    react_1.default.createElement(
      'div',
      { className: 'code-box-description', style: { padding: '18px 24px' } },
      props.children
    )
  );
});
