import React, { useEffect, useState } from 'react';
import Ecg from '@lianmed/lmg/lib/Ecg';




export default function () {


    return (
        <div style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
        <Ecg />
      </div>
    );
}