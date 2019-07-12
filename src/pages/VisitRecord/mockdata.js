import moment from 'moment';

export default {
  "filter": {
    "enable": true,
    "items": [
      {
        id: 0,
        span: 8,
        labelProps: {
          name: 'outpatientNO',
          label: '门诊号',
        },
        inputProps: {
          value: '',
          placeholder: '请输入门诊号',
          type: 'input',
          disabled: true,
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 1,
        span: 8,
        labelProps: {
          name: 'inpatientNO',
          label: '住院号',
        },
        inputProps: {
          value: '',
          placeholder: '请输入住院号',
          type: 'input',
        },
        rules: [{
          required: true,
        }],
      },
      {
        id: 2,
        span: 8,
        labelProps: {
          name: 'checkupNO',
          label: '产检编号',
        },
        inputProps: {
          value: '',
          placeholder: '请输入产检编号',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 3,
        span: 8,
        labelProps: {
          name: 'insuranceType',
          label: '医保类型',
        },
        inputProps: {
          value: '',
          placeholder: '请输入医保类型',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 4,
        span: 8,
        labelProps: {
          name: 'name',
          label: '孕妇姓名',
        },
        inputProps: {
          value: '',
          placeholder: '请输入孕妇姓名',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 6556,
        span: 8,
        labelProps: {
          name: 'name111',
          label: '孕妇姓名',
        },
        inputProps: {
          value: '',
          placeholder: '请输入孕妇姓名',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
    ],
    "buttons": [],
  },
  "columns": [
    {
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
        type: 'date',
        required: false,
        format: 'YYYY-MM-DD'
      }
    }, {
      title: '孕周',
      dataIndex: 'ckweek',
      key: "ckweek",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
        options: [
          { label: '多', value: '多' },
          { label: '中', value: '中' },
          { label: '少', value: '少' },
        ],
      }
    }, {
      title: '体重 (kg)',
      dataIndex: 'cktizh',
      key: "cktizh",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
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
    }, {
      title: '脉搏',
      dataIndex: 'ckmaibo',
      key: "ckmaibo",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '宫高(cm)',
      dataIndex: 'ckgongg',
      key: "ckgongg",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '腹围(cm)',
      dataIndex: 'ckfuw',
      key: "ckfuw",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '胎心',
      dataIndex: 'cktaix',
      key: "cktaix",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '胎动',
      dataIndex: 'ckmove',
      key: "ckmove",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '胎位',
      dataIndex: 'cktaiw',
      key: "cktaiw",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '先露',
      dataIndex: 'ckxianl',
      key: "ckxianl",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '衔接',
      dataIndex: 'ckxianj',
      key: "ckxianj",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '浮肿',
      dataIndex: 'ckfuzh',
      key: "ckfuzh",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '尿蛋白',
      dataIndex: 'ckniaodb',
      key: "ckniaodb",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '自觉症状',
      dataIndex: 'ckzijzhz',
      key: "ckzijzhz",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '诊断',
      dataIndex: 'ckdia',
      key: "ckdia",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '医嘱',
      dataIndex: 'ckresult',
      key: "ckresult",
      width: 200,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '医师签名',
      dataIndex: 'sign',
      key: "sign",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }, {
      title: '打印状态',
      dataIndex: 'cksheng',
      key: "cksheng",
      width: 100,
      align: 'center',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    }
  ],
  "dataSource": {
    "default": '',
    "query": '',
    "delete": '',
    "export": ''
  },
  "page": {
    "enable": true,
    "pageSize": "10",
  },
  "operation": [{
    "type": "操作类型包括：打开弹出窗如随访窗口，短信通知，报告审阅，详情，上报额外信息等类型；默认传参查询事件；编辑事件；保存（修改某状态）、删除"
  }]
}

export const dataSource = [{
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '45454513451',
  checkdate: moment('2015-04-12'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '4545323245151',
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '45454566765151',
  checkdate: moment('2015-03-10'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '45454112222125151',
  checkdate: moment('2015-02-10'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '4545451519898998',
  checkdate: moment('2015-05-10'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '454545152232319898998',
  checkdate: moment('2015-06-10'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '4545451519899698998',
  checkdate: moment('2015-06-12'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '555678',
  checkdate: moment('2015-06-16'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}, {
  key: '454545151989899996328',
  checkdate: moment('2015-06-29'),
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
  ckniaodb: '',
  ckzijzhz: '',
  ckdia: '',
  ckresult: '',
  sign: '',
  cksheng: ''
}];
