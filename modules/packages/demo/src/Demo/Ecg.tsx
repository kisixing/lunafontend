import Ecg from '@lianmed/lmg/lib/Ecg';




import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Ctg } from '@lianmed/lmg';
import { Button } from 'antd';
import { WsService } from '@lianmed/lmg'
export default function () {

  const box = useRef<HTMLDivElement>(null)
  const [datacache, setDatacache] = useState(new Map());

  const fullScreen = () => {
    const el = box.current as HTMLDivElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }


  useEffect(() => {
   
    WsService._this.getDatacache().then(datacache=>{
      setDatacache(datacache)
      console.log('datacache',datacache)
    })
    return () => {
    }
  }, []);
  return (
    <>

    <Button onClick={fullScreen}>
      全屏
    </Button>
      <div style={{ width: '800px', height: '200px', border: '1px solid red',background:'#fff' }} ref={box}>
        <Ecg data={datacache.get('17-4')} />

      </div>
    </>
  );
}
