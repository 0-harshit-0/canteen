import React, {useState, useEffect} from 'react';
import {Nav} from '../components/header.js';


function AddItemForm(props) {
  const encodeImageFileAsURL = (element) => {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      document.querySelector("#base").value = reader.result;
    }
    reader.readAsDataURL(file);
  }
  const addItem = (n, d, i, p) => {
    let itemData = {
      img: i,
      name: n,
      des: d,
      hp: p,
      fp: p,
      in: true
    };
    var formData = new FormData();
    formData.append('insertData', JSON.stringify(itemData));

    fetch("http://localhost/canteenBack/addItem.php", {
      method: "post",
      body: formData
    }).then((res)=> {
      res.text().then(d=> {
        console.log(d)
      });
    });
  };

  return (
    <div className={props.visible}>
      <form id="addItemForm" action="http://localhost/canteenBack/addItem.php" method="post">
        <input type="file" name="image" onChange={(e)=> {encodeImageFileAsURL(e.target)}} />
        <input className="formFields" type="text" name="itemname" id="itemname" placeholder="Item Name" />
        <textarea className="formFields" name="description" id="description" placeholder="Description"></textarea>
        <input className="formFields" type="text" name="base" id="base" placeholder="base" />
        <input className="formFields" type="number" name="price" id="price" placeholder="Price" />
        <button className="bi" onClick={
          (e)=>{
            e.preventDefault();
            const fields = document.querySelectorAll(".formFields");
            addItem(fields[0].value, fields[1].value, fields[2].value, fields[3].value);
            props.setDis(props.dis==="hiddenCart"? "addItemFormCont":"hiddenCart");
            window.location.reload();
          }
        }>SUBMIT</button>
      </form>
    </div>
  );
}

function SearchBar(props) {
  const [dis, setDis] = useState("hiddenCart");

  return(
    <>
      <AddItemForm visible={dis} setDis={setDis} />
      <div className="containers searchBarCont">
          <input type="search" name="search" id="search" placeholder="search" onChange={(e)=>props.setQuery(e.target.value)} />
          <button className="bi" id="addItemBtn" onClick=
          {
            ()=> {
              setDis(dis==="hiddenCart"? "addItemFormCont":"hiddenCart")
            }
          }>ADD NEW ITEM</button>
      </div>
    </>
  );
}

function ProductCard(props) {
  const delItem = async (id) => {
    let res = await fetch(`http://localhost/canteenBack/removeItem.php?id=${id}`);
    let resjson = await res.text();
    console.log(resjson);
  };
  const updateItem = async (id, value) => {
    let res = await fetch(`http://localhost/canteenBack/updateItems.php?id=${id}&value=${value}`);
    let resjson = await res.text();
    console.log(resjson);
  };

  return (
    <div className="productCard">
      <section className="productImg">
        <img loading="lazy" src={props.base64} alt="momo" />
      </section>
      <section className="productInfo">
        <h3>{props.name}</h3>
        <p>{props.des}</p>
        <div className="productsPrice">
          <span>Price: ₹{props.price[0]}</span>
          {/*<span>full price: {props.price[1]}</span>*/}
        </div>
        <div className="productsOptions">
          <label className="instockLabel">
            In-Stock:
            <input className="bi instock" type="checkbox" defaultChecked={props.inStock === "1"? true: false} name="instock" onClick={(e)=>{updateItem(props.id, e.target.checked?"1":"0")}} />
          </label>
          <button className="bi" onClick={()=>{delItem(props.id)}}>
            REMOVE ITEM
          </button>
        </div>
      </section>
    </div>
  );
}
function Products(props) {
  const [productsData, setProductsData] = useState({fetching: true, items: []});

  useEffect(() => {
    if(productsData.fetching) {
      fetch("http://localhost/canteenBack/getItems.php?inStock=false").then(res=>{
        res.json().then(d=> {
          setProductsData({fetching: false, items: d});
        })
      });
    }
  });
  let temp = productsData.items;
  return(
    <div className="containers productCont">
      {

        temp.map((z, i) => {
          if(z.name.match(new RegExp(props.searchQuery, "i"))) {
            return <ProductCard key={i} id={z.id} base64={z.img} name={z.name} des={z.description} price={[z.halfPrice, z.fullPrice]}
                    inStock={z.inStock} count={props.count} setCount={props.setCount} />
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
      <Products searchQuery={query} count={props.count} setCount={props.setCount} />
    </>
  );
}

function Home(props) {
  return (
    <>
      <Nav />
      <FilterProducts count={props.count} setCount={props.setCount} />
    </>
  );
}

export {Home};
