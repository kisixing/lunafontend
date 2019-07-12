/**
 * 查询表头
 */
import React, { Component } from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
import Item from '../Form/Item';
import styles from './SearchForm.less';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configs: [],
      expand: false,
    }
  }

  componentDidMount() {
    const { configs } = this.props;
    const newConfigs = configs.slice(0, 3);
    this.setState({ configs: newConfigs })
  }

  handleFormReset = () => {
    const { handleReset, form } = this.props;
    handleReset();
    form.resetFields();
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { handleSearch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        handleSearch(values);
      }
    });
  };

  handleToggle  = () => {
    let { configs } = this.props;
    const { expand } = this.state;
    if (expand) {
      configs = configs.slice(0, 3);
    }
    this.setState({ configs, expand: !expand })
  };

  render() {
    const { form } = this.props;
    const { configs } = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24 }}>
          {configs.length > 0 && configs.map(item => {
            const { id, span, labelProps: { label } } = item;
            if (span && label) {
              return <Item key={id} form={form} params={item} />;
            }
          })}
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {configs.length > 3 && (
                <a style={{ marginLeft: 8 }} onClick={this.handleToggle}>
                  展开 <Icon type="down" />
                </a>
              )}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
