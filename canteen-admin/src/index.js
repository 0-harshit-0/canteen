import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Routes, Route} from "react-router-dom";
import './index.css';

import {Chat} from './components/chat.js';
import {Home} from './pages/home.js';
import {Order} from './pages/order.js';

/*// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:12345/canteenBack/websocket.php');

// Listen for error
socket.addEventListener('error', function (e) {
  console.log(e);
});

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);
});

// Listen for close
socket.addEventListener('close', function (event) {
  console.log('closing server ');
});*/

function App(props) {

  return (
    <>
      <Chat />
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="order" element={<Order />} />
        </Routes>
      </HashRouter>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

