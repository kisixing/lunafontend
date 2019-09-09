import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Select } from 'antd';
import HighRiskTree from './Tree';
import context from '../context';
import Table from '../Table';
import { InfectiousDisease } from '../../RemarkCheckbox';
import { listData } from '../dataSource';
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

  const { infectiousDisease, level, risks } = state;
  useEffect(() => {
    setState(value);
  }, [value, visible]);
  useEffect(() => {
    const _level = Object.values(infectiousDisease).some(_ => _ === true)
      ? '5'
      : listData
          .filter(_ => risks.map(risk => risk.key).includes(_.key))
          .reduce((prev_level, cur) => {
            const cur_level = cur.key.slice(0, 1);
            return prev_level > cur_level ? prev_level : cur_level;
          }, '1');

    setState({ ...state, level: _level });
  }, [risks, infectiousDisease]);
  return (
    <div>
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
            <Form.Item label="高危等级" labelAlign="left" labelCol={{ xs: 2 }}>
              <Select
                placeholder="选择..."
                style={{ width: '116px' }}
                value={level}
                onSelect={value => setState({ ...state, level: value })}
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
            <Form.Item label="传染病" labelAlign="left" labelCol={{ xs: 2 }}>
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
    </div>
  );
}

export default ManagementModal;
