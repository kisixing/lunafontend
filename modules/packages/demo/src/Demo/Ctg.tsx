import React, { useEffect, useState } from 'react';
import { Ctg } from '@lianmed/lmg';
import datacache, { useData } from './useData';

export default function() {
  const [device, setDevice] = useState<
    Array<{
      beds: Array<any>;
      device_no: number;
    }>
  >([]);
  useEffect(() => {
    useData(setDevice);
  }, []);

  return (
    <>
      {device.length > 1 &&
        device.slice(0, 2).map(({ beds, device_no }) => {
          return beds.map(({ bed_no }) => {
            return (
              <div
                key={device_no + '-' + bed_no}
                style={{ width: '1000px', height: '400px', border: '1px solid red' }}
              >
                <Ctg data={datacache.get(device_no + '-' + bed_no)} />
              </div>
            );
          });
        })}
    </>
  );
}
