/**
 * CTG 曲线
 */

import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import moment from 'moment';
import { Ctg as CTG } from '@lianmed/lmg';
import request from '@lianmed/request';


// import ReportPreview from '../../archives-management/ReportPreview';
import styles from './Content.module.css';
import { obvuew } from '@lianmed/f_types';

export default (props: { selected: obvuew.prenatal_visitspage }) => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<any>(null)

  useEffect(() => {
    const s = props.selected
    if (s.ctgexam && s.ctgexam.note) {
      fetch(s.ctgexam.note)
    }
    return () => {

    };
  }, [props])

  useEffect(() => {
    console.log('dataSource', dataSource)
  }, [dataSource])
  // componentWillUnmount() {
  //   event.off('signed', () => {});
  // }

  const fetch = (docId: string) => {
    setLoading(true)
    setTimeout(() => {
      request
        .get(`/ctg-exams-data/${docId}`)
        .then(function (response) {
          setDataSource(response)
          setLoading(false)

        })
        .catch(function (error) {
          console.log("/ctg-exams-data/docId", error);
          setLoading(false)
          setDataSource(null)
        });
    }, 600);
  }



  const renderTitle = () => {
    const { selected } = props;
    const { pregnancy, ctgexam, gestationalWeek } = selected;
    return !!ctgexam && pregnancy && (
      <div className={styles.title}>
        <span>档案号：</span>
        <span className={styles.value}>{ctgexam.note}</span>
        <span>住院号：</span>
        <span className={styles.value}>{pregnancy.inpatientNO}</span>
        <span>姓名：</span>
        <span className={styles.value}>{pregnancy.name}</span>
        <span>年龄：</span>
        <span className={styles.value}>{pregnancy.age}</span>
        <span>孕周：</span>
        <span className={styles.value}>{gestationalWeek}</span>
        <span>监护日期: </span>
        <span className={styles.value}>
          {ctgexam.startTime &&
            moment(ctgexam.startTime).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
    );
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.ctg}>
        <CTG data={dataSource}></CTG>
      </div>





    </div>
  );
}
