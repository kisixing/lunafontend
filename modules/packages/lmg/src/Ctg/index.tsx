import React, { forwardRef, Ref, useImperativeHandle, useRef, memo, useState } from 'react';
import Ecg from "../Ecg";
import { Canvas, Div, Drawer, IProps } from "../interface";
import ScrollBar from '../ScrollBar';
import { IBarTool } from '../ScrollBar/useScroll';
import { useCheckNetwork } from '../services/WsService';
import useDraw from "../useDraw";
import { ButtonTools } from "./ButtonTools";
import ContextMenu from "./ContextMenu";
import { Loading } from './Loading';
import { Suit } from './Suit';
import styled from "styled-components";
import { MultiParam } from "./MultiParam";
const Wrapper = styled.div`
  width:100%;
  height:100%;
  display:flex;
  .btns{
    display:none
  }
  :hover .btns{
    display:block
  }
  .bar {
    opacity:0;
    transition:opacity 0.5s;
  }
  :hover .bar{
    opacity:1
  }
  .box {
    flex:1
  }
`
export default memo(forwardRef((props: IProps, ref: Ref<Suit>) => {

  const {
    data,
    mutableSuitObject = { suit: null },
    suitType = 0,
    loading = false,
    onReady = (s: Drawer) => { },
    audios,
    isFullscreen,
    ...others
  } = props
  // data.ecgdata = { bloodOxygen: 80, bloodPress: '120/120/120', heartRate: 80, respRate: 40, pulseRate: 80, temperature: 37 }
  const ismulti = false || (data && data.ismulti)
  const [ctgReady, setCtgReady] = useState(false)
  const isV3 = false || (data && (data.deviceType === 'V3'))

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
  // const [ecgHeight, setEcgHeight] = useState(0)
  // const [showBtns, setShowBtns] = useState(false)
  // const staticType = suitType > 0

  const rightClickXy = useRef<{ x: number, y: number }>({ x: 0, y: 0 });


  useDraw(data, ctgBox, () => {
    const instance = ctg.current = new Suit(
      canvasgrid.current,
      canvasdata.current,
      canvasline.current,
      canvasselect.current,
      canvasanalyse.current,
      ctgBox.current,
      barTool.current,
      suitType,
      {}
    )

    onReady(instance)
    mutableSuitObject.suit = instance;
    setCtgReady(true)
    return instance
  },
    () => {
      // const { height } = box.current.getBoundingClientRect();
      // const h = height / 5;
      // const t = h > 40 ? (h > 120 ? 210 : 40) : (26)
      // setEcgHeight(t)
    })
  // useLayoutEffect(() => {
  //   ctg.current && ctg.current.resize()
  //   ecg.current && ecg.current.resize()
  // }, [ecgHeight])
  useCheckNetwork(isOn => ctg.current && (ctg.current.isOn = isOn))

  useImperativeHandle(ref, () => {
    return ctg.current
  }, [ctgReady])
  const canvasStyles: React.CSSProperties = { position: 'absolute' }
  return (
    <Wrapper style={{ flexDirection: isFullscreen ? 'row' : 'column-reverse' }}>
      {
        <MultiParam data={data} isFullScreen={isFullscreen} />
      }
      <div className="box" ref={box} {...others}
        onMouseDownCapture={e => {
          const x = e.nativeEvent.offsetX
          const y = e.nativeEvent.offsetY
          const which = e.nativeEvent.which
          if (which === 3) {
            rightClickXy.current.x = x
            rightClickXy.current.y = y
          }
        }}

      // onMouseEnter={() => staticType && setShowBtns(true)}
      // onMouseLeave={() => staticType && setShowBtns(false)}
      >
        {
          loading && (
            <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#fff', zIndex: 1, opacity: .9 }}>
              <Loading style={{ margin: 'auto', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} />
            </div>
          )
        }
        <div style={{ height: isV3 ? 0 : ((isFullscreen && ismulti) ? `calc(100% - 210px)` : '100%'), position: 'relative', maxHeight: isFullscreen ? 500 : 'unset' }} ref={ctgBox}>
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
          ismulti && (isV3 || isFullscreen) && (
            <div style={{ height: isV3 ? `100%` : (isFullscreen ? 210 : 0), overflow: 'hidden' }} >
              <Ecg isFullscreen={isFullscreen} data={data} onReady={e => ecg.current = e} />
            </div>
          )
        }

        <ContextMenu s={ctg}>
          <ScrollBar box={box} getBarTool={tool => { barTool.current = tool }} />

        </ContextMenu>

        {
          audios && <ButtonTools audios={audios} data={data} visible={true} ctg={ctg} className={"btns"} />
        }

      </div>

    </Wrapper >
  );
})
)
