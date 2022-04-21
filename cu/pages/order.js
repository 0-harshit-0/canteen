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
      <section className="orderStatus">
        <span>In Queue</span>
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
