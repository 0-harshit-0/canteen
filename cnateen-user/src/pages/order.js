import React, {useState, useEffect} from 'react';
import {Nav} from '../components/header.js';


function OrderCard(props) {
  return(
    <div className="orderCard">
      <section className="orderImg">
        <img loading="lazy" src={props.img} alt="card" />
      </section>
      <section className="orderDetail">
        <span>{props.list}</span>
        <span>Quantity: {props.quant}</span>
        <span>Total: {props.price}₹</span>
      </section>
      <section className="orderOptions">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
          </svg>
        </button>
      </section>
    </div>
  )
}

function OrderCont(props) {
  const [ordersData, setOrdersData] = useState({fetching: true, items: []});

  useEffect(() => {
    if(ordersData.fetching) {
      fetch("http://localhost/canteenBack/getOrders.php").then(res=>{
        res.json().then(d=> {
          //console.log(d)
          setOrdersData({fetching: false, items: d});
        })
      });
    }
  });
  let temp = ordersData.items;

  return(
    <div className="orderCont containers">
    {
      temp.map((z,i)=> <OrderCard key={i} id={z.id} img={z.img} quant={z.quantity} list={z.name} price={z["halfPrice"]*z.quantity} />)
    }
    </div>
  )
}

function Order(props) {
  return(
    <>
      <Nav />
      <OrderCont />
    </>
  );
}

export {Order};
