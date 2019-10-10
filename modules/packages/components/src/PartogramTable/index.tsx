import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Columns from './Columns';
import request from '@lianmed/request'

function EditableCell(props: any) {
  const { value, onChange, ...o } = props;
  return (
    <Table
      size="small"
      rowKey="id"
      pagination={false}
      columns={Columns({ onChange, value,...o })}
      dataSource={value}
    // style={{ flex: 1 }}
    />
  );
}

export default (({ url,style={} }) => {
  console.log('partogram table render')
  const [data, setData] = useState([])

  function getData() {
    request.get(url + '?gynecologicalExamId.specified=true&pregnancyId.equals=1',{loading:'请求中'}).then(res => {
      setData(res.map(_ => {
        return { ..._.gynecologicalExam,visitTime:_.visitTime,outerId:_.id,pregnancy:_.pregnancy,doctor:_.doctor }
      }))
      console.log(res)
    }).catch(e => {
      console.log('err', e)
    })
  }
  function onDel(id:string) {
    request.delete(url+`/${id}`).then(res => {
      getData()
    })
  }

 


  function commitData(data?:object) {
    const method = data ? 'put':'post';
    data = data || {
      "visitType": "30",
      "visitTime": new Date(),
      "gestationalWeek": "30",
      "gynecologicalExam": {
        "fundalHeight":null,
        "waistHip": null,
        "fetalPosition": null,
        "fetalHeart": null,
        "presentation": null,
        "engagement": null,
        "vagina":null,
        "cervix": null,
        "adnexa": null,
        "note": null
      },
      "pregnancy": {
        "id": 1
      }
    }
    return request[method](url, {
      data
    }).then(()=>{
      getData()
    })
  }
  useEffect(getData, [])
  return (
   <div style={style}>
      <EditableCell
      value={data}
      onChange={data => {
        setData(data)
      }}
      onAdd={() => {
        commitData()
      }}
      onCommit={data => {
        commitData(data)
      }}
      onDel = {
        onDel
      }
    />
   </div>
  );
})
