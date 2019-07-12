export function transform(column, data) {
  // 找到moment日期类型数据，转化成string
  let momentKeys = [];
  let newData = [];
  for (let i = 0; i < column.length; i++) {
    if (!column[i].children && column[i].inputProps.type === 'date') {
      momentKeys.push(column[i]['dataIndex']);
    }
  }
  for (let i = 0; i < momentKeys.length; i++) {
    const key = momentKeys[i];
    newData = data.map(item => {
      return {
        ...item,
        [key]: moment(item[key]).format('YYYY-MM-DD'),
      }
    });
  }
  return newData;
}
