import React, { useRef, useLayoutEffect, useState } from 'react';
import { Suit } from './Suit';
import { IBarTool } from '../ScrollBar/useScroll';
import ScrollBar from '../ScrollBar';
import Ecg from "../Ecg";
import { IProps, Canvas, Div, Drawer } from "../interface";
import useDraw from "../useDraw";
import Loading from './Loading'
export default (props: IProps) => {
  const {
    data,
    mutableSuitObject = { suit: null },
    itemHeight = 0,
    suitType = 0,
    showEcg = false,
    loading = false,
    onReady = (s: Drawer) => { },
    ...others
  } = props
  let barTool: IBarTool;
  const canvasgrid = useRef<Canvas>(null);
  const canvasdata = useRef<Canvas>(null);
  const canvasline = useRef<Canvas>(null);
  const canvasselect = useRef<Canvas>(null);
  const canvasanalyse = useRef<Canvas>(null);
  const box = useRef<Div>(null);
  const ctgBox = useRef<Div>(null);
  const suit = useRef<Drawer>(null)
  const [ecgHeight, setEcgHeight] = useState(50)


  useDraw(data, box, () => {
    const instance = suit.current = new Suit(
      canvasgrid.current,
      canvasdata.current,
      canvasline.current,
      canvasselect.current,
      canvasanalyse.current,
      ctgBox.current,
      barTool,
      suitType
    )
    onReady(instance)
    mutableSuitObject.suit = instance;
    return instance
  },
    () => {
      const { height } = box.current.getBoundingClientRect()
      height > 500 ? setEcgHeight(200) : setEcgHeight(50)
    })

  useLayoutEffect(() => {
    suit.current && suit.current.resize()
  }, [ecgHeight])
  const canvasStyles: React.CSSProperties = { position: 'absolute' }
  return (
    <div style={{ width: '100%', height: '100%' }} ref={box} {...others}>
      {
        loading && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#fff', zIndex: 1, opacity: .8 }}>
            <Loading style={{ margin: 'auto', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} />
          </div>
        )
      }
      <div style={{ height: showEcg ? `calc(100% - ${ecgHeight}px)` : `100%`, position: 'relative' }} ref={ctgBox}>
        <canvas style={canvasStyles} ref={canvasgrid} />
        <canvas style={canvasStyles} ref={canvasline} />
        <canvas style={canvasStyles} ref={canvasdata} />
        <canvas style={canvasStyles} ref={canvasselect} />
        <canvas style={canvasStyles} ref={canvasanalyse} />
      </div>
      {
        showEcg && <div style={{ height: ecgHeight, overflow: 'hidden' }} >
          <Ecg data={data} />
        </div>
      }
      <ScrollBar
        box={box}
        getBarTool={tool => {
          barTool = tool;
        }}
      />
    </div>
  );
};
