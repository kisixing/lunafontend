import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Popconfirm, Form, DatePicker, Select, message } from 'antd';
import moment from 'moment';

import ResizeableTitle from './ResizeableTitle';
import TableHeader from './TableHeader';
import SearchForm from './SearchForm';
import EditModal from './EditModal';

import styles from './CustomTable.less';

const { Option } = Select;
const EditableContext = React.createContext();
const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;


class EditableCell extends Component {
  getInput = (record) => {
    const { type } = record;
    if (type === 'select') {
      const { options, style, placeholder } = record;
      return (
        <Select style={{ width: '200px' }} placeholder={placeholder}>
          {options && options.map(ele => <Option key={ele.value}>{ele.value}</Option>)}
        </Select>
      );
    }
    if(type === 'date') {
      return <DatePicker format="YYYY-MM-DD" />
    }
    return <Input  />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputProps,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: inputProps.required,
                  message: `请输入 ${title}!`,
                },
              ],
              initialValue: inputType === 'date' ? moment(record[dataIndex]): record[dataIndex],
            })(this.getInput(inputProps))}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headerColumns: [],
      selectedRowKeys: [], // 选中行id
      selectedRows: [],
      total: 50, // 总行数
      editingKey: '',
      width: getWindowWidth() - 336,
      visible: false,
      type: {
        label: '新建',
        value: 'create'
      }, // create新建 edit编辑
    };
  }


  componentDidMount() {
    this.dealData();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.dataSource !== nextProps.dataSource) {
      this.dealData();
    }
  }

  dealData = () => {
    const { configs: { columns }, dataSource } = this.props;
    // 找到moment日期类型数据，转化成string
    const momentKeys = [];
    let newData = [];
    for (let i = 0; i < columns.length; i++) {
      // 找到所有date类型的key
      if (!columns[i].children && columns[i].inputProps && columns[i].inputProps.type === 'date') {
        momentKeys.push(columns[i]['dataIndex']);
      }
    }
    for (let i = 0; i < momentKeys.length; i++) {
      const key = momentKeys[i];
      // for (const k in columns) {
      //   lists[key] = Form.createFormField({ value: data[key] });
      // }
      newData = dataSource.map(item => {
        if (item[key]) {
          return {
            ...item,
            [key]: moment(item[key]).format('YYYY-MM-DD'),
          }
        }
        return {
          ...item
        }
      });
    }
    // 操作
    const operation = {
      title: '操作',
      dataIndex: 'operation',
      key:'operation',
      width: 120,
      align: 'center',
      editable: false,
      fixed: 'right',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          [
            <EditableContext.Consumer>
              {form => (
                <a
                  key="EditableContext.Consumer"
                  href="javascript:;"
                  onClick={() => this.save(form, record.key, record)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>,
            <Popconfirm key="Popconfirm" title="确定取消修改?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          ]
        ) : (
          [
            <a key="edit" href="javascript:;" disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              编辑
            </a>,
            <a key="detail" href="javascript:;" style={{ margin: '0 6px' }} disabled={editingKey !== ''} onClick={() => this.detail(record.key)}>
              查看
            </a>,
            <Popconfirm key="delete" title="确定删除?" onConfirm={() => this.delete(record.key)}>
              <a>删除</a>
            </Popconfirm>
          ]
        );
      },
    };
    const c = columns.concat(operation);
    const width = this.getTablWiddth(c);
    this.setState({
      width,
      dataSource: newData,
      headerColumns: c,
    })
  };

  // 取tablewidth
  getTablWiddth(data) {
    let width = 0;
    for (let i = 0; i < data.length; i++) {
      // 是否有children
      const has = data[i]['children'] && data[i]['children'].length;
      if (!has) {
        width = width + data[i]['width'];
      } else {
        width = width + this.getTablWiddth(data[i]['children']);
      }
    }
    return width;
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  // isEditing行内修改时的保存方法
  save(form, key, record) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      // 处理moment 时间格式
      for (let key in row) {
        let value = row[key];
        if (moment.isMoment(value)) {
          const newValue = moment(value).format('YYYY-MM-DD');
          row[key] = newValue;
        }
      }
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ dataSource: newData, editingKey: '' });
      }
      console.log('save', row)
    });
  }

  // 确定行内修改时的row id
  edit(key) {
    this.setState({ editingKey: key });
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  paginationChange = (page, pageSize) => {
    // page 第几页 pageSize 每页多少列
    console.log('pagination Change', page, pageSize);
    // 做数据请求
  };

  // 单击行选中
  onRowClick = (record) => {
    const key = record.key;
    const selectedRowKeys = this.state.selectedRowKeys;
    // 判断key是否在selectedRowKeys中
    const index = selectedRowKeys.findIndex(val => val === key);

    if (index > -1) {
      // 已经选择，则删除
      const newSelectedRowKeys = selectedRowKeys.filter(val => val !== key);
      this.setState({ selectedRowKeys: newSelectedRowKeys });
    } else{
      // 未选择，则添加
      const newSelectedRowKeys = [...selectedRowKeys, key];
      this.setState({ selectedRowKeys: newSelectedRowKeys });
    }
  };

  // 显示modal窗口
  showModal = () => {
    this.setState({ visible: true });
  };

  // 隐藏modal窗口
  handleCancel = () => {
    this.setState({ visible: false });
  };

  // 新增
  create = () => {
    this.setState({ type: 'create' });
    this.showModal();
  };
  // 编辑
  modalEdit = () => {
    const { selectedRowKeys } = this.state;
    const length = selectedRowKeys.length;
    if ( length === 0) {
      message.warn('请选择需要编辑的行');
      return;
    }
    if (length > 1) {
      message.warn('暂时不支持多行编辑');
      return;
    }
    this.setState({ type: 'edit' });
    this.showModal();
  };
  // 查看详情
  detail = () => {
    this.setState({ type: 'detail' });
    this.showModal();
  };

  // 绑定modal
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // modal新建 修改操作
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  render() {
    const { headerColumns, selectedRowKeys, selectedRows, total, dataSource, width, visible, type } = this.state;
    const { modalSpan, configs, handleSearch, handleReset, form } = this.props;
    const { filter, page } = configs;

    const components = {
      header: {
        cell: ResizeableTitle,
      },
      body: {
        cell: EditableCell,
      },
    };

    const columns = headerColumns.map((col, index) => {
      if (!col.editable) {
        return {
          ...col,
          onHeaderCell: column => ({
            width: column.width,
            // onResize: this.handleResize(index),
          }),
        };
      }
      return {
        ...col,
        onHeaderCell: column => ({
          width: column.width,
          // onResize: this.handleResize(index),
        }),
        onCell: record => ({
          record,
          inputProps: col.inputProps,
          inputType: col.inputProps ? col.inputProps.type : '',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      }
    });

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => this.setState({ selectedRowKeys, selectedRows }),
    };

    const headerProps = {
      selectedRowKeys,
      selectedRows,
      span: modalSpan,
      edit: this.modalEdit,
    };

    return (
      <EditableContext.Provider value={form} className={styles.table}>
        { filter && filter.enable && (
          <SearchForm
            configs={filter.items}
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
          )
        }
        <Table
          bordered
          size="small"
          scroll={{ x: width }}
          components={components}
          columns={columns}
          title={(currentPageData) => <TableHeader columns={headerColumns} dataSource={currentPageData} {...headerProps} />}
          dataSource={dataSource}
          rowSelection={rowSelection}
          rowClassName={styles.rowClass}
          pagination={page && page.enable ? {
            size: 'middle', // middle
            pageSize: parseInt(page.pageSize),
            total,
            showTotal: total => `共 ${total} 项`,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.paginationChange,
          } : false}
          // onRow={record => {
          //   return {
          //     onClick: () => this.onRowClick(record),
          //     onDoubleClick: event => {},
          //     onContextMenu: event => {},
          //     onMouseEnter: event => {}, // 鼠标移入行
          //     onMouseLeave: event => {},
          //   };
          // }}
        />
        {visible ? (
          <EditModal
            wrappedComponentRef={this.saveFormRef}
            span={modalSpan} // 单行列数
            visible={visible}
            title={type === 'create' ? '新建' : '编辑'}
            type={type}
            columns={columns}
            dataSource={dataSource}
            selectedRows={selectedRows}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        ) : null}
      </EditableContext.Provider>
    );
  }
}

CustomTable.propTypes = {
  config: PropTypes.array,
  dataSource: PropTypes.array,
};

export default  Form.create()(CustomTable);
