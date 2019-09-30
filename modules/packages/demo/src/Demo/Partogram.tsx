import React, { useEffect, useState } from 'react';
import Partogram from '@lianmed/lmg/lib/Partogram';
import { PartogramTable } from "@lianmed/components";



export default function () {

    return (
        <div style={{ width: '100%', height: '500px', border: '1px solid red' }}>
        <Partogram />
        <PartogramTable url="api/prenatal-visits" />
      </div>
    );
}