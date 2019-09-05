import React from 'react';
import { Checkbox, Input } from 'antd';
interface IProps {
  dataset?: object;
  onChange: (value: any) => void;
  value: object;
}
export default (props: IProps) => {
  const { dataset = { heart: '心脏病' }, onChange = () => {}, value = {} } = props;
  console.log(value);
  const _onChange = (key, _value) => {
    onChange({
      ...value,
      [key]: _value,
    });
  };
  const kvs = Object.entries(dataset);
  return (
    <>
      {kvs.map(([k, v]) => {
        const noteKey = k + 'Note';
        return (
          <div key={k}>
            <Checkbox
              onChange={e => {
                const bool = e.target.checked;
                _onChange(k, bool);
                if (!bool) {
                  _onChange(noteKey, '');
                }
              }}
              checked={value[k]}
            >
              {v}
            </Checkbox>
            {value[k] && (
              <Input onChange={e => _onChange(noteKey, e.target.value)} value={value[noteKey]} />
            )}
          </div>
        );
      })}
    </>
  );
};
