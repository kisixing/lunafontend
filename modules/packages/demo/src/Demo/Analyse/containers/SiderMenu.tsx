import React, { Component } from 'react';
import { Menu } from 'antd';
import styles from "./SiderMenu.module.css";
import { obvuew } from '@lianmed/f_types';

class SiderMenu extends Component<{ dataSource: obvuew.prenatal_visitspage[], setItem: any, selected: any }, any> {
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
    const { selectedKeys } = this.state;
    const { dataSource, selected } = this.props;
    // console.log('555555555', selectedKeys, [selected.id]);
    return (
      <Menu
        mode="inline"
        className={styles.wrapper}
        selectedKeys={selected.id && [selected.id.toString()]}
        onClick={this.handleClick}
        style={{height: 'calc(100vh - 200px)',}}
      >
        {dataSource.map((item) => {
          return (
            <Menu.Item key={item.id} className={styles.item}>
              <div>{item.visitTime || item.visitDate}</div>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

export default SiderMenu;
