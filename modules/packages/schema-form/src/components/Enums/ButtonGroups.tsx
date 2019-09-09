import { registerFormField, connect } from '@uform/antd';
import { buttonGroupCreator } from '../utils/enumsCreator';
registerFormField(
  'bloodgroup_abo',
  connect({})(
    buttonGroupCreator([
      { value: '0', label: 'A型' },
      { value: '1', label: 'B型' },
      { value: '2', label: 'O型' },
      { value: '3', label: 'AB型' },
    ])
  )
);

registerFormField(
  'bloodgroup_rh',
  connect({})(buttonGroupCreator([{ value: '0', label: '阴性' }, { value: '1', label: '阳性' }]))
);

registerFormField(
  'menstrual_volume',
  connect({})(
    buttonGroupCreator([
      { value: '0', label: '少' },
      { value: '1', label: '中' },
      { value: '2', label: '多' },
    ])
  )
);
registerFormField(
  'dysmenorrhea',
  connect({})(
    buttonGroupCreator([
      { value: '0', label: '无' },
      { value: '1', label: '偶尔' },
      { value: '2', label: '经常' },
    ])
  )
);

registerFormField(
  'true_or_false',
  connect({})(buttonGroupCreator([{ value: '0', label: '否' }, { value: '1', label: '是' }]))
);

registerFormField(
  'fetal_movement',
  connect({})(
    buttonGroupCreator([
      { value: '0', label: '无' },
      { value: '1', label: '三个月' },
      { value: '2', label: '四个月' },
      { value: '3', label: '五个月' },
    ])
  )
);
//先露
registerFormField(
  'presentation',
  connect({})(
    buttonGroupCreator(
      [
        { value: '0', label: '/' },
        { value: '1', label: '头' },
        { value: '2', label: '臀' },
        { value: '3', label: '足' },
        { value: '4', label: '复合' },
        { value: '5', label: '其他' },
      ],
      'small'
    )
  )
);
//衔接
registerFormField(
  'join',
  connect({})(
    buttonGroupCreator(
      [
        { value: '0', label: '/' },
        { value: '1', label: '浮' },
        { value: '2', label: '浅入' },
        { value: '3', label: '半入' },
        { value: '4', label: '全入' },
      ],
      'small'
    )
  )
);
//哺乳方式
registerFormField(
  'nursing_way',
  connect({})(buttonGroupCreator([{ value: '0', label: '母乳' }, { value: '1', label: '奶粉' }]))
);
