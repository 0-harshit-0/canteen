import React, {useState} from 'react';
import {productsData} from '../components/items.js';
import {Nav} from '../components/header.js';
import {Cart} from '../components/cart.js';


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
        <p>{props.des}</p>
        <select name="size" className="productSize">
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
        <input defaultValue="0" type="number" name="count" className="productQuant" />
        <button className="bi" onClick=
        {
          ()=> {
            let temp = document.querySelectorAll(".productQuant")[props.id-1];
            props.setCount(props.count+parseInt(temp.value))
          }
        }>
          Add to Cart
        </button>
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
            return <ProductCard key={i} id={z.id} name={z.name} des={z.des} price={z.price}
                    count={props.count} setCount={props.setCount} />
          }
          return 0;
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
      <Products searchQuery={query} count={props.count} setCount={props.setCount} />
    </>
  );
}
/*function UpdateCart(props) {
  
  return (
    <>
      
    </>
  );
}*/

function Home(props) {
  return (
    <>
      <Nav />
      <FilterProducts count={props.count} setCount={props.setCount} />
      <Cart cartLen={props.count} />
    </>
  );
}

export {Home};
