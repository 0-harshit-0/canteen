import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Routes, Route} from "react-router-dom";
import './index.css';

import {Home} from './pages/home.js';
import {Contact} from './pages/contact.js';
import {Order} from './pages/order.js';
import {Cart} from './components/cart.js';

function App(props) {
  const [json, setJson] = useState({cartData:[]});
  return (
    <>
      <Cart json={json.cartData} setJson={setJson} />
      <HashRouter>
        <Routes>
          <Route index element={<Home json={json.cartData} setJson={setJson} />} />
          <Route path="contact" element={<Contact />} />
          <Route path="order" element={<Order />} />
        </Routes>
      </HashRouter>
    </>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);