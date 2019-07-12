import router from 'umi/router';

export default {
  "filter": {
    "enable": true,
    "items": [
      {
        id: '001121231321231',
        span: 5,
        labelProps: {
          label: '开始时间',
          name: 'startTime',
        },
        inputProps: {
          type: 'date',
          placeholder: "输入开始时间",
          disabled: false,
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: '00112122231321231',
        span: 5,
        labelProps: {
          label: '结束时间',
          name: 'endTime',
        },
        inputProps: {
          type: 'date',
          placeholder: "输入结束时间",
          disabled: false,
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: '001111323123',
        span: 5,
        labelProps: {
          label: '档案状态',
          name: 'status',
        },
        inputProps: {
          value: '全部',
          type: 'select',
          placeholder: "输入随访类型",
          disabled: false,
          options: [
            { label: '全部', value: '全部' },
            { label: '已确认', value: '已确认' },
            { label: '未确认', value: '未确认' },
          ]
        }
      },
    ],
    "buttons": ['delete', 'add', 'edit', 'save', 'export', 'refresh', 'print'],
  },
  "columns": [
    {
      title: '产检编号',
      dataIndex: 'chanjno',
      key: 'chanjno',
      editable: true,
      width: 120,
      render: text => <a href="javacript:;" onClick={() => router.push('/dashboard?a=b')}>{text}</a>, // 元素点击事件, 页面跳转
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '建档日期',
      dataIndex: 'usercuzh',
      key: 'usercuzh',
      editable: true,
      width: 120,
      render: text => <a href="javacript:;" onClick={() => showModal('edit')}>{text}</a>,
      inputProps: {
        type: 'date',
        format: 'YYYY-MM-DD',
        required: false,
      }
    },
    {
      title: '建档孕周',
      dataIndex: 'gesweek',
      key: 'gesweek',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '年龄',
      dataIndex: 'userage',
      key: 'userage',
      editable: true,
      width: 120,
      inputProps: {
        type: 'inputNumber',
        required: false,
      }
    },
    {
      title: '末次月经',
      dataIndex: 'gesmoc',
      key: 'gesmoc',
      editable: true,
      width: 120,
      inputProps: {
        type: 'date',
        format: 'YYYY-MM-DD',
        required: false,
      }
    },
    {
      title: '预产期',
      dataIndex: 'gesexpect',
      key: 'gesexpect',
      editable: true,
      width: 120,
      inputProps: {
        type: 'date',
        format: 'YYYY-MM-DD',
        required: false,
      }
    },
    {
      title: '身份证',
      dataIndex: 'useridno',
      key: 'useridno',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '户口地',
      dataIndex: 'userconstant',
      key: 'userconstant',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '常住地',
      dataIndex: 'useraddress',
      key: 'useraddress',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '本人联系方式',
      dataIndex: 'usermobile',
      key: 'usermobile',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '丈夫姓名',
      dataIndex: 'userhname',
      key: 'userhname',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '丈夫年龄',
      dataIndex: 'userhage',
      key: 'userhage',
      editable: true,
      width: 120,
      inputProps: {
        type: 'inputNumber',
        required: false,
      }
    },
    {
      title: '丈夫联系方式',
      dataIndex: 'userhmobile',
      key: 'userhmobile',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
        required: false,
      }
    },
    {
      title: '建档人',
      dataIndex: 'doctor',
      key: 'doctor',
      editable: true,
      width: 120,
      inputProps: {
        type: 'input',
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
    "enable": true,
    "pageSize": "10",
  },
  "operator": [{
    "type": "操作类型包括：打开弹出窗如随访窗口，短信通知，报告审阅，详情，上报额外信息等类型；默认传参查询事件；编辑事件；保存（修改某状态）、删除"
  }]
}

export const dataSource = [
  {
    chanjno: '20190306001',
    username: '妲己',
    usercuzh: '2015-04-10',
  },
  {
    chanjno: '20190306002',
    username: '赵飞燕',
    usercuzh: '2015-04-10',
  }
];
