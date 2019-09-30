import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from 'react';
import './App.css';
import Demo from './Demo';
import 'antd/dist/antd.css';
const App: React.FC = () => {
  return (
    <Router >
           <nav>
          <ul>
            <li>
              <Link to="/Ctg">Ctg</Link>
            </li>
            <li>
              <Link to="/Ecg">Ecg</Link>
            </li>
            <li>
              <Link to="/Partogram">Partogram</Link>
            </li>
          </ul>
        </nav>
      <Demo />
    </Router>
  );
};

export default App;
