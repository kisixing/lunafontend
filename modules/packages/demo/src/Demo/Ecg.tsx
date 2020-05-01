import { WsService } from '@lianmed/lmg';
import Ecg from '@lianmed/lmg/lib/Ecg';
import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';




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
      <div style={{ width: '400px', height: '200px', border: '1px solid red',background:'#fff' }} ref={box}>
        <Ecg data={datacache.get('28-4')} />

      </div>
    </>
  );
}
