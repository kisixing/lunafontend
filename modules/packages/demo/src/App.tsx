import { HashRouter } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import React from 'react';
import './App.css';
import Demo from './Demo';
import Layout from './Layout';
import 'antd/dist/antd.css';
const customHistory = createBrowserHistory();
const App: React.FC = () => {
  return (
    <HashRouter >
      <Layout>
        <Demo />
      </Layout>
    </HashRouter>
  );
};

export default App;
