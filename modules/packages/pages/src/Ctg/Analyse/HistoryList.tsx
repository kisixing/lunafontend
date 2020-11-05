
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { obvue } from '@lianmed/f_types';
import { formatTime } from "@lianmed/utils";
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { historyItem } from './data.d';

export type TableListData = obvue.prenatal_visitspage[]

export interface UpdateFormProps {

  historyList: historyItem[]
  currentHistory: historyItem
  setCurrentHistory: (i: historyItem) => void
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { historyList, currentHistory, setCurrentHistory } = props

  const [showTime, setShowTime] = useState(false)
  useEffect(() => {
    const firstOne = historyList[0]
    const isCurrentIn = historyList.findIndex(_ => _.id === currentHistory?.id) > -1
    if (!isCurrentIn && firstOne) {
      // setCurrentHistory(firstOne)
    }
  }, [historyList, currentHistory])




  return (
    historyList.length ? <>
      <div className="divider" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>历史</span>
        <span>
          <MenuUnfoldOutlined onClick={() => setShowTime(!showTime)} style={{ cursor: 'pointer', padding: '0 4px 0 6px' }} />
        </span>
      </div>
      <Menu style={{ height: '100%', overflowY: 'auto', minWidth: 0, fontSize: showTime ? 12 : 'unset', textAlign: 'center' }}
        selectedKeys={[currentHistory?.id?.toString() as any]}
        onSelect={({ key }) => {
          const target = historyList.find(_ => _.id.toString() == key)
          console.log(target)
          setCurrentHistory(target || {})
        }} >
        {
          historyList.map(({ doctor, id, diagnosisTime }) => {
            return (
              <Menu.Item style={{ padding: '0 4px' }} key={id?.toString()}>{doctor}{showTime ? '_' + formatTime(diagnosisTime) : ''}</Menu.Item>
            )
          })
        }
      </Menu>
    </> : null
  )
};

export default UpdateForm;
