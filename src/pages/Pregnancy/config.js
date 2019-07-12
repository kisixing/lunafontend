import moment from 'moment';

export default {
  formname: 'Pregnancy',
  dec: '孕产基本信息',
  data: {
    dec: '孕妇信息',
    data: [
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
        id: 5,
        span: 8,
        labelProps: {
          name: 'age',
          label: '孕妇年龄',
        },
        inputProps: {
          value: '',
          placeholder: '请输入孕妇年龄',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 6,
        span: 8,
        labelProps: {
          name: 'gender',
          label: '性别',
        },
        inputProps: {
          value: '',
          placeholder: '请输入性别',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 7,
        span: 8,
        labelProps: {
          name: 'dob',
          label: '出生日期',
        },
        inputProps: {
          value: '',
          placeholder: '请输入出生日期',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 8,
        span: 8,
        labelProps: {
          name: 'idType',
          label: '证件类型',
        },
        inputProps: {
          value: '',
          placeholder: '请输入证件类型',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 9,
        span: 8,
        labelProps: {
          name: 'idNO',
          label: '证件号码',
        },
        inputProps: {
          value: '',
          placeholder: '请输入证件号码',
          type: 'input',
        },
        rules: [{
          required: false,
          message: '请输入有效的身份证号码',
          len: 18,

        }],
      },
      {
        id: 10,
        span: 8,
        labelProps: {
          name: 'nationality',
          label: '国籍',
        },
        inputProps: {
          value: '',
          placeholder: '请输入国籍',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 11,
        span: 8,
        labelProps: {
          name: 'nativeplace',
          label: '籍贯',
        },
        inputProps: {
          value: '',
          placeholder: '请输入籍贯',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 12,
        span: 8,
        labelProps: {
          name: 'ethnic',
          label: '民族',
        },
        inputProps: {
          value: '',
          placeholder: '请输入民族',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 13,
        span: 8,
        labelProps: {
          name: 'telephone',
          label: '联系电话',
        },
        inputProps: {
          value: '',
          placeholder: '请输入联系电话',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 14,
        span: 8,
        labelProps: {
          name: 'maritalStatus',
          label: '婚姻状况',
        },
        inputProps: {
          value: '',
          placeholder: '请输入婚姻状况',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 15,
        span: 8,
        labelProps: {
          name: 'nearRelation',
          label: '近亲结婚',
        },
        inputProps: {
          value: '',
          placeholder: '请输入近亲结婚',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 16,
        span: 8,
        labelProps: {
          name: 'maritalYears',
          label: '结婚年数',
        },
        inputProps: {
          value: '',
          placeholder: '请输入结婚年数',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 17,
        span: 8,
        labelProps: {
          name: 'education',
          label: '学历-教育情况',
        },
        inputProps: {
          value: '',
          placeholder: '请输入学历-教育情况',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 18,
        span: 8,
        labelProps: {
          name: 'occupation',
          label: '职业',
        },
        inputProps: {
          value: '',
          placeholder: '请输入职业',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 19,
        span: 8,
        labelProps: {
          name: 'workplace',
          label: '工作地-如公司名',
        },
        inputProps: {
          value: '',
          placeholder: '请输入工作地-如公司名',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 20,
        span: 8,
        labelProps: {
          name: 'workPhone',
          label: '工作电话',
        },
        inputProps: {
          value: '',
          placeholder: '请输入工作电话',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 21,
        span: 8,
        labelProps: {
          name: 'occupationDetail',
          label: '职业备注详情',
        },
        inputProps: {
          value: '',
          placeholder: '请输入职业备注详情',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 22,
        span: 8,
        labelProps: {
          name: 'familyIncome',
          label: '家庭收入',
        },
        inputProps: {
          value: '',
          placeholder: '请输入家庭收入',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 23,
        span: 8,
        labelProps: {
          name: 'residenceAddress',
          label: '居住地',
        },
        inputProps: {
          value: '',
          placeholder: '请输入居住地',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 24,
        span: 8,
        labelProps: {
          name: 'postpartumAddress',
          label: '产修地地',
        },
        inputProps: {
          value: '',
          placeholder: '请输入产修地地',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 25,
        span: 8,
        labelProps: {
          name: 'partnerName',
          label: '配偶姓名',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶姓名',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 26,
        span: 8,
        labelProps: {
          name: 'partnerGender',
          label: '配偶性别',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶性别',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 27,
        span: 8,
        labelProps: {
          name: 'partnerDob',
          label: '配偶出生日期',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶出生日期',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 28,
        span: 8,
        labelProps: {
          name: 'partnerIdType',
          label: '配偶证件类型',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶证件类型',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 29,
        span: 8,
        labelProps: {
          name: 'partnerIdNO',
          label: '配偶证件号码',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶证件号码',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 30,
        span: 8,
        labelProps: {
          name: 'partnerNationality',
          label: '配偶国籍',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶国籍',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 31,
        span: 8,
        labelProps: {
          name: 'partnerNativeplace',
          label: '配偶籍贯',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶籍贯',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 32,
        span: 8,
        labelProps: {
          name: 'partnerEthnic',
          label: '配偶民族',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶民族',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 33,
        span: 8,
        labelProps: {
          name: 'partnerTelephone',
          label: '配偶手机号码',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶手机号码',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 34,
        span: 8,
        labelProps: {
          name: 'partnerOccupation',
          label: '配偶职业',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶职业',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 35,
        span: 8,
        labelProps: {
          name: 'partnerWorkplace',
          label: '配偶工作地点',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶工作地点',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 36,
        span: 8,
        labelProps: {
          name: 'partnerOccupationDetail',
          label: '配偶职业详情',
        },
        inputProps: {
          value: '',
          placeholder: '请输入配偶职业详情',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 37,
        span: 8,
        labelProps: {
          name: 'lmp',
          label: '末次月经 | Last menstrual period',
        },
        inputProps: {
          value: '',
          placeholder: '请输入末次月经 | Last menstrual period',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 38,
        span: 8,
        labelProps: {
          name: 'edd',
          label: '预产期 | estimated date of deliving',
        },
        inputProps: {
          value: '',
          placeholder: '请输入预产期 | estimated date of deliving',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 39,
        span: 8,
        labelProps: {
          name: 'sureEdd',
          label: '修订预产期',
        },
        inputProps: {
          value: '',
          placeholder: '请输入修订预产期',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 40,
        span: 8,
        labelProps: {
          name: 'gravidity',
          label: '孕次',
        },
        inputProps: {
          value: '',
          placeholder: '请输入孕次',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 41,
        span: 8,
        labelProps: {
          name: 'parity',
          label: '产次',
        },
        inputProps: {
          value: '',
          placeholder: '请输入产次',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 42,
        span: 8,
        labelProps: {
          name: 'gestationalWeek',
          label: '孕周',
        },
        inputProps: {
          value: '',
          placeholder: '请输入 孕周',
          type: 'inputNumber',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 43,
        span: 8,
        labelProps: {
          name: 'createDate',
          label: '创建时间',
        },
        inputProps: {
          value: '',
          placeholder: '请输入创建时间',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 44,
        span: 8,
        labelProps: {
          name: 'modifyDate',
          label: '修改时间',
        },
        inputProps: {
          value: '',
          placeholder: '请输入修改时间',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 45,
        span: 8,
        labelProps: {
          name: 'validateDate',
          label: '确认时间',
        },
        inputProps: {
          value: '',
          placeholder: '请输入确认时间',
          type: 'date',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 46,
        span: 8,
        labelProps: {
          name: 'note',
          label: '特殊说明',
        },
        inputProps: {
          value: '',
          placeholder: '请输入特殊说明',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 47,
        span: 8,
        labelProps: {
          name: 'recordsrc',
          label: '建册方式(自助建档，第三方同步，医院建档)',
        },
        inputProps: {
          value: '',
          placeholder: '请输入建册方式(自助建档，第三方同步，医院建档)',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 48,
        span: 8,
        labelProps: {
          name: 'recordstate',
          label: '档案状态',
        },
        inputProps: {
          value: '',
          placeholder: '请输入档案状态',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
    ]
  },
  personalProfile: {
    dec: '个人信息',
    data: [
      {
        id: 0,
        span: 8,
        labelProps: {
          name: 'smoke',
          label: '烟',
        },
        inputProps: {
          value: '',
          placeholder: '请输入烟',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 1,
        span: 8,
        labelProps: {
          name: 'smokeNote',
          label: '烟量',
        },
        inputProps: {
          value: '',
          placeholder: '请输入烟量',
          type: 'inputNumber',
          // 前缀
          prefix: '',
          // 后缀
          suffix: '支/天'
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 2,
        span: 8,
        labelProps: {
          name: 'alcohol',
          label: '酒',
        },
        inputProps: {
          value: '',
          placeholder: '请输入酒',
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
          name: 'alcoholNote',
          label: '酒量',
        },
        inputProps: {
          value: '',
          placeholder: '请输入酒量',
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
          name: 'aBORH',
          label: '血型',
        },
        inputProps: {
          value: '',
          placeholder: '请输入血型',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 5,
        span: 8,
        labelProps: {
          name: 'rH',
          label: 'ABORH',
        },
        inputProps: {
          value: '',
          placeholder: '请输 入ABORH',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 6,
        span: 8,
        labelProps: {
          name: 'radioactivity',
          label: '接触放射性',
        },
        inputProps: {
          value: '',
          placeholder: '请输入接触放射性',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 7,
        span: 8,
        labelProps: {
          name: 'radioactivityNote',
          label: '日期-名称等',
        },
        inputProps: {
          value: '',
          placeholder: '请输入日期-名称等',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 8,
        span: 8,
        labelProps: {
          name: 'medicine',
          label: '药物',
        },
        inputProps: {
          value: '',
          placeholder: '请输入药物',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 9,
        span: 8,
        labelProps: {
          name: 'medicineNote',
          label: '药物',
        },
        inputProps: {
          value: '',
          placeholder: '请输入药物',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
    ],
  },
  partnerProfile: {
    dec: '丈夫信息',
    data: [
      {
        id: 0,
        span: 8,
        labelProps: {
          name: 'smoke',
          label: '烟',
        },
        inputProps: {
          value: '',
          placeholder: '请输入烟',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 1,
        span: 8,
        labelProps: {
          name: 'smokeNote',
          label: '烟量',
        },
        inputProps: {
          value: '',
          placeholder: '请输入烟量',
          type: 'inputNumber',
          prefix: '',
          suffix: '支/天'
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 2,
        span: 8,
        labelProps: {
          name: 'alcohol',
          label: '酒',
        },
        inputProps: {
          value: '',
          placeholder: '请输入酒',
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
          name: 'alcoholNote',
          label: '血型',
        },
        inputProps: {
          value: '',
          placeholder: '请输入血型',
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
          name: 'disease',
          label: '疾病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入疾病',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
    ],
  },
  diseaseHistory: {
    dec: '疾病史',
    data: [
      {
        id: 0,
        span: 8,
        labelProps: {
          name: 'hypertension',
          label: '高血压',
        },
        inputProps: {
          value: '',
          placeholder: '请输入高血压',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 1,
        span: 8,
        labelProps: {
          name: 'hypertensionNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 2,
        span: 8,
        labelProps: {
          name: 'nephropathy',
          label: '肾病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入肾病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 3,
        span: 8,
        labelProps: {
          name: 'nephropathyNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
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
          name: 'respiratoryDisease',
          label: '呼吸系统疾病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入呼吸系统疾病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 5,
        span: 8,
        labelProps: {
          name: 'respiratoryDiseaseNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 6,
        span: 8,
        labelProps: {
          name: 'gastroDisease',
          label: '胃病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入胃病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 7,
        span: 8,
        labelProps: {
          name: 'gastroDiseaseNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 8,
        span: 8,
        labelProps: {
          name: 'hepaticDisease',
          label: '肝病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入肝病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 9,
        span: 8,
        labelProps: {
          name: 'hepaticDiseaseNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 10,
        span: 8,
        labelProps: {
          name: 'epilepsy',
          label: '癫痫',
        },
        inputProps: {
          value: '',
          placeholder: '请输入癫痫',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 11,
        span: 8,
        labelProps: {
          name: 'epilepsyNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 12,
        span: 8,
        labelProps: {
          name: 'cardiacDisease',
          label: '心脏病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入心脏病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 13,
        span: 8,
        labelProps: {
          name: 'cardiacDiseaseNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 14,
        span: 8,
        labelProps: {
          name: 'endocrineDisease',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 15,
        span: 8,
        labelProps: {
          name: 'thyroidDisease',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 16,
        span: 8,
        labelProps: {
          name: 'hematopathy',
          label: '血液病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入血液病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 17,
        span: 8,
        labelProps: {
          name: 'hematopathyNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 18,
        span: 8,
        labelProps: {
          name: 'mentalDisease',
          label: '心理疾病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入心理疾病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 19,
        span: 8,
        labelProps: {
          name: 'mentalDiseaseNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 20,
        span: 8,
        labelProps: {
          name: 'diabetes',
          label: '糖尿病',
        },
        inputProps: {
          value: '',
          placeholder: '请输入糖尿病',
        },
        rules: [{
          required: false,
        }],
      },
      {
        id: 21,
        span: 8,
        labelProps: {
          name: 'diabetesNote',
        },
        inputProps: {
          value: '',
          placeholder: '请输入undefined',
          type: 'input',
        },
        rules: [{
          required: false,
        }],
      },
    ],
  },
};
