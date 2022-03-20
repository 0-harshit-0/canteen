import React, {useState} from 'react';
import {Nav} from '../components/header.js';
import {SearchBar} from '../components/search.js';
import {Products} from '../components/items.js';

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
function Home(props) {
  return (
    <>
      <Nav />
      <br />
      <FilterProducts />
    </>
  );
}

export {Home};
