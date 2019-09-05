'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
function ColorDot() {
  var colors = ['#ffadd2', '#ffbf00', '#9c27b0', '#f44336', '#2196f3', '#673ab7', '#ff9800'];
  var index = Math.floor(Math.random() * colors.length);
  var color = colors[index];
  return react_1.default.createElement('span', {
    style: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      margin: '0 10px 1px',
      borderRadius: '50%',
      backgroundColor: color,
    },
  });
}
exports.default = ColorDot;
