import React from 'react';

import { Switch, Route } from "react-router-dom";

import { WsService } from '@lianmed/lmg'

import Ctg from './Ctg'
import Ecg from './Ecg'
import Partogram from './Partogram'
import Page from './Page'
import request from "@lianmed/request";

const setting = {
  ws_url: "192.168.31.223:8084",
  xhr_url: "192.168.31.223:9987",
  alarm_high: "160",
  alarm_low: "110",
  alarm_on_window: "1",
  alarm_on_sound: "1"
}

request.config({
  prefix:`http://${setting.xhr_url}/api`,
  Authorization:'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTczNDY2MDAyfQ.NWtIOKu61dARucHpTO9Usyb9D9s3rLkuJwGxZL4nHtlC9AAVb6yfz509i0e3sYhbXFBi8HYVV97sm67Rxi0sXA'
})
export default function () {
  const w = new WsService(setting)
  w.dispatch=()=>{}
  w.connect()
  return (
    <>

      <Switch>
        <Route path="/Ctg">
          <Ctg />
        </Route>
        <Route path="/Ecg">
          <Ecg />
        </Route>


        <Route path="/Partogram">
          <Partogram />
        </Route>

        <Route path="/Pages">
          <Page />
        </Route>

      </Switch>
    </>
  );
}