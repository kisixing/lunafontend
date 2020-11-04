
import { obvue } from '@lianmed/f_types';
import { formatTime } from "@lianmed/utils";
import { Menu } from 'antd';
import React, { useEffect } from 'react';
import { historyItem } from './data.d';


export type TableListData = obvue.prenatal_visitspage[]

export interface UpdateFormProps {

  historyList: historyItem[]
  currentHistory: historyItem
  setCurrentHistory: (i: historyItem) => void
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { historyList, currentHistory, setCurrentHistory } = props


  useEffect(() => {
    const firstOne = historyList[0]
    const isCurrentIn = historyList.findIndex(_ => _.id === currentHistory?.id) > -1
    if (!isCurrentIn && firstOne) {
      // setCurrentHistory(firstOne)
    }
  }, [historyList, currentHistory])




  return (
    <>
      <div className="divider">标记历史</div>
      <Menu style={{ height: '100%', overflowY: 'auto', minWidth: 240 }} selectedKeys={[currentHistory?.id?.toString() as any]} onSelect={({ key }) => {
        const target = historyList.find(_ => _.id.toString() == key)
        console.log(target)
        setCurrentHistory(target || {})
      }} >
        {
          historyList.map(({ doctor, id, diagnosisTime }) => {
            return (
              <>
                <Menu.Item key={id?.toString()}>{doctor}———{formatTime(diagnosisTime)}</Menu.Item>

              </>
            )
          })
        }
      </Menu>
    </>




  )
};

export default UpdateForm;
