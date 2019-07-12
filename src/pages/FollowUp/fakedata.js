
export default {
  "filter": {
    "enable": true,
    "items": [
      {
        id: '001111323123',
        span: 5,
        labelProps: {
          label: '随访类型',
          name: 'type',
        },
        inputProps: {
          value: '全部分类',
          type: 'select',
          placeholder: "输入随访类型",
          disabled: false,
          options: [
            { label: '全部分类', value: '全部分类' },
            { label: 'PAC随访', value: 'PAC随访' },
            { label: '产后分娩随访', value: '产后分娩随访' },
            { label: '复诊率随访', value: '复诊率随访' },
            { label: '满意度随访', value: '满意度随访' },
            { label: '高血压随访', value: '高血压随访' },
            { label: '高血脂随访', value: '高血脂随访' },
            { label: '其他', value: '其他' },
          ]
        }
      },
      {
        id: '001121231321231',
        span: 5,
        labelProps: {
          label: '标题',
          name: 'title',
        },
        inputProps: {
          type: 'input',
          placeholder: "输入标题",
          disabled: false,
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '所属分类',
      dataIndex: 'type',
      key: 'type',
      editable: true,
      inputProps: {
        type: 'select',
        required: false,
        options: [
          { label: '全部分类', value: '全部分类' },
          { label: 'PAC随访', value: 'PAC随访' },
          { label: '产后分娩随访', value: '产后分娩随访' },
          { label: '复诊率随访', value: '复诊率随访' },
          { label: '满意度随访', value: '满意度随访' },
          { label: '高血压随访', value: '高血压随访' },
          { label: '高血脂随访', value: '高血脂随访' },
          { label: '其他', value: '其他' },
        ]
      }
    },
    {
      title: '创建日期',
      dataIndex: 'createdDate',
      key: 'createdDate',
      editable: true,
      inputProps: {
        type: 'date',
        required: false,
      }
    },
  ],
  "dataSource": {
    "default": '',
    "query": '',
    "delete": '',
    "export": ''
  },
  "page": {
    "enable": false,
    "pageSize": 10,
  },
  "operator": [{
    "type": "操作类型包括：打开弹出窗如随访窗口，短信通知，报告审阅，详情，上报额外信息等类型；默认传参查询事件；编辑事件；保存（修改某状态）、删除"
  }]
}

export const dataSource = [
  {
    key: '454545151',
    title: '妊娠期高血压随访',
    type: '高血压随访',
    createdDate: '2015-04-10',
  },
  {
    key: '45454235151',
    title: '妊娠期糖尿病随访问卷',
    type: '高血糖随访',
    createdDate: '2015-04-10',
  },
  {
    key: '45454545151',
    title: '满意度随访',
    type: '满意度随访',
    createdDate: '2015-04-10',
  },
  {
    key: '45124545151',
    title: '孕妇学校课程通知',
    type: '其他',
    createdDate: '2015-04-10',
  }
];
