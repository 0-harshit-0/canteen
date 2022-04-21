import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';

import {Home} from './pages/home.js';
import {Order} from './pages/order.js';

function App(props) {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

