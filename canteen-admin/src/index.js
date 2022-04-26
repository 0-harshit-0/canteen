import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Routes, Route} from "react-router-dom";
import './index.css';

import {Home} from './pages/home.js';
import {Order} from './pages/order.js';

function App(props) {

  return (
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </HashRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

