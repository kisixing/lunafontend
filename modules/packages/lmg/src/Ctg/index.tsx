import React, { useRef, useState, useImperativeHandle, Ref, forwardRef } from 'react';
import { Suit } from './Suit';
import { IBarTool } from '../ScrollBar/useScroll';
import ScrollBar from '../ScrollBar';
import Ecg from "../Ecg";
import { IProps, Canvas, Div, Drawer } from "../interface";
import useDraw from "../useDraw";
import { Loading } from './Loading'
import { useCheckNetwork } from '../services/WsService';

import { ButtonTools } from "./ButtonTools";
export default forwardRef((props: IProps, ref: Ref<any>) => {
  const {
    data,
    mutableSuitObject = { suit: null },
    suitType = 0,
    showEcg = false,
    loading = false,
    onReady = (s: Drawer) => { },
    ...others
  } = props
  const barTool = useRef<IBarTool>(null)
  const canvasgrid = useRef<Canvas>(null);
  const canvasdata = useRef<Canvas>(null);
  const canvasline = useRef<Canvas>(null);
  const canvasselect = useRef<Canvas>(null);
  const canvasanalyse = useRef<Canvas>(null);
  const box = useRef<Div>(null);
  const ctgBox = useRef<Div>(null);
  const ctg = useRef<Suit>(null)
  const ecg = useRef<Drawer>(null)
  const [ecgHeight, setEcgHeight] = useState(0)
  const [showBtns, setShowBtns] = useState(false)
  const staticType = suitType > 0
  useDraw(data, ctgBox, () => {
    const instance = ctg.current = new Suit(
      canvasgrid.current,
      canvasdata.current,
      canvasline.current,
      canvasselect.current,
      canvasanalyse.current,
      ctgBox.current,
      barTool.current,
      suitType
    )
    onReady(instance)
    mutableSuitObject.suit = instance;
    return instance
  },
    () => {
      const { height } = box.current.getBoundingClientRect();
      const h = height / 5;
      const t = h > 40 ? (h > 200 ? 200 : 40) : (26)
      setTimeout(() => setEcgHeight(t), 100)
    })
  // useLayoutEffect(() => {
  //   ctg.current && ctg.current.resize()
  //   ecg.current && ecg.current.resize()
  // }, [ecgHeight])
  useCheckNetwork(isOn => ctg.current && (ctg.current.isOn = isOn))

  useImperativeHandle(ref, () => ({
    on(e: string, fn: (...args: any[]) => void) {
      return ctg.current && ctg.current.on(e, fn)
    },
    off(e: string, fn: (...args: any[]) => void) {
      return ctg.current && ctg.current.off(e, fn)
    },
    emit(e: string, ...args: any[]) {
      return ctg.current && ctg.current.emit(e, ...args)
    },
    getSuit() {
      return ctg.current
    }
  }))
  const canvasStyles: React.CSSProperties = { position: 'absolute' }
  return (
    <div style={{ width: '100%', height: '100%' }} ref={box} {...others} onContextMenu={e => {
      e.preventDefault()
      e.stopPropagation()
      console.log(e)
      return false
    }}
      onMouseEnter={() => staticType && setShowBtns(true)}
      onMouseLeave={() => staticType && setShowBtns(false)}
    >
      {
        loading && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#fff', zIndex: 1, opacity: .9 }}>
            <Loading style={{ margin: 'auto', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} />
          </div>
        )
      }
      <div style={{ height: ecgHeight && showEcg ? `calc(100% - ${ecgHeight}px)` : `100%`, position: 'relative' }} ref={ctgBox}>
        <canvas style={canvasStyles} ref={canvasgrid} />
        <canvas style={canvasStyles} ref={canvasline} />
        <canvas style={canvasStyles} ref={canvasdata} />
        <canvas style={canvasStyles} ref={canvasselect} />
        <canvas style={canvasStyles} ref={canvasanalyse} />
        {/* <FancyCanvas style={{ position: 'absolute' }}>
          <Line />
          <Rect />
        </FancyCanvas> */}
      </div>
      {
        ecgHeight && showEcg && (
          <div style={{ height: ecgHeight, overflow: 'hidden' }} >
            <Ecg data={data} onReady={e => ecg.current = e} />
          </div>
        )
      }
      <ScrollBar box={box} getBarTool={tool => { barTool.current = tool }} />
      {
        suitType > 100 && <ButtonTools ctg={ctg} visible={showBtns && staticType} />
      }
    </div>
  );
})
