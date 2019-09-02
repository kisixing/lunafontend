import React, { FunctionComponent } from 'react';
import { Radio, Select } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
interface datasetMap {
  value: string;
  label: string;
}
interface formItemProps {
  value: string;
  onChange: (e: RadioChangeEvent) => void;
  readOnly: boolean;
}

const generator = (Wrap, Item) => {
  return (
    dataset: Array<datasetMap>,
    size = 'default'
  ): FunctionComponent<formItemProps> | Function => {
    const Cop = (props: formItemProps) => {
      //   const {value,onChange} = props
      let { value, onChange, readOnly } = props;
      let target: datasetMap;
      return readOnly ? (
        (target = dataset.find(_ => {
          _.value === value;
        })) ? (
          target.label
        ) : null
      ) : (
        <Wrap size={size} value={value} onChange={onChange}>
          {dataset.map(item => {
            return (
              <Item value={item.value} key={item.value}>
                {item.label}
              </Item>
            );
          })}
        </Wrap>
      );
    };
    return Cop;
  };
};

export const buttonGroupCreator = generator(Radio.Group, Radio.Button);
export const selectCreator = generator(Select, Select.Option);
