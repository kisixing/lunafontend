import React, { useEffect, useState } from 'react';
import Lmg from '@lianmed/lmg';
import datacache, { useData } from "./useData";




export default function () {
    const [device, setDevice] = useState([])
    useEffect(() => {

        useData(setDevice)

    }, []);

    return (
        <>
            {
                device.length > 1 && device.slice(0, 2).map(({ device_no }) => {
                    return <div key={device_no} style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
                        <Lmg data={datacache[device_no]} />
                    </div>

                })
            }

        </>
    );
}