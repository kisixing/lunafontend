import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Ctg } from '@lianmed/lmg';
import { useData } from './useData';
import { Suit } from "@lianmed/lmg/lib/Ctg/Suit";
import { Button } from 'antd';
export default function () {

  const box = useRef<HTMLDivElement>(null)
  const [datacache, setDatacache] = useState(new Map());

  const suitObject: { suit: Suit | any } = { suit: null };
  const fullScreen = () => {
    const el = box.current as HTMLDivElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }
  const fullScreenEvent = useCallback(() => {suitObject.suit.resize() }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', fullScreenEvent);
    useData(() => { }).then(data => setDatacache(data));
    return () => {
      document.removeEventListener('fullscreenchange', fullScreenEvent);
    }
  }, []);
  return (
    <>
      {/* {device.slice(0, 2).map(({ beds, device_no }) => {
        return beds.map(({ bed_no }) => {
          if (bed_no !== 1) {
            return null;
          }
          return (
            <div
              key={device_no + '-' + bed_no}
              style={{ width: '1000px', height: '400px', border: '1px solid red' }}
            >
              <Ctg data={datacache.get(device_no + '-' + bed_no)} />
            </div>
          );
        });
      })} */}
    <Button onClick={fullScreen}>
      全屏
    </Button>
      <div style={{ width: '1000px', height: '400px', border: '1px solid red',background:'#fff' }} ref={box}>
        <Ctg data={datacache.get('0-1')} mutableSuitObject={suitObject} />

      </div>
    </>
  );
}
