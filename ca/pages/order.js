import React, {useState, useEffect} from 'react';
import {Nav} from '../components/header.js';


function OrderCard(props) {
  const [status, setStatus] = useState("Start Working");

  const delOrder = async (id) => {
    if (status !== "Delete Order") return 0;
    let res = await fetch(`http://localhost/canteenBack/removeOrder.php?id=${id}`);
    let resjson = await res.text();
    console.log(resjson);
  };

  const checkStatus = (id) => {
    switch (status) {
      case "Start Working":
        if(window.confirm("do you want to start working?")) setStatus("Order Ready");
        break;
      case "Order Ready":
        if(window.confirm("you sure order is complete?")) setStatus("Delete Order");
        break;
      case "Delete Order":
        if(window.confirm("you sure order is delivered?")) {
          delOrder(id);
          window.location.reload();
        }
        
        break;
    }
  }

  return(
    <div className="orderCard">
      <section className="orderImg">
        <img loading="lazy" src={props.img} alt="card" />
      </section>
      <section className="orderDetail">
        <span>{props.list}</span>
        <span>Quantity: {props.quant}</span>
        <span>Total: {props.price*props.quant}₹</span>
      </section>
      <section className="orderStatus">
        <button id="deleteOrder" className="bi" onClick={()=> {checkStatus(props.id)}}>
          {status}
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
      temp.map((z,i)=> <OrderCard key={i} id={z.id} img={z.img} list={z.name} price={z.halfPrice} quant={z.quantity} />)
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
