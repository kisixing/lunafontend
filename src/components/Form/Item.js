import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Input, InputNumber, Radio, Select, DatePicker, Divider } from 'antd';
import moment from 'moment';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
const dateFormat = 'YYYY-MM-DD';

function Item ({ form, params }) {
  const formItem = () => {
    const { getFieldDecorator } = form;
    const { id, span, labelProps: { label, name }, inputProps: { type, inputType, value, placeholder, disabled, style, options, format, autosize, suffix }, rules } = params;

    switch (type) {
      case 'undefined':
        return (
          <span style={{ color: '#f00' }}>请在配置文件正确填写type类型</span>
        );
      case 'separator':
        return (
          <Divider orientation="left" style={{ fontWeight: '600' }}>{label}</Divider>
        );
      case undefined:
      case 'input':
        return (
          <Form.Item
            label={label}
          >
            {getFieldDecorator(name, {
              initialValue: value,
              rules: rules,
            })(
              <Input style={style} type={inputType} disabled={disabled} placeholder={placeholder} suffix={suffix}/>
            )}
          </Form.Item>
        );
      case 'textarea':
        return (
          <Form.Item
            label={label}
          >
            {getFieldDecorator(name, {
              initialValue: value,
              rules: rules,
            })(
              <TextArea style={style} placeholder={placeholder} autosize={autosize} suffix={suffix} />
            )}
          </Form.Item>
        );
      case 'inputNumber':
        return (
          <Form.Item
            label={label}
          >
            {getFieldDecorator(name, {
              initialValue: value,
              rules: rules,
            })(
              <div>
                <InputNumber suffix={suffix} addonAfter={suffix} />
                {suffix ? <span style={{ margin: '0 8px' }}>{suffix}</span> : null}
              </div>
            )}
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item
            label={label}
          >
            {getFieldDecorator(name, {
              initialValue: value,
              rules: rules,
            })(
              <RadioGroup options={options} />
            )}
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item
            label={label}
          >
            {getFieldDecorator(name, {
              initialValue: value,
              rules: rules,
            })(
              <Select style={{ width: '100%', ...style }} placeholder={placeholder}>
                {options && options.map(ele => <Option key={ele.value}>{ele.value}</Option>)}
              </Select>
            )}
          </Form.Item>
         );
      case 'date':
        return (
          <Form.Item
            label={label}
          >
            {getFieldDecorator(name, {
              initialValue: value ? moment(value) : null,
              rules: rules,
            })(
              <DatePicker format={format} />
            )}
          </Form.Item>
        );
      default:
        return;
    }
  };

  const { span } = params;

  return (
    <Col md={span} sm={24} style={{ height: '52px' }}>
      {formItem()}
    </Col>
  );
}

export default Item;
