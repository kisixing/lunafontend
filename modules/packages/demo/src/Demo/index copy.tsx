import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Lmg from '@lianmed/lmg';
import Ecg from '@lianmed/lmg/lib/Ecg';
import Partogram from '@lianmed/lmg/lib/Partogram';
import { PartogramTable } from "@lianmed/components";
import datacache, { useData } from "./useData";




export default function App() {
  const [device, setDevice] = useState([])
  const [mes, setMes] = useState('');
  const [state, setState] = useState(false)
  useEffect(() => {

    useData(setDevice)

  }, []);

  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>


        <Switch>
          <Route path="/about">
          {
            device.length > 1 && device.slice(0, 2).map(({ device_no }) => {
              return <div key={device_no} style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
                <Lmg data={datacache[device_no]} />
              </div>

            })
          }
          </Route>
          <Route path="/users">
          <div style={{ width: '1000px', height: '400px', border: '1px solid red' }}>
            <Ecg />
          </div>
          </Route>
          <Route path="/">
          <div style={{ width: '100%', height: '900px', border: '1px solid red' }}>
            <Partogram />
            <PartogramTable />
          </div>
          </Route>
        </Switch>
      </div>
  );
}