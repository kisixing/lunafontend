import React from "react";
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import autoHeight from '@/components/Charts/autoHeight';
import styles from './LineChart.less';

@connect(({ global, loading, weight }) => ({
  loading: loading.effects['weight/query'],
  dataSource: weight.dataSource,
}))
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 50, // 孕前体重
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'weight/query',
      payload: 'pregnancyId'
    })
  }

  /**
   * 各个孕周最大值计算
   * @param bmi BMI值
   * @param week
   * @param weight
   * @returns {Array}
   */
  upperLimit = (bmi, week, weight) => {
    const arr = [];
    for (let i = 1; i <= 40; i++) {
      let obj = {};
      if (i <= 12) {
        obj = {
          week: i.toString(),
          level: "最大值",
          increment: (i / 6).toFixed(2)
        };
      } else {
        let max = null;
        if (bmi <= 18.5) {
          max = 2 + 0.59 * i - 7.08;
        }
        if (bmi > 18.5 && bmi <= 23.9) {
          max = 2 + 0.45 * i - 5.4;
        }
        if (bmi > 23.9 && bmi <= 28) {
          max = 2 + 0.32 * i - 3.84;
        }
        if (bmi > 28) {
          max = 2 + 0.27 * i - 3.24;
        }
        obj = {
          week: i.toString(),
          level: "最大值",
          increment: max.toFixed(2)
        };
      }
      arr.push(obj)
    }
    return arr;
  };

  /**
   * 各个孕周最小值计算
   * @param bmi bmi值
   * @param week
   * @param weight
   * @returns {Array}
   */
  lowerLimit = (bmi, week, weight) => {
    const arr = [];
    for (let i = 1; i <= 40; i++) {
      let obj = {};
      if (i <= 12) {
        obj = {
          week: i.toString(),
          level: "最小值",
          increment: 0
        };
      } else {
        let min = null;
        if (bmi <= 18.5) {
          min =  0.45 * i - 5.4;
        }
        if (bmi > 18.5 && bmi <= 23.9) {
          min = 0.36 * i - 4.32;
        }
        if (bmi > 23.9 && bmi <= 28) {
          min = 0.23 * i - 2.76;
        }
        if (bmi > 28) {
          min = 0.18 * i - 2.16;
        }
        obj = {
          week: i.toString(),
          level: "最小值",
          increment: min.toFixed(2)
        };
      }
      arr.push(obj)
    }
    return arr;
  };

  render() {
    const { dataSource, loading } = this.props;
    const data = [...dataSource, ...this.upperLimit(19), ...this.lowerLimit(19)];
    const padding = { top: 20, right: 30, bottom: 100, left: 60 };
    const cols = {
      week: {
        alias: '孕周（周）', // 为属性定义别名
        range: [0, 1]
      },
      increment: {
        alias: '增长体重（kg）' // 为属性定义别名
      }
    };
    const grid = {
      align: 'start', // 网格顶点从两个刻度中间开始
      type: 'line' || 'polygon', // 网格的类型
      lineStyle: {
        stroke: '#ddd', // 网格线的颜色
        fill: '#ffffff',
        lineWidth: 1, // 网格线的宽度复制代码
        lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
      }, // 网格线的样式配置，原有属性为 line
      // alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
    };
    return (
      <PageHeaderWrapper loading={loading}>
        <Chart height={600} data={data} padding={padding} scale={cols} forceFit>
          <h2 className={styles.title}>MBI孕期体重管理曲线</h2>
          <h3 className={styles.subTitle}>
            <p>孕前BMI：18.5~24.9 kg/㎡</p>
            <p>体重正常，建议增长体重增长目标11.5~16kg</p>
          </h3>
          <Legend />
          <Axis
            title={{
              offset: 50,
              textStyle: {
                fontSize: '12',
                textAlign: 'right',
                fill: '#666',
              }, // 坐标轴文本属性配置
              position: 'end', // 标题的位置，**新增**
            }}
            name="week"
            grid={grid}
          />
          <Axis
            title={{
              offset: 50, // 设置标题 title 距离坐标轴线的距离
              textStyle: {
                fontSize: '12',
                textAlign: 'right',
                fill: '#666',
                rotate: -90
              }, // 坐标轴文本属性配置
              position: 'end', // 标题的位置，**新增**
            }}
            name="increment"
            grid={grid}
            label={{
              formatter: val => `${val}kg`
            }}
            line={{
              lineWidth: 1,
              stroke: '#ccc'
            }}
            tickLine={{
              lineWidth: 1, // 次刻度线宽
              stroke: '#ccc', // 次刻度线颜色
              // strokeOpacity: 1, // 次刻度线颜色的透明度
              length: 4 // 次刻度线的长度，可以为负值（表示反方向渲染）
            }}
          />
          <Tooltip
            crosshairs={{
              type: "cross"
            }}
          />
          <Geom
            type="line"
            position="week*increment"
            size={1.5}
            color={['level', ['#ff6084', '#ccc', '#ccc']]}
            shape="smooth"
            style={['level*week', {
              lineWidth: 1,
              lineDash: (level, week) => {
                if (level === '最大值' || level === '最小值') {
                  return [4, 2];
                }
              }
            }]}
            tooltip={['week*level*increment', (week, level, increment)=>{
              return {
                title: `第${week}周`,
                name: level,
                value: `${increment} kg`
              }
            }]}
          />
          <Geom
            type="point"
            position="week*increment"
            size={2.5}
            color={['level', ['#ff6084', '#ccc', '#ccc']]}
            shape="circle"
            style={{
              // 圆点边框样式
              stroke: "#fff",
              lineWidth: 1
            }}
            tooltip={['week*level*increment', (week, level, increment)=>{
              return {
                title: `第${week}周`,
                name: level,
                value: `${increment} kg`
              }
            }]}
            active={{}}
          />
        </Chart>
      </PageHeaderWrapper>
    );
  }
}

export default LineChart;
