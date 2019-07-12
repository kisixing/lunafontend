# 重构项目关于`搜索统计列表`的配置

组件基本使用

```jsx
  import { CustomTable } from '@/components/Table';

  <CustomTable
    searchConfig={searchConfig}
    columns={columns}
    dataSource={data}
    handleSearch={this.handleSearch}
    handleReset={this.handleReset}
  />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchConfig | 检索form配置 | array | [] |
| columns | table表头配置 | array | [] |
| dataSource | table列表数据 | array | [] |
| handleSearch | 检索form的搜索事件 | function | - |
| handleReset | 检索form的重置事件| function(values) | - | 
| ... |  |  |  |

## 检索form部分

与纯表单页面的布局配置一致,即searchConfig。

```
   {
     status: 'OK/FALSE/...',
     dec: 'XXX描述',
     data: [{
       id: '',
       span: 8,
       labelProps: {
       name: '键值--IDno',
         label: '键名--门诊号',
       },
       inputProps: {
         placeholder: '请输入门诊号',
         type: 'input',
         disabled: true,
         ...
       },
       rules: [
         { required: false, message: '请输入门诊号!' },
         { type: 'email', message: 'The input is not valid E-mail!', },
         ...
       ]
     }, {
       ...
     }]
   }
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key/id | 唯一key值 | string |  |
| span | 栅格占位格数，暂时未col-8 | number |  |
| labelProps | antd-design Form.Item的属性，主要{ label, name }。见：[antd-design](https://ant.design/components/form-cn/#Form.Item) | object |  |
| inputProps | antd-design input,select等输入框全参 | object |  |
| rules | 校验规则 | array | 见：[antd-design](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) |

## table部分

此部分分为columns和dataSource两部分。

### columns 表头结构

除了继承[ant-design Form](https://ant.design/components/table-cn/#Column)的属性，还增加了输入框类型的属性.

基本结构大致如下：

```
  {
    status: 'OK/FALSE/...',
    dec: 'XXX描述',
    data: [{
      title: '日期',
        dataIndex: 'checkdate',
        key: "checkdate",
        width: 120,
        align: 'center',
        editable: true,
        sortDirections: ['descend', 'ascend'],
        defaultSortOrder: 'descend', // 默认排序规则
        sorter: (a, b) => {
          const replaceStr = (str) => str.split('-').join('');
          return replaceStr(a.checkdate) - replaceStr(b.checkdate);
        },
        inputProps: {
          type: 'date', // 输入框类型
          required: false,
          format: 'YYYY-MM-DD',
          ...
        },
        ...
    },
    {
      title: '血压',
      children: [{
        title: '收缩压',
        dataIndex: 'ckshrinkpressure',
        key: "ckshrinkpressure",
        width: 100,
        align: 'center',
        editable: true,
        inputProps: {
          type: 'input',
          required: false,
        }
      }, {
        title: '舒张压',
        dataIndex: 'ckdiastolicpressure',
        key: "ckdiastolicpressure",
        width: 100,
        align: 'center',
        editable: true,
        inputProps: {
          type: 'input',
          required: false,
        }
      }]
    },
    {
      ...
    }]
  }
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 | string |  |
| dataIndex | 列数据在数据项中对应的 key，支持 a.b.c、a[0].b.c[1] 的嵌套写法 | string |  |
| align | 对齐方式 | string |  |
| width | 列宽度 | string\|number |  |
| editable | 是否可编辑 | boole | false |
| sorter | 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true | Function\|boolean |  |
| inputProps | 编辑状态时，输入组件类型属性 | object |  |
| children | 分组 | array |  |
| ... |||
参考[antd-design table column](https://ant.design/components/table-cn/#Column)

inputProps主要参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 同title | string |  |
| name | 同dataIndex | string |  |
| value | 初始值，默认值 | string |  |
| type | 输入框类型(input, select, inputNumber, textArea, radio, switch...可参考：[MDN](https://ant.design/components/auto-complete-cn/)) | string |  |
| placeholder | 输入框提示 | string |  |
| disabled | 是否禁止输入 | boole | true |
| options | select、radio等选择类型输入组件选项 | array |  |
| multiple | 是否多选 | boole| false |
| rules | 校验规则 | array | 见：[MDN校验规则](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) |

### dataSource 数据结构

与[ant-design Table]()所需要的DataSource的数据结构要求是一样的。

基本结构如下：

```
  {
    status: 'OK/FALSE/...',
    createBy: 'XXX',
    createDate: Date(),
    dec: 'XXX描述',
    data: [{
      key: '454545151',
        checkdate: moment('2015-04-10'),
        ckweek: '17+2',
        cktizh: '50',
        ckshrinkpressure: '120',
        ckdiastolicpressure: '80',
        ckmaibo: '52',
        ckgongg: '12',
        ckfuw: '99',
        cktaix: '',
        ckmove: '',
        cktaiw: '',
        ckxianl: '',
        ckxianj: '',
        ckfuzh: '',
    }]
  }
```

## MBI孕期体重管理曲线

基本结构如下：

```
  {
    status: 'OK/FALSE/...',
    dec: 'XXX描述',
    data: [{
      week: "1",
      level: "实际体重",
      increment: 0.1
    }, {
      week: "2",
      level: "实际体重",
      increment: 0.15
    }, {
      ...
    }]
  }
```
