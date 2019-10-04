import React, { useEffect, useState } from 'react';
import { Ctg } from '@lianmed/lmg';
import { useData } from './useData';

export default function() {
  const [device, setDevice] = useState<
    Array<{
      beds: Array<any>;
      device_no: number;
    }>
  >([]);
  const [datacache, setDatacache] = useState(new Map());
  useEffect(() => {
    useData(setDevice).then(data => setDatacache(data));
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

      <div style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
        <Ctg data={datacache.get('1-1')} />
      </div>
    </>
  );
}
