import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Select, Button } from 'antd';
import HighRiskTree from './Tree';
import context from '../context';
import { RemarkCheckbox } from '@lianmed/components';
import Table from '../Table';
import { InfectiousDisease } from '../../RemarkCheckbox';
export enum levelMap {
  Ⅰ = 1,
  Ⅱ,
  Ⅲ,
  Ⅳ,
  Ⅴ,
  Ⅵ,
}

function ManagementModal(props) {
  const [value, onChange] = useContext(context);
  const [state, setState] = useState(value);
  const { visible, onCancel } = props;

  const { infectiousDisease } = state;
  console.log('state', state, value);
  useEffect(() => {
    setState(value);
  }, [value, visible]);
  return (
    <Form labelAlign="left" labelCol={{ xs: 2 }} wrapperCol={{ xs: 20 }}>
      <context.Provider value={[state, setState]}>
        <Modal
          destroyOnClose
          centered
          title="风险管理"
          visible={visible}
          width={1080}
          bodyStyle={{ overflowY: 'scroll', maxHeight: '80vh' }}
          // footer={null}
          onCancel={() => onCancel(false)}
          onOk={() => {
            onChange(state);
            onCancel(false);
          }}
        >
          <div>
            <Form.Item label="高危等级">
              <Select
                showSearch
                placeholder="选择..."
                style={{ width: '116px' }}
                optionFilterProp="children"
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
            <Form.Item label="传染病">
              <InfectiousDisease
                value={infectiousDisease}
                onChange={infectiousDisease => setState({ ...state, infectiousDisease })}
              />
            </Form.Item>
            <Table editable={true} value={state} onChange={setState} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ minHeight: '800px' }}>
              <HighRiskTree />
            </div>
          </div>
        </Modal>
      </context.Provider>
    </Form>
  );
}

export default ManagementModal;
