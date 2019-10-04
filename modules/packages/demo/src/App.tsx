import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './App.css';
import Demo from './Demo';
import Layout from './Layout';
import 'antd/dist/antd.css';
const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Demo />
      </Layout>
    </Router>
  );
};

export default App;
