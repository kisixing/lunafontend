import { BedStatus } from "@lianmed/lmg/lib/services/types";
import { event } from "@lianmed/utils";
import { Col } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Ctg_Item from "../Item/index";
import { ICtgLayoutItemProps } from "./types";


type clickCb = ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)




const WorkbenchItem = (props: ICtgLayoutItemProps) => {
  const { onSelect, bordered, activeColor, fontColor, itemData, onClose, loading = false, fullScreenId, itemHeight, itemSpan, outPadding, data, bedname, status, unitId, headColor, backgroundColor, borderedColor } = props;
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
      style={{ transition: 'background .6s', padding: outPadding, border: `1px solid ${borderedColor}`, height: itemHeight, background: bordered ? activeColor : backgroundColor, position: 'relative' }}
    >
      <Ctg_Item
        fontColor={fontColor}
        isFullscreen={isFullscreen}
        themeColor={headColor}
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
        backgroundColor={backgroundColor}
      >
        {
          props.children
        }
      </Ctg_Item>

    </Col >
  );
}
export default memo(WorkbenchItem);;
