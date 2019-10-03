import React from 'react';

import { Switch, Route } from "react-router-dom";


import Ctg from './Ctg'
import Ecg from './Ecg'
import Partogram from './Partogram'


export default function () {


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