'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('@uform/antd');
var printer_1 = __importDefault(require('@uform/printer'));
require('antd/dist/antd.css');
exports.default = function(_a) {
  var schema = _a.schema,
    initialValues = _a.initialValues,
    _b = _a.saveActions,
    saveActions =
      _b === void 0
        ? function(actions) {
            return actions;
          }
        : _b;
  var actions = antd_1.createFormActions();
  return react_1.default.createElement(
    printer_1.default,
    null,
    react_1.default.createElement(
      antd_1.SchemaForm,
      {
        editable: false,
        labelAlign: 'left',
        schema: schema,
        initialValues: initialValues,
        onChange: function(a, b) {
          console.log(a, b);
        },
        onSubmit: function(v) {
          return console.log(v);
        },
        actions: actions,
        labelCol: { style: { width: '90px', float: 'left' } },
        wrapperCol: {
          xs: 10,
          sm: 10,
          md: 10,
          lg: 16,
        },
        effects: function($) {
          $('onFormInit').subscribe(function() {
            saveActions(actions);
          });
        },
      },
      react_1.default.createElement(
        antd_1.FormButtonGroup,
        { offset: 7 },
        react_1.default.createElement(antd_1.Submit, null),
        react_1.default.createElement(antd_1.Reset, null)
      )
    )
  );
};
