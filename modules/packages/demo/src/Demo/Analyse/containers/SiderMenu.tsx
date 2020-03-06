import React, { Component } from 'react';
import { Menu } from 'antd';
import { obvue } from '@lianmed/f_types';

class SiderMenu extends Component<{ dataSource: obvue.prenatal_visitspage[], setItem: any, selected: any }, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKeys: []
    }
  }

  handleClick = (e: any) => {
    console.log(e)
    const { setItem, dataSource } = this.props;
    const { keyPath, item } = e;
    this.setState({
      selectedKeys: keyPath
    });
    const target = dataSource.find(_ => _.id == keyPath[0])
    setItem(target)
  };

  render() {
    const { dataSource, selected } = this.props;
    return (
      <Menu
        mode="inline"
        selectedKeys={selected.id && [selected.id.toString()]}
        onClick={this.handleClick}
        style={{ height: 'calc(100% - 200px)' }}
      >
        {dataSource.map((item) => {
          return (
            <Menu.Item key={item.id} >
              <div>{item.ctgexam ? item.ctgexam.note : item.visitDate}</div>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

export default SiderMenu;
