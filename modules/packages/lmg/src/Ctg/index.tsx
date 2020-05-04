import React, { forwardRef, Ref, useImperativeHandle, useRef, useState, memo } from 'react';
import Ecg from "../Ecg";
import { Canvas, Div, Drawer, IProps } from "../interface";
import ScrollBar from '../ScrollBar';
import { IBarTool } from '../ScrollBar/useScroll';
import { useCheckNetwork } from '../services/WsService';
import useDraw from "../useDraw";
// import { ButtonTools } from "./ButtonTools";
import ContextMenu from "./ContextMenu";
import { Loading } from './Loading';
import { Suit } from './Suit';
import {ButtonTools} from "./ButtonTools";
import styled from "styled-components";
const Wrapper = styled.div`
  width:100%;
  height:100%;
  .btns{
    display:none
  }
  :hover .btns{
    display:block
  }
`
export default memo(forwardRef((props: IProps, ref: Ref<Suit>) => {
  console.log('suit render');
  
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
  // const [showBtns, setShowBtns] = useState(false)
  // const staticType = suitType > 0

  const rightClickXy = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  console.log('yyyyyyyyyyyyyyyyyy 画')

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
    console.log('yyyyyyyyyyyy--------new', instance)

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

  useImperativeHandle(ref, () => {
    console.log('yyyyyyyyyyyy--------useImperativeHandle', ctg.current)

    return ctg.current
  })
  const canvasStyles: React.CSSProperties = { position: 'absolute' }
  return (
    <Wrapper  ref={box} {...others}
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

      <ContextMenu s={ctg}>
        <ScrollBar box={box} getBarTool={tool => { barTool.current = tool }} />

      </ContextMenu>






      {/* {
        suitType > 100 && <ButtonTools ctg={ctg} visible={showBtns && staticType} />
      } */}
      <ButtonTools data={data} visible={true} ctg={ctg} className={"btns"}/>
    </Wrapper>
  );
})
)
