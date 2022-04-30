import React, {useState, useEffect} from 'react';
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
        <img loading="lazy" src={props.base64} alt="momo" />
      </section>
      <section className="productInfo">
        <h3>{props.name}</h3>
        <p>{props.des}</p>
        {/*<select name="size" className="productSize">
          <option value="half">half: ₹{props.price[0]}</option>
          <option value="full">full: ₹{props.price[1]}</option>
        </select>*/}
        <span className="productsPrice">Price: ₹{props.price[0]}</span>
        <input defaultValue="0" min="0" type="number" name="count" className="productQuant" />
        <button className="bi" onClick=
        {
          ()=> {
            let temp = props.json;
            let quantitiy = parseInt(document.querySelectorAll(".productQuant")[props.n].value);
            let tempPrice = props.price[0]*quantitiy;
            if (temp.length) {
              for (var i = 0; i < temp.length; i++) {
                let z = temp[i];
                if(z.id === props.id) {
                  z.quant += quantitiy;
                  z.price += tempPrice;
                  break;
                }else if (i === temp.length-1) {
                  temp.push({id: props.id, img:props.base64, list: props.name, price: tempPrice, quant: quantitiy});
                  break;
                }
              }
            }else if (temp.length <= 0) {
              temp.push({id: props.id, img:props.base64, list: props.name, price: tempPrice, quant: quantitiy});
            }
            
            props.setJson({cartData:temp});

          }
        }>
          Add to Cart
        </button>
      </section>
    </div>
  );
}
function Products(props) {
  const [productsData, setProductsData] = useState({fetching: true, items: []});

  useEffect(() => {
    if(productsData.fetching) {
      fetch("https://shinto-tune.000webhostapp.com/getItems.php?inStock=true").then(res=>{
        res.json().then(d=> {
          setProductsData({fetching: false, items: d});
        })
      });
    }
  });
  let temp = productsData.items;
  /*if(props.searchQuery === "") {
    se = "abcdefghijklmnopqrstuvwxyz";
  }else {
    se = props.searchQuery;
  }*/
  return(
    <div className="containers productCont">
      {
        temp.map((z, j) => {
          let tempReg = z.name.match(new RegExp(props.searchQuery, "i"));
          if(tempReg) {
            return <ProductCard key={j} n={j} id={z.id} base64={z.img} name={z.name} des={z.description} price={[z.halfPrice]}
                    inStock={z.inStock} json={props.json} setJson={props.setJson} />
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
      <Products searchQuery={query} json={props.json} setJson={props.setJson} />
    </>
  );
}


function Home(props) {
  return (
    <>
      <Nav />
      <FilterProducts json={props.json} setJson={props.setJson} />
    </>
  );
}

export {Home};
