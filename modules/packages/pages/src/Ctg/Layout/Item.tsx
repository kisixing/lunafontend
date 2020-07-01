import React, { useRef, useCallback, useEffect, memo, useState } from 'react';
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
  onSelect?: (unitId: string) => void

  outPadding: number
  fullScreenId: string
  itemHeight: number
  itemSpan: number
  themeColor: string
  bordered?: boolean
}


const WorkbenchItem = (props: IProps) => {
  const { onSelect, bordered, themeColor, itemData, onClose, loading = false, fullScreenId, itemHeight, itemSpan, outPadding, data, bedname, status, unitId } = props;
  let { startTime, pregnancy } = props

  const [isFullscreen, setIsFullscreen] = useState(false)
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
  const fullScreenCb: clickCb = useCallback(
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
    const cb = e => {
      const el = ReactDOM.findDOMNode(ref.current) as HTMLElement;
      if (e.target === el) {
        setIsFullscreen(!isFullscreen)
      }
    }
    document.addEventListener('fullscreenchange', cb)
    return () => {
      document.removeEventListener('fullscreenchange', cb)
    }
  }, [isFullscreen])
  useEffect(() => {
    if (fullScreenId === unitId) {
      fullScreenCb(null);
      event.emit('bedFullScreen', unitId)
    }
  }, [fullScreenId])
  return (
    <Col
      span={itemSpan}
      ref={ref}
      onClick={() => onSelect(unitId)}
      style={{ transition: 'background .6s', padding: outPadding, height: itemHeight, background: bordered ? 'black' : `var(--theme-${'light'}-color)`, position: 'relative' }}
    >
      <Ctg_Item
        isFullscreen={isFullscreen}
        themeColor={themeColor}
        startTime={startTime}
        bedname={bedname}
        status={status}
        data={data}
        onDoubleClick={fullScreenCb}
        loading={loading}
        // onClose={() => { event.emit('bedClose', unitId, status, isTodo, docid) }}
        onClose={onClose && (() => onClose(itemData))}
        unitId={unitId}
        name={pregnancy.name}
        age={pregnancy.age as any}
        bedNO={pregnancy.bedNO}
        GP={pregnancy.GP}
        gestationalWeek={pregnancy.gestationalWeek}
        onSelect={null}
      >
        {
          props.children
        }
      </Ctg_Item>

    </Col >
  );
}
export default memo(WorkbenchItem);;
