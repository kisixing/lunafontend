import React from 'react';

import { Switch, Route } from "react-router-dom";

import { WsService } from '@lianmed/lmg'

import Ctg from './Ctg'
import Ecg from './Ecg'
import Partogram from './Partogram'
import request from "@lianmed/request";

const setting = {
  ws_url: "localhost:8084",
  xhr_url: "192.168.0.152:9986",
  alarm_high: "160",
  alarm_low: "110",
  alarm_on_window: "1",
  alarm_on_sound: "1"
}

request.config({
  prefix:`http://${setting.xhr_url}/api`,
  Authorization:'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTcwNjIxMjQzfQ.HIwzGbdwyYCe47xCngUGeaaJgZNKkr0Wx9yjrUU-HiWdzlVOuTZtcc29MXoEfamoft4pLKPH3qxDBQfcPVVA5g'
})
export default function () {
  const w = new WsService(setting)
  w.dispatch=()=>{}
  w.connect()
  return (
    <div>

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

      </Switch>
    </div>
  );
}