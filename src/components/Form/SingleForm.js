import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Divider } from 'antd';
import Item from './Item';
import styles from './SingleForm.less';

@Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    let lists = {};
    const data = props.data;
    for (let key in data) {
      lists[key] = Form.createFormField({ value: data[key] });
    }
    return lists;
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})
class SingleForm extends PureComponent {
  static propTypes = {
    config: PropTypes.array,
    data: PropTypes.object,
  };

  static defaultProps = {
    config: [],
    data: {},
    formTitle: '表单名称'
  };

  // componentDidMount() {
  //   const { form, data } = this.props;
  //   form.setFieldsValue({
  //     ...data,
  //   }, () => console.log('after'));
  //   // console.log('before');
  // }

  render () {
    const { formTitle, config, data, form } = this.props;
    // console.log('single form',config, data)
    return (
      <Form
        layout="inline"
        className={styles.customForm}
      >
        { formTitle && <Divider orientation="left" className={styles.formTitle}>{formTitle}</Divider>}
        <Row>
          {config.length > 0 && config.map(item => {
            const { id, span, labelProps: { label }, inputProps: { type }} = item;
            if (span && label) {
              return <Item key={id} form={form} params={item} />;
            }
          })}
        </Row>
      </Form>
    );
  }
}

export default SingleForm;
