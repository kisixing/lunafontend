import React, { useMemo } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import ScoringMethod from './ScoringMethod';
import Setting from './Setting';
import CTGChart from './CTGChart';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import moment from 'moment';
import { event } from '@lianmed/utils';
import request from "@lianmed/request";

const styles = require('./index.less');

export const Context = React.createContext({});
const docid = '1_1112_160415144057'
function Analysis({
  visible,
  onCancel,
  onCreate,
  dataSource,
  // docid = '',
}) {
  console.log(dataSource)
  const v = useMemo<{ suit: Suit }>(() => {
    return {} as any;
  }, []);

  const submit = () => {
    const data = { note: docid }
    event.emit('analysis:result', result => {
      Object.assign(data, result)
    })
    console.log(data)
    request.put(`/ctg-exams-note`, { data })
  }
  const style= {marginRight:10}
  return (
    <Context.Provider value={v}>
      <Modal
        maskClosable={false}
        getContainer={false}
        destroyOnClose
        centered
        width="92%"
        style={{ height: "88%" }}
        footer={null}
        visible={visible}
        title={
          <div className={styles.modalTitle}>
            <span style={style}>档案号：{(dataSource.ctgexam && dataSource.ctgexam.note) || dataSource.documentno}</span>
            <span style={style}>住院号：{(dataSource.pregnancy && dataSource.pregnancy.inpatientNO)}</span>
            <span style={style}>姓名：{dataSource.pregnancy && dataSource.pregnancy.name}</span>
            <span style={style}>年龄：{dataSource.pregnancy && dataSource.pregnancy.age}</span>
            <span style={style}>孕周： {dataSource.gestationalWeek}</span>
            <span style={style}>
              监护日期：
            {dataSource.ctgexam &&
                dataSource.ctgexam.startTime &&
                moment(dataSource.ctgexam.startTime).format('YYYY-MM-DD HH:mm:ss')}
              {/* {dataSource.data && dataSource.data.startTime && moment(dataSource.data.startTime).format('YYYY-MM-DD HH:mm:ss')} */}
            </span>
          </div>
        }
        okText="创建"
        cancelText="取消"
        onCancel={() => onCancel('analysisVisible')}
        onOk={onCreate}
        wrapClassName={styles.modal}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className={styles.chart}>
            <CTGChart docid={docid} />
          </div>
          <div className={styles.content}>
            <Row gutter={24} style={{ height: '100%' }}>
              <Col span={12} style={{ height: '100%' }}>
                <ScoringMethod docid={docid} v={v} dataSource={dataSource} />
              </Col>
              <Col span={12} style={{ height: '100%' }}>
                <Setting />
                <Button style={{ position: 'absolute', right: 40, bottom: 20 }} type="primary" onClick={submit}>保存</Button>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </Context.Provider>
  );
}

export default Analysis;
