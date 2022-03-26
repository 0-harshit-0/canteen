import React, {useState} from 'react';
import {productsData} from '../components/items.js';
import {Nav} from '../components/header.js';


function SearchBar(props) {
  return(
    <div className="containers searchBarCont">
        <input type="search" name="search" id="search" placeholder="search" onChange={(e)=>props.setQuery(e.target.value)} />
    </div>
  );
}

function ProductCard(props) {
  return (
    <div className="productCard">
      <section className="productImg">
        <img loading="lazy" src={require("../assets/momo.jpg")} alt="momo" />
      </section>
      <section className="productInfo">
        <h3>{props.name}</h3>
        <span>Small</span>
        <span className="price">{props.small}₹</span>
        <span>Medium</span>
        <span className="price">{props.medium}₹</span>
        <span>Large</span>
        <span className="price">{props.large}₹</span>
      </section>
    </div>
  );
}
function Products(props) {
  return(
    <div className="containers productCont">
      {
        productsData.map((z, i) => {
          if(z.name.match(new RegExp(props.searchQuery, "i")) && z.in_stock) {
            return <ProductCard key={i} name={z.name} small={z.small_price} medium={z.medium_price} large={z.large_price} />
          }
          return '';
        })
      }
    </div>
  );
}

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
      <FilterProducts />
    </>
  );
}

export {Home};
