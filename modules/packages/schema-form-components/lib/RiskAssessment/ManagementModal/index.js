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
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importStar(require('react'));
var antd_1 = require('antd');
var Tree_1 = __importDefault(require('./Tree'));
var context_1 = __importDefault(require('../context'));
var components_1 = require('@lianmed/components');
var Table_1 = __importDefault(require('./Table'));
var levelMap;
(function(levelMap) {
  levelMap[(levelMap['\u2160'] = 1)] = '\u2160';
  levelMap[(levelMap['\u2161'] = 2)] = '\u2161';
  levelMap[(levelMap['\u2162'] = 3)] = '\u2162';
  levelMap[(levelMap['\u2163'] = 4)] = '\u2163';
  levelMap[(levelMap['\u2164'] = 5)] = '\u2164';
  levelMap[(levelMap['\u2165'] = 6)] = '\u2165';
})((levelMap = exports.levelMap || (exports.levelMap = {})));
console.log('zzzzzzz', levelMap);
function ManagementModal(props) {
  var _a = react_1.useContext(context_1.default),
    value = _a[0],
    onChange = _a[1];
  var _b = react_1.useState(value),
    state = _b[0],
    setState = _b[1];
  var infectiousDisease = value.infectiousDisease;
  var visible = props.visible,
    onCancel = props.onCancel;
  return react_1.default.createElement(
    context_1.default.Provider,
    { value: [state, setState] },
    react_1.default.createElement(
      antd_1.Modal,
      {
        destroyOnClose: true,
        centered: true,
        title: '\u98CE\u9669\u7BA1\u7406',
        visible: visible,
        width: 1080,
        bodyStyle: { overflowY: 'scroll', maxHeight: '80vh' },
        footer: null,
        onCancel: function() {
          return onCancel(false);
        },
      },
      react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(
          antd_1.Form.Item,
          { label: '\u4F20\u67D3\u75C5', style: { display: 'flex' } },
          react_1.default.createElement(components_1.RemarkCheckbox, {
            dataset: {
              da: '乙肝大三阳',
              xiao: '乙肝小三阳',
              meidu: '梅毒',
              HIV: 'HIV',
              jiehe: '结核',
              feiyan: '重症感染性肺炎',
              other: '其他',
            },
            value: infectiousDisease,
            onChange: function(infectiousDisease) {
              return onChange(
                __assign(__assign({}, value), { infectiousDisease: infectiousDisease })
              );
            },
          })
        ),
        react_1.default.createElement(
          'div',
          { style: { display: 'flex' } },
          react_1.default.createElement(Table_1.default, null),
          react_1.default.createElement(
            'div',
            { style: { marginLeft: '24px', position: 'relative' } },
            react_1.default.createElement(
              antd_1.Form.Item,
              { label: '\u9AD8\u5371\u7B49\u7EA7', style: { display: 'flex' } },
              react_1.default.createElement(
                antd_1.Select,
                {
                  showSearch: true,
                  placeholder: '\u9009\u62E9...',
                  style: { width: '116px' },
                  optionFilterProp: 'children',
                  filterOption: function(input, option) {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  },
                },
                Object.keys(levelMap).map(function(k) {
                  if (typeof levelMap[k] === 'number') {
                    return null;
                  }
                  return react_1.default.createElement(
                    antd_1.Select.Option,
                    { key: k, value: k },
                    levelMap[k]
                  );
                })
              )
            ),
            react_1.default.createElement(
              'div',
              { style: { textAlign: 'center', position: 'absolute', width: '100%', bottom: '0' } },
              react_1.default.createElement(
                antd_1.Button,
                { style: { marginLeft: '12px', marginRight: '12px' } },
                '\u53D6\u6D88'
              ),
              react_1.default.createElement(
                antd_1.Button,
                { type: 'primary', style: { marginLeft: '12px', marginRight: '12px' } },
                '\u4FDD\u5B58'
              )
            )
          )
        )
      ),
      react_1.default.createElement(
        'div',
        { style: { flex: 1, overflowY: 'auto' } },
        react_1.default.createElement(
          'div',
          { style: { minHeight: '800px' } },
          react_1.default.createElement(Tree_1.default, null)
        )
      )
    )
  );
}
exports.default = ManagementModal;
