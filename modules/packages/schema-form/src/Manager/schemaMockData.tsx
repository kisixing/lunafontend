export const schemasData = [
  {
    type: 'object',
    'x-components': 'layout',
    id: '10188634107774297',
    properties: {
      UFORM_NO_NAME_BLOCK0: {
        'x-props': {
          title: '孕妇信息',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK0_LINE0: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 8, 8],
            },
            properties: {
              NO: {
                type: 'string',
                title: '产检编号',
              },
              birth: {
                type: 'date',
                title: '出生日期',
              },
            },
          },
          UFORM_NO_NAME_BLOCK0_LINE1: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 8, 8],
            },
            properties: {
              nationality: {
                type: 'string',
                title: '国籍',
              },
              nativeplace: {
                type: 'string',
                title: '籍贯',
              },
              ethnic: {
                type: 'string',
                title: '民族',
              },
            },
          },
          UFORM_NO_NAME_BLOCK0_LINE2: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 8, 8],
            },
            properties: {
              profession: {
                type: 'string',
                title: '职业',
              },
              unit: {
                type: 'string',
                title: '工作单位',
              },
            },
          },
          UFORM_NO_NAME_BLOCK0_LINE3: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 10],
            },
            properties: {
              phone: {
                type: 'string',
                title: '手机',
              },
              '[IDtype,IDnumber]': {
                'x-component': 'idPicker',
                title: '证件号码',
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK1: {
        'x-props': {
          title: '丈夫信息',
        },

        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK1_LINE0: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 8, 8],
            },
            properties: {
              hname: {
                type: 'string',
                title: '丈夫姓名',
              },
              hage: {
                type: 'number',
                title: '年龄',
                default: 0,
              },
              hethnic: {
                type: 'string',
                title: '民族',
              },
            },
          },
          UFORM_NO_NAME_BLOCK1_LINE1: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 8, 8],
            },
            properties: {
              hnationality: {
                type: 'string',
                title: '国籍',
              },
              hnativeplace: {
                type: 'string',
                title: '籍贯',
              },
              hphone: {
                type: 'string',
                title: '手机',
              },
            },
          },
          UFORM_NO_NAME_BLOCK1_LINE2: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 8, 8],
            },
            properties: {
              hprofession: {
                type: 'string',
                title: '职业',
              },
              hunit: {
                type: 'string',
                title: '工作单位',
              },
            },
          },
          UFORM_NO_NAME_BLOCK1_LINE3: {
            'x-component': 'grid',
            'x-props': {
              cols: [8, 10],
            },
            properties: {
              '[hIDtype,hIDnumber]': {
                'x-component': 'idPicker',
                title: '证件号码',
                default: [],
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK2: {
        'x-props': {
          title: '其他信息',
        },

        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK2_LINE0: {
            'x-component': 'grid',
            'x-props': {
              cols: [20],
            },
            properties: {
              permanentAddress: {
                type: 'string',
                title: '户口地址',
                required: true,
              },
            },
          },
          UFORM_NO_NAME_BLOCK2_LINE1: {
            'x-component': 'grid',
            'x-props': {
              cols: [20],
            },
            properties: {
              residentialAddress: {
                type: 'string',
                title: '居住地址',
              },
            },
          },
          UFORM_NO_NAME_BLOCK2_LINE2: {
            'x-component': 'grid',
            'x-props': {
              cols: [12, 12],
            },
            properties: {
              specialRecord: {
                type: 'string',
                title: '特殊记录',
              },
              drugAllergy: {
                type: 'string',
                title: '过敏药物',
              },
            },
          },
        },
      },

      UFORM_NO_NAME_BLOCK3: {
        'x-props': {
          title: '丈夫概况',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK3_LINE0: {
            type: 'grid',
            properties: {
              hbloodtype: {
                'x-component': 'bloodgroup_abo',
                title: '血型',
              },
              hRH: {
                'x-component': 'bloodgroup_rh',
                title: 'RH',
              },
            },
          },
          UFORM_NO_NAME_BLOCK3_LINE1: {
            type: 'grid',
            properties: {
              hPastHistory: {
                'x-component': 'DiseaseHistory',
                'x-props': {
                  datasource: [
                    '心脏病',
                    '肝炎',
                    '肾炎',
                    '风湿',
                    '高血压',
                    '癫痫',
                    '糖尿病',
                    '其他',
                  ],
                },
                default: [],
                type: 'string',
                title: '既往史',
              },
            },
          },
          UFORM_NO_NAME_BLOCK3_LINE2: {
            type: 'grid',
            properties: {
              '[hsmokeNote,halcohol]': {
                'x-component': 'smoking_and_drinking',
                title: '烟酒嗜好信息',
                default: [],
              },
            },
          },
          UFORM_NO_NAME_BLOCK3_LINE3: {
            type: 'grid',
            properties: {
              hillness: {
                title: '现有何病',
                type: 'string',
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK4: {
        'x-props': {
          title: '月经史',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK4_LINE0: {
            type: 'grid',
            properties: {
              menarcheAge: {
                type: 'string',
                enum: [
                  {
                    value: '0',
                    label: '16岁',
                  },
                  {
                    value: '1',
                    label: '17岁',
                  },
                ],
                title: '初潮（岁）',
              },
              period: {
                type: 'number',
                title: '周期（天）',
                default: 0,
              },
              continuousDays: {
                type: 'number',
                title: '持续天数',
                default: 0,
              },
            },
          },
          UFORM_NO_NAME_BLOCK4_LINE1: {
            type: 'grid',
            properties: {
              menstrual_volume: {
                'x-component': 'menstrual_volume',
                type: 'string',
                title: '月经量',
              },
              dysmenorrhea: {
                'x-component': 'dysmenorrhea',
                type: 'string',
                title: '经痛',
              },
            },
          },
          UFORM_NO_NAME_BLOCK4_LINE2: {
            type: 'grid',
            properties: {
              last_menstrual_period: {
                title: '末次月经',
                type: 'date',
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK5: {
        'x-props': {
          title: '本孕信息',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK5_LINE0: {
            type: 'grid',
            properties: {
              createDate: {
                type: 'date',
                title: '建档日期',
              },
              initGestation: {
                type: 'number',
                title: '建档孕周',
                default: 0,
              },
            },
          },
          UFORM_NO_NAME_BLOCK5_LINE1: {
            type: 'grid',
            properties: {
              expectedDate: {
                type: 'date',
                title: '预产期',
              },
              updateExpectedDate: {
                type: 'date',
                title: '修订预产期',
              },
            },
          },
          UFORM_NO_NAME_BLOCK5_LINE2: {
            type: 'grid',
            properties: {
              marriage: {
                type: 'number',
                title: '结婚几年',
                default: 1,
              },
              closeRelative: {
                'x-component': 'true_or_false',
                title: '是否近亲结婚',
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK6: {
        'x-props': {
          title: '过去史',
        },
        'x-component': 'inspection_card',
        properties: {
          diseases_history: {
            type: 'string',
            title: '疾病史',
          },
          allergic_history: {
            type: 'string',
            title: '过敏史',
          },
          surgery_history: {
            type: 'string',
            title: '手术史',
          },
          family_history: {
            type: 'string',
            title: '家族史',
          },
        },
      },
      UFORM_NO_NAME_BLOCK7: {
        'x-props': {
          title: '孕产史',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK7_LINE0: {
            type: 'grid',
            properties: {
              pregnancyNum: {
                type: 'number',
                title: '孕次',
                default: 0,
              },
              deliveryTimes: {
                type: 'number',
                title: '产次',
                default: 0,
              },
            },
          },
          UFORM_NO_NAME_BLOCK7_LINE1: {
            type: 'grid',

            properties: {
              pregnancyHistory: {
                'x-component': 'pregnancy_history',
                default: [],
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK8: {
        'x-props': {
          title: '早中孕超声',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK8_LINE0: {
            type: 'grid',

            properties: {
              ultrasonographyDate: {
                type: 'date',
                title: '检查日期',
              },
              ultras1onographyDate: {
                title: '停经',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: '周',
                },
              },
            },
          },
          UFORM_NO_NAME_BLOCK8_LINE1: {
            type: 'grid',

            properties: {
              CRL: {
                title: '头臀径(CRL) ',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: 'mm',
                },
              },
              BPD: {
                title: '双顶径(BPD)',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: 'mm',
                },
              },
              pregnancyWeeks: {
                title: '如孕',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: '周',
                },
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK9: {
        'x-props': {
          title: '一般症状',
        },
        'x-component': 'inspection_card',
        properties: {
          symptom: {
            'x-component': 'DiseaseHistory',
            'x-props': {
              datasource: ['心脏病', '肝炎', '肾炎', '风湿', '高血压', '癫痫', '糖尿病', '其他'],
            },
            default: [],
          },
          UFORM_NO_NAME_BLOCK9_LINE1: {
            type: 'grid',

            properties: {
              fetalMovement: {
                title: '胎动开始',
                'x-component': 'fetal_movement',
                'x-props': {
                  suffix: 'mm',
                },
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK10: {
        'x-props': {
          title: '发病情况',
        },
        'x-component': 'inspection_card',
        properties: {
          morbidity: {
            'x-component': 'DiseaseHistory',
            'x-props': {
              datasource: ['心脏病', '肝炎', '肾炎', '风湿', '高血压', '癫痫', '糖尿病', '其他'],
            },
            default: [],
          },
        },
      },
      UFORM_NO_NAME_BLOCK11: {
        'x-props': {
          title: '一般检查',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK11_LINE0: {
            type: 'grid',

            properties: {
              pregnancyWeight: {
                title: '孕前体重',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: 'kg',
                },
              },
              currentWeight: {
                title: '现体重',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: 'kg',
                },
              },
              height: {
                title: '身高',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: 'cm',
                },
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE1: {
            type: 'grid',
            properties: {
              bloodPressure: {
                title: '血压',
                'x-component': 'BP',
                default: [],
              },
              pulse: {
                title: '脉搏',
                'x-component': 'input_number_with_text',
                'x-props': {
                  suffix: '次/分',
                },
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE2: {
            type: 'grid',
            'x-props': {},
            properties: {
              edema: {
                title: '浮肿',
                'x-component': 'edema',
              },
              icterus: {
                title: '黄疸',
                'x-component': 'icterus',
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE3: {
            type: 'grid',
            properties: {
              thyroid: {
                title: '甲状腺',
                'x-component': 'Abnormal',
              },
              thorax: {
                title: '胸廓',
                'x-component': 'Abnormal',
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE4: {
            type: 'grid',
            properties: {
              breast: {
                title: '乳房',
                'x-component': 'Abnormal',
              },
              papilla: {
                title: '乳头',
                'x-component': 'Abnormal',
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE5: {
            type: 'grid',
            properties: {
              spine: {
                title: '脊柱',
                'x-component': 'Abnormal',
              },
              cardiac: {
                title: '心脏',
                'x-component': 'Abnormal',
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE6: {
            type: 'grid',
            properties: {
              lung: {
                title: '肺部',
                'x-component': 'Abnormal',
              },
              abdomen: {
                title: '腹部',
                'x-component': 'Abnormal',
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE7: {
            type: 'grid',
            properties: {
              hepatic: {
                title: '肝脏',
                'x-component': 'Abnormal',
              },
              spleen: {
                title: '脾脏',
                'x-component': 'Abnormal',
              },
            },
          },
          UFORM_NO_NAME_BLOCK11_LINE8: {
            type: 'grid',
            properties: {
              skinAndMucosa: {
                title: '皮肤粘膜',
                'x-component': 'Abnormal',
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK12: {
        'x-props': {
          title: '腹部检查',
        },
        'x-component': 'inspection_card',
        properties: {
          UFORM_NO_NAME_BLOCK12_LINE0: {
            type: 'grid',
            properties: {
              fundusHigh: {
                'x-component': 'input_number_with_text',
                title: '宫高',
                'x-props': {
                  suffix: 'cm',
                },
              },
              abdominalGirth: {
                'x-component': 'input_number_with_text',
                title: '腹围',
                'x-props': {
                  suffix: 'cm',
                },
              },
              fetalHeart: {
                'x-component': 'input_number_with_text',
                title: '胎心',
                'x-props': {
                  suffix: '次/分',
                },
              },
            },
          },
          UFORM_NO_NAME_BLOCK12_LINE1: {
            type: 'grid',
            'x-props': {
              cols: [10, 14],
            },
            properties: {
              presentation: {
                'x-component': 'presentation',
                title: '先露',
              },
              abdominalGirth: {
                title: '胎位',
                type: 'string',
              },
            },
          },
          UFORM_NO_NAME_BLOCK12_LINE2: {
            type: 'grid',
            'x-props': {
              cols: [10, 14],
            },
            properties: {
              join: {
                'x-component': 'join',
                title: '衔接',
              },
              yinInspection: {
                'x-component': 'Abnormal',
                title: '阴检',
              },
            },
          },
        },
      },
      UFORM_NO_NAME_BLOCK13: {
        'x-props': {
          title: '其他医院检验检查结果',
        },
        'x-component': 'inspection_card',
        properties: {
          others: {
            type: 'string',
            'x-component': 'textarea',
            title: '结果记录',
          },
        },
      },
    },
  },
  {
    type: 'object',
    'x-component': 'inspection_card',
    'x-props': { title: '高危管理' },
    id: '10188634107774597',
    properties: {
      UFORM_NO_NAME_BLOCK0_LINE0: {
        type: 'grid',
        properties: {
          riskAssessment: {
            type: 'object',
            'x-component': 'risk_assessment',
          },
        },
      },
    },
  },
];
export const values = [
  {
    NO: '222x',
    birth: '2019-09-12',
    nationality: '中国',
    nativeplace: '广东',
    ethnic: '汉',
    profession: '护士',
    unit: '中三三院',
    phone: '13048900019',
    IDtype: '1',
    IDnumber: '443921199908093764',
    hname: '丈夫姓名',
    hage: 28,
    hethnic: '丈夫民族',
    hnationality: '丈夫国籍',
    hnativeplace: '广东',
    hphone: '124',
    hprofession: '无',
    hunit: '无',
    hIDtype: '1',
    hIDnumber: '54987326',
    permanentAddress: '',
    residentialAddress: '',
    specialRecord: '',
    drugAllergy: '',
    hbloodtype: '0',
    hRH: '0',
    hPastHistory: ['心脏病'],
    hsmokeNote: 2,
    halcohol: 500,
    hillness: '无',
    menarcheAge: '0',
    period: 0,
    continuousDays: 0,
    menstrual_volume: '',
    dysmenorrhea: '',
    last_menstrual_period: '2018-05-06',
    createDate: '2018-05-06',
    initGestation: 0,
    expectedDate: '2018-05-06',
    updateExpectedDate: '2018-05-06',
    marriage: 1,
    closeRelative: '',
    diseases_history: '',
    allergic_history: '',
    surgery_history: '',
    family_history: '',
    pregnancyNum: 1,
    deliveryTimes: 0,
    pregnancyHistory: [
      {
        日期: '2019-9-11',
        自然: false,
        人工: false,
        药流: true,
        葡萄胎: false,
        异位妊娠: false,
        引产: false,
        死胎: false,
        早产: true,
        死产: false,
        足月产: false,
        顺产: false,
        剖宫产: false,
      },
    ],
    ultrasonographyDate: '2018-05-06',
    menopauseWeeks: '',
    CRL: 0,
    BPD: 0,
    pregnancyWeeks: 0,
    symptom: [],
    fetalMovement: '0',
    morbidity: [],
    pregnancyWeight: 11,
    currentWeight: 22,
    height: 33,
    bloodPressure: [120, 90],
    pulse: 24,
    edema: '2',
    icterus: '',
    thyroid: '',
    thorax: '',
    breast: '',
    papilla: '',
    spine: '',
    cardiac: '',
    lung: '',
    abdomen: '',
    hepatic: '',
    spleen: '',
    skinAndMucosa: '',
    fundusHigh: 11,
    abdominalGirth: null,
    fetalHeart: 33,
    presentation: '',
    fetalPosition: '',
    join: '',
    yinInspection: '',
    objectRecord: '',
    others: '我',
    ultras1onographyDate: 11,
  },

  {
    riskAssessment: {
      level: '5',
      risks: [{ cured: true, fator: '', key: '1', remark: '111', factor: '222' }],
      infectiousDisease: { HIV: true, HIVNote: '我问问' },
    },
  },
];
