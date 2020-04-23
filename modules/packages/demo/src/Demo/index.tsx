import React, { useState } from 'react';

import { Switch, Route, Router } from "react-router-dom";

import { WsService } from '@lianmed/lmg'
import { Hooks } from "@lianmed/utils";
import Ctg from './Ctg'
import { Suit } from "@lianmed/lmg/lib/Ctg/Suit";
import CtgPanel from './CtgPanel'
import Ecg from './Ecg'
import Partogram from './Partogram'
import Page from './Page'
import request from "@lianmed/request";
import Analyse from "./Analyse/index";




Suit.option = {
  "fhrcolor1": "#8080ff",
  "fhrcolor2": "#008040",
  "fhrcolor3": "#0080ff",
  "normalarea": "#ff0080",
  "primarygrid": "#400080",
  "print_interval": "20",
  "rule": "#408080",
  "scale": "#ff8000",
  "secondarygrid": "#ff00ff",
  "selectarea": "#8000ff",
  "theme": "#0d47a1",
  "tococolor": "#0000ff"
}

const setting = {
  ws_url: "192.168.123.10:8084",
  xhr_url: "transfer.lian-med.com:9988",
  // xhr_url: "192.168.123.56:9987",
  alarm_high: "160",
  alarm_low: "110",
  alarm_on_window: "1",
  alarm_on_sound: "1"
}

// request.config({
//   prefix: `http://${setting.xhr_url}/api`,
//   Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTczNDY2MDAyfQ.NWtIOKu61dARucHpTO9Usyb9D9s3rLkuJwGxZL4nHtlC9AAVb6yfz509i0e3sYhbXFBi8HYVV97sm67Rxi0sXA'
// })
export default function () {
  const w = new WsService(setting)
  const [ok, setOk] = useState(false)
  // w.dispatch=()=>{}
  w.connect()
  Hooks.useLogin(`http://${setting.xhr_url}/api`, { username: 'admin', password: 'admin' }, () => {
    setOk(true)
  })

  return (
    <>
      {
        ok &&
        <Switch>
          <Route path="/Analyse">
            <Analyse />
          </Route>
          <Route path="/CtgPanel">
            <CtgPanel />
          </Route>
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

      }
    </>

  );
}