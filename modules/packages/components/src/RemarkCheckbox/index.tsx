import React from 'react';
import { Checkbox, Input } from 'antd';
interface IProps {
  dataset?: object;
  onChange: (value: object) => void;
  value: object;
}
export default (props: IProps) => {
  const { dataset = { heart: '心脏病' }, onChange = () => {}, value = {} } = props;
  const _onChange = data => {
    onChange({
      ...value,
      ...data,
    });
  };
  const kvs = Object.entries(dataset);
  return (
    <>
      {kvs.map(([k, v]) => {
        const noteKey = k + 'Note';
        return (
          <div key={k} style={{ display: 'inline-block', marginRight: '10px' }}>
            <Checkbox
              onChange={e => {
                const bool = e.target.checked;
                _onChange({
                  [k]: bool,
                  [noteKey]: bool ? value[noteKey] : '',
                });
              }}
              checked={value[k]}
            >
              {v}
            </Checkbox>
            {value[k] && (
              <Input
                style={{ display: 'inline-block', maxWidth: '100px' }}
                onChange={e => _onChange({ [noteKey]: e.target.value })}
                value={value[noteKey]}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
