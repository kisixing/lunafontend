import { registerFormField, connect } from '@uform/react';
import React, { ComponentType } from 'react';
import { Input, Row, Col, Checkbox } from 'antd';

const C: ComponentType<any> = ({ value, onChange, datasource }) => {
  return (
    <div>
      <Checkbox.Group value={value} style={{ width: '100%' }} onChange={onChange as any}>
        <Row>
          {/* <Col span={8}>
            <Checkbox value={"无"}>无</Checkbox>
          </Col> */}
          {datasource.map((d, index) => {
            return (
              <Col span={8} key={index + Math.random().toString()}>
                <Row gutter={5} style={{ marginBottom: '4px', lineHeight: '32px' }}>
                  <Col span={10}>
                    <Checkbox value={d} key={d}>
                      {d}
                    </Checkbox>
                  </Col>
                  {value.includes(d) && (
                    <Col span={10}>
                      <Input />
                    </Col>
                  )}
                </Row>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    </div>
  );
};

registerFormField('DiseaseHistory', connect()(C));
