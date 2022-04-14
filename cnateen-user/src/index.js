import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';

import {Home} from './pages/home.js';
import {Contact} from './pages/contact.js';
import {Order} from './pages/order.js';

function App(props) {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home count={count} setCount={setCount} />} />
        <Route path="contact" element={<Contact count={count} />} />
        <Route path="order" element={<Order count={count} />} />
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

