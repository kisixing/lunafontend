import React, { Component } from 'react';

import { Layout, Menu, Spin, Button, Popconfirm } from 'antd';
import PreviewContent from '@lianmed/pages/lib/Ctg/Report/PreviewContent';
import { request } from '@lianmed/utils';
import styles from './ReportContent.module.css';

class ReportContent extends Component<any, any> {
  static propTypes = {};

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      deleteLoading: false,
      archiveLoading: false,
      currentReport: {},
      wh: { w: 0, h: 0 },
      pdfBase64: null,
    };
    this.myRef = React.createRef();
  }
  myRef: any
  componentDidMount() {
    const { clientHeight, clientWidth } = this.myRef.current;
    this.setState({ wh: { w: clientWidth - 302, h: clientHeight } });
  }

  // 提取改孕妇所有报告
  getAllReports = (data: any) => {
    let ctgexam: any[] = [];
    for (let i = 0; i < data.length; i++) {
      const visitDate: any = data[i]['visitDate'];
      const element: any = data[i]['ctgexam'];
      const d = { ...element, visitDate: visitDate }
      ctgexam.push(d);
    }
    return ctgexam;
  };

  handleClick = (e: any) => {
    const { key, item } = e;
    const value = item.props.data;
    this.fetchpdf(key);
    this.setState({ currentReport: value });
  };

  fetchpdf = (value: any) => {
    this.setState({ loading: true });
    request
      .get('/ctg-exams-pdf', {
        params: {
          report: value,
        },
      })
      .then(({ pdfdata }) => {
        if (pdfdata) {
          this.setState({ pdfBase64: `data:application/pdf;base64,${pdfdata}` });
        }
        this.setState({ loading: false });
      }).catch(err => {
        this.setState({ loading: false });
      });
  };

  onDownload = (id: any) => {
    const filePath = `${(window as any).CONFIG.baseURL
      }/ctg-exams-pdfurl/${id} `;
    window.open(filePath);
  };

  onDelect = (bizSn: any) => {
    // 删除报告
    // 当前档案id --> currentReport.bizSn
    this.setState({ deleteLoading: true });
    request
      .delete(`/ obsolete - report / ${bizSn} `)
      .then((res) => {
        // 重新请求档案列表
        this.props.fetchList();
        this.setState({
          deleteLoading: false,
          pdfBase64: null,
          currentReport: {},
        });
      })
      .catch(err => {
        this.setState({ deleteLoading: false });
      });
  };

  doArchiving = (bizSn: any) => {
    this.setState({ archiveLoading: true });
    // 归档
    // 当前档案id --> currentReport.bizSn
    request
      .put('/doc/archive', {
        data: { bizSn },
      })
      .then(res => {
        this.setState({ archiveLoading: false });
      })
      .catch(err => {
        this.setState({ archiveLoading: false });
      });
  };

  undoArchiving = (bizSn: any) => {
    this.setState({ archiveLoading: true });
    // 撤销归档
    request
      .put('/doc/undo-archive', {
        data: { bizSn },
      })
      .then(res => {
        this.setState({ archiveLoading: false });
      })
      .catch(err => {
        this.setState({ archiveLoading: false });
      });
  };

  renderMenus = (data: any) => {
    const childrenLoop = (children: any) => {
      return children.map((e: any) => {
        const { bizSn, archived, valid, time } = e;
        return (
          <Menu.Item key={bizSn} className={styles.item}>
            <div>{bizSn}</div>
          </Menu.Item>
        );
      });
    };
    const loop = (dataSource: any) => {
      // eslint-disable-next-line array-callback-return
      return dataSource.map((item: any) => {
        const { visitDate, report, id } = item;
        // return (
        //   <Menu.ItemGroup
        //     key={id}
        //     title={`检查日期：${ visitDate || (report && moment(report.endTime).format('YYYY-MM-DD')) } `}
        //   >
        //     {report && report.length ? childrenLoop(report) : null}
        //   </Menu.ItemGroup>
        // );
        if (report && report.length) {
          return childrenLoop(report);
        }
      });
    };
    return (
      <Menu
        mode="inline"
        className={styles.wrapper}
        selectedKeys={[this.state.currentReport['bizSn']]}
        onClick={this.handleClick}
      >
        {loop(data)}
      </Menu>
    );
  };

  render() {
    const { wh, pdfBase64, loading, archiveLoading, deleteLoading, currentReport } = this.state;
    const bizSn = currentReport.bizSn;
    const { dataSource } = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        <Layout.Sider width={260} className={styles.sider}>
          {this.renderMenus(this.getAllReports(dataSource))}
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          <div className={styles.innerContent} ref={this.myRef}>
            <Spin wrapperClassName={styles.spiner} spinning={loading}>
              <PreviewContent pdfBase64={pdfBase64} wh={wh} isFull borderd={false} />
            </Spin>
            <div className={styles.buttons}>
              {currentReport.archived ? (
                <Button loading={archiveLoading} onClick={() => this.undoArchiving(bizSn)}>
                  撤销归档
                </Button>
              ) : (
                  <Button
                    loading={archiveLoading}
                    type="primary"
                    onClick={() => this.doArchiving(bizSn)}
                  >
                    归档
                </Button>
                )}
              <Popconfirm
                title={`确认删除档案号为${currentReport.bizSn} 的报告吗？`}
                placement="topRight"
                onConfirm={() => this.onDelect(bizSn)}
                okText="是"
                cancelText="否"
              >
                <Button loading={deleteLoading}>删除</Button>
              </Popconfirm>
              <Button type="primary" onClick={() => this.onDownload(bizSn)}>
                打印
              </Button>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}

export default ReportContent;
