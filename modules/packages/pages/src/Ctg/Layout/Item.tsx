import React, { useRef, useCallback, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import { BedStatus, ICacheItem, ICacheItemPregnancy } from "@lianmed/lmg/lib/services/types";

import { Col } from 'antd';
import Ctg_Item from "../Item/index";
import { event } from "@lianmed/utils";

type clickCb = ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)

interface IProps {
  loading: boolean
  onClose: (data: any) => void
  itemData: any
  children: React.ReactNode
  startTime: string
  pregnancy: ICacheItemPregnancy

  data: ICacheItem
  bedname: string
  unitId: string
  ismulti: boolean
  docid: string
  status: BedStatus

  outPadding: number
  fullScreenId: string
  itemHeight: number
  itemSpan: number
  themeColor: string
  bordered?: boolean
}


const WorkbenchItem = (props: IProps) => {
  const { bordered, themeColor, itemData, onClose, loading = false, fullScreenId, itemHeight, itemSpan, outPadding, data, bedname, status, unitId } = props;
  let { startTime, pregnancy } = props


  let w: any = window
  const k = `spinfo_${unitId}`
  const c = w[k] || (w[k] = {})
  if ([BedStatus.Stopped, BedStatus.OfflineStopped].includes(status)) {
    startTime = c.startTime
    pregnancy = c.pregnancy || {}
  } else {
    Object.assign(c, { pregnancy: { ...pregnancy, pvId: null }, startTime })
  }

  // -------------------
  const ref = useRef(null)
  const fullScreen: clickCb = useCallback(
    (e) => {
      const el = ReactDOM.findDOMNode(ref.current) as HTMLElement;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen();
      }
    }, []
  )
  useEffect(() => {
    if (fullScreenId === unitId) {
      fullScreen(null);
      event.emit('bedFullScreen', unitId)
    }
  }, [fullScreenId])
  return (
    <Col
      span={itemSpan}
      ref={ref}
      style={{ transition: 'background .6s', padding: outPadding, height: itemHeight, background: `var(--theme-${bordered ? 'dark' : 'light'}-color)`, position: 'relative' }}
    >
      <Ctg_Item
        themeColor={themeColor}
        startTime={startTime}
        bedname={bedname}
        status={status}
        data={data}
        onDoubleClick={fullScreen}
        loading={loading}
        // onClose={() => { event.emit('bedClose', unitId, status, isTodo, docid) }}
        onClose={onClose && (() => onClose(itemData))}

        name={pregnancy.name}
        age={pregnancy.age as any}
        bedNO={pregnancy.bedNO}
        GP={pregnancy.GP}
        gestationalWeek={pregnancy.gestationalWeek}
      >
        {
          props.children
        }
      </Ctg_Item>

    </Col >
  );
}
export default memo(WorkbenchItem);;
