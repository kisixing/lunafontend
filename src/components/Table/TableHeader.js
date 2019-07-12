
import React, { PureComponent } from 'react';
import { Button, Modal, message } from 'antd';

import styles from './TableHeader.less';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
message.config({
  top: 200,
  duration: 2,
  maxCount: 3,
});

class TableHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default', // ["large","default","small"].
      visible: false, // edit modal visible
      type: 'create', // create, edit两种类型
    }
  }

  componentDidMount() {
    // console.log('TableHeader...', this.props)
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  // 删除
  delete = () => {
    const { selectedRowKeys } = this.props;
    if (selectedRowKeys.length === 0) {
      message.warn('请选择需要删除的行');
      return;
    }
    const content = '';
    this.showDeleteConfirm(selectedRowKeys, content);
  };

  // 删除确认窗口
  showDeleteConfirm(selectedRowKeys, content) {
    confirm({
      title: '确认删除选中的行?',
      content: 'Some descriptions',
      centered: true,
      mask: false,
      maskClosable: true,
      okText: '确认',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        console.log('deleted', selectedRowKeys);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 导出excel
  downloadExl(json, type) {

  }

  render() {
    const { size, visible, type } = this.state;
    const { dataSource, columns, span = 12, selectedRows, save, download, print, edit, create } = this.props;
    return (
      <div className={styles.tableHeader}>
        <ButtonGroup size={size}>
          {save && <Button className="primary-outline-button" icon="save" onClick={save}>保存</Button>}
          {create && <Button className="primary-outline-button" icon="plus" onClick={create}>添加</Button>}
          {edit && <Button className="green-outline-button" icon="edit" onClick={edit}>编辑</Button>}
          <Button className="green-outline-button" icon="sync">刷新</Button>
        </ButtonGroup>
        <Button icon="delete" className="red-outline-button" size={size} onClick={this.delete}>删除</Button>
        {print && <Button icon="printer" className="primary-outline-button" size={size}>打印</Button>}
        {download && <Button icon="download" className="primary-outline-button" size={size}>导出EXCEL</Button>}
        {/* {visible ? (
          <EditModal
            wrappedComponentRef={this.saveFormRef}
            span={span} // 单行列数
            visible={visible}
            title={type === 'create' ? '新建' : '编辑'}
            type={type}
            columns={columns}
            dataSource={dataSource}
            selectedRows={selectedRows}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        ) : null} */}
      </div>
    )
  }
}

export default TableHeader;
