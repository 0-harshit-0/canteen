import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Nav} from './components/header.js';
import {SearchBar} from './components/search.js';
import {Products} from './components/items.js';
import './index.css';

function FilterProducts(props) {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchBar setQuery={setQuery} />
      <br />
      <Products searchQuery={query} />
    </>
  );
}
function App(props) {
  return (
    <>
      <Nav />
      <br />
      <FilterProducts />
    </>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

