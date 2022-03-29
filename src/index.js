import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';

import {Home} from './pages/home.js';
import {Contact} from './pages/contact.js';
import {Order} from './pages/order.js';

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

