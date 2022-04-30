import React, {useState, useEffect} from 'react';
import {Nav} from '../components/header.js';


function OrderCard(props) {
  const navigateToPay = () => {
    window.location.assign("#/pay");
  }
  return(
    <div className="orderCard">
      <section className="orderImg">
        <img loading="lazy" src={props.img} alt="card" />
      </section>
      <section className="orderDetail">
        <span>{props.list}</span>
        <span>Quantity: {props.quant}</span>
        <span>Total: {props.price}₹</span>
        <span>Token: {props.id}</span>
      </section>
      <section className="orderStatus">
        <svg onClick={()=>{navigateToPay()}} xmlns="https://www.w3.org/2000/svg" width="35" height="35" style={{visibility: props.status === 'Order Ready' ? 'visible' : 'hidden'}} fill="currentColor" className="bi bi-qr-code-scan" viewBox="0 0 16 16">
          <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"/>
          <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"/>
          <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"/>
          <path d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"/>
          <path d="M12 9h2V8h-2v1Z"/>
        </svg>
        <span>{props.status}</span>
      </section>
    </div>
  )
}

function OrderCont(props) {
  const [ordersData, setOrdersData] = useState({fetching: true, items: []});

  useEffect(() => {
    if(ordersData.fetching) {
      fetch("https://shinto-tune.000webhostapp.com/getOrders.php").then(res=>{
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
      temp.map((z,i)=> <OrderCard key={i} id={z.id} img={z.img} quant={z.quantity} list={z.name} price={z["halfPrice"]*z.quantity} status={z.orderStatus} />)
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
