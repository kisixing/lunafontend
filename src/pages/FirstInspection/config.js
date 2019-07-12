import moment from 'moment';

export default {
  formname: 'first-check',
  dec: '首检信息',
  data: {
    dec: '高危管理',
    data: [
      {
        id: '001111111198711',
        span: 17,
        labelProps: {
          label: '高危因素',
          name: 'highrisk',
        },
        inputProps: {
          type: 'select',
          placeholder: "输入高危因素",
          disabled: false,
          style: { maxWidth: '378px' },
          options: []
        }
      },
      {
        id: '001111323123',
        span: 8,
        labelProps: {
          label: '高危等级',
          name: 'risklevel',
        },
        inputProps: {
          value: 'Ⅲ',
          type: 'select',
          placeholder: "输入高危等级",
          disabled: false,
          options: [
            { label: 'Ⅰ', value: 'Ⅰ' },
            { label: 'Ⅱ', value: 'Ⅱ' },
            { label: 'Ⅲ', value: 'Ⅲ' },
            { label: 'Ⅳ', value: 'Ⅳ' },
            { label: 'Ⅴ', value: 'Ⅴ' },
          ]
        }
      }
    ]
  },
  history: {
    dec: '月经史',
    data: [
      {
        id: '001121101323123',
        span: 8,
        labelProps: {
          label: '孕次',
          name: 'yunc',
        },
        inputProps: {
          value: '2',
          type: 'select',
          placeholder: "输入孕次",
          disabled: false,
          options: [
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
          ]
        }
      },
      {
        id: '00112111352300123',
        span: 8,
        labelProps: {
          label: '产次',
          name: 'chanc',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'select',
          placeholder: "输入产次",
          disabled: false,
          options: [
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
          ]
        }
      },
      {
        id: '00112114132300123',
        span: 8,
        labelProps: {
          label: '阴道分娩次数',
          name: 'yindcj',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'select',
          placeholder: "输入阴道分娩次数",
          disabled: false,
          options: [
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
          ]
        }
      },
      {
        id: '00112111323001231',
        span: 8,
        labelProps: {
          label: '剖宫产次数',
          name: 'pougcj',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'select',
          placeholder: "输入剖宫产次数",
          disabled: false,
          options: [
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
          ]
        }
      },
      {
        id: '0011212311323001231',
        span: 8,
        labelProps: {
          label: '初潮(岁)',
          name: 'yjcuch',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'select',
          placeholder: "输入初潮日期",
          disabled: false,
          options: [
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: '13', value: '13' },
            { label: '14', value: '14' },
            { label: '15', value: '15' },
            { label: '16', value: '16' },
          ]
        }
      },
      {
        id: '001121231132300321231',
        span: 8,
        labelProps: {
          label: '月经周期(天)',
          name: 'yjzhouq',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入月经周期",
          disabled: false,
        }
      },
      {
        id: '001121231321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '005233',
        span: 8,
        labelProps: {
          label: '经量',
          name: 'yjjingl',
        },
        inputProps: {
          options: [
            { label: '多', value: '多' },
            { label: '中', value: '中' },
            { label: '少', value: '少' },
          ],
          value: '少',
          disabled: false,
          type: 'radio',
        }
      },
      {
        id: '005234',
        span: 8,
        labelProps: {
          label: '痛经',
          name: 'yjtongj',
        },
        inputProps: {
          options: [
            { label: '偶尔', value: '偶尔' },
            { label: '经常', value: '经常' },
            { label: '无', value: '无' },
          ],
          // value: '少',
          disabled: false,
          type: 'radio',
        }
      },
      {
        id: '0011212096431321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '0011212315632321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121231388821231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121231300021231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '00112123981321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '00112123132123198',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '0011212313212318765',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121231321231888',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '0011212313212313478',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121231321655231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '76564545456',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '8988989898',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '00112123138921231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121235671321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '00112123232231321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001144321231321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121266531321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121255631321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '0011322321231321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '001121231312121231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '00112123136521231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '00112123451321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '00112123133221231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
      {
        id: '0011221231321231',
        span: 8,
        labelProps: {
          label: '持续天数',
          name: 'yjchix',
        },
        inputProps: {
          // value: 'Ⅲ',
          type: 'input',
          inputType: 'number',
          placeholder: "输入持续天数",
          disabled: false,
        },
        rules: [{
          required: 'true',
        }],
      },
    ]
  }
}