'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('antd');
exports.default = function(_a) {
  var children = _a.children,
    onClick = _a.onClick,
    interval = _a.interval,
    others = __rest(_a, ['children', 'onClick', 'interval']);
  var block = false;
  var _onClick = onClick;
  if (typeof interval === 'number' && interval > 0) {
    _onClick = function(e) {
      if (block) {
        return;
      }
      block = true;
      setTimeout(function() {
        block = false;
      }, interval);
      onClick && onClick(e);
    };
  }
  return react_1.default.createElement(
    antd_1.Button,
    __assign({ onClick: _onClick }, others),
    children
  );
};
//# sourceMappingURL=index.js.map
