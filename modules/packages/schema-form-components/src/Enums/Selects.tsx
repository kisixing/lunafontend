import { registerFormField, connect } from '@uform/antd';
import { selectCreator } from '../utils/enumsCreator';
registerFormField(
  'edema',
  connect({})(
    selectCreator([
      { value: '0', label: '-' },
      { value: '1', label: '轻' },
      { value: '2', label: '中' },
      { value: '3', label: '重' },
    ])
  )
);
registerFormField(
  'icterus',
  connect({})(
    selectCreator([
      { value: '0', label: '无' },
      { value: '1', label: '轻' },
      { value: '2', label: '中' },
      { value: '3', label: '重' },
    ])
  )
);

//妊娠结局
registerFormField(
  'pregnancy_outcome',
  connect({})(selectCreator([{ value: '0', label: '顺产' }, { value: '1', label: '流产' }]))
);
