import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Button } from 'antd';
import HighRiskTree from './Tree';
import context from '../context';
import { RemarkCheckbox } from '@lianmed/components';
import Table from './Table';
export enum levelMap {
  Ⅰ = 1,
  Ⅱ,
  Ⅲ,
  Ⅳ,
  Ⅴ,
  Ⅵ,
}

// export const levelMap: Array<any> = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ'].map((_, i) => ({
//   [i + 1]: _,
// }));
console.log('zzzzzzz', levelMap);
function ManagementModal(props) {
  const [value, onChange] = useContext(context);
  const [state, setState] = useState(value);
  const { infectiousDisease } = value;

  const { visible, onCancel } = props;
  return (
    <context.Provider value={[state, setState]}>
      <Modal
        destroyOnClose
        centered
        title="风险管理"
        visible={visible}
        width={1080}
        bodyStyle={{ overflowY: 'scroll', maxHeight: '80vh' }}
        footer={null}
        onCancel={() => onCancel(false)}
      >
        <div>
          <Form.Item label="传染病" style={{ display: 'flex' }}>
            <RemarkCheckbox
              dataset={{
                da: '乙肝大三阳',
                xiao: '乙肝小三阳',
                meidu: '梅毒',
                HIV: 'HIV',
                jiehe: '结核',
                feiyan: '重症感染性肺炎',
                other: '其他',
              }}
              value={infectiousDisease}
              onChange={infectiousDisease => onChange({ ...value, infectiousDisease })}
            />
          </Form.Item>
          <div style={{ display: 'flex' }}>
            <Table />
            <div style={{ marginLeft: '24px', position: 'relative' }}>
              <Form.Item label="高危等级" style={{ display: 'flex' }}>
                <Select
                  showSearch
                  placeholder="选择..."
                  style={{ width: '116px' }}
                  optionFilterProp="children"
                  // onChange={this.onChange}
                  // onFocus={this.onFocus}
                  // onBlur={this.onBlur}
                  // onSearch={this.onSearch}
                  filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Object.keys(levelMap).map(k => {
                    if (typeof levelMap[k] === 'number') {
                      return null;
                    }
                    return (
                      <Select.Option key={k} value={k}>
                        {levelMap[k]}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <div
                style={{ textAlign: 'center', position: 'absolute', width: '100%', bottom: '0' }}
              >
                <Button style={{ marginLeft: '12px', marginRight: '12px' }}>取消</Button>
                <Button type="primary" style={{ marginLeft: '12px', marginRight: '12px' }}>
                  保存
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ minHeight: '800px' }}>
            <HighRiskTree />
          </div>
        </div>
      </Modal>
    </context.Provider>
  );
}

export default ManagementModal;
