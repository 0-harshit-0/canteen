import React, {useState, useEffect} from 'react';
import {Nav} from '../components/header.js';


function OrderCard(props) {/*
  const [status, setStatus] = useState("Start Working");*/

  const delOrder = async (id) => {
    if (props.status !== "Order Ready") return 0;
    let res = await fetch(`https://shinto-tune.000webhostapp.com/removeOrder.php?id=${id}`);
    let resjson = await res.text();
    console.log(resjson);
  };
  const updateOrder = async (id, value) => {
    let res = await fetch(`https://shinto-tune.000webhostapp.com/updateOrders.php?id=${id}&value=${value}`);
    let resjson = await res.text();
    console.log(resjson);
  };

  const checkStatus = (id) => {
    switch (props.status) {
      case "In Queue":
        if(window.confirm("do you want to start working?")) {
          updateOrder(id, "Getting Ready");
          //setStatus("Order Ready");
        }
        break;
      case "Getting Ready":
        if(window.confirm("you sure order is complete?")) {
          updateOrder(id, "Order Ready");
          //setStatus("Delete Order");
        }
        break;
      case "Order Ready":
        if(window.confirm("you sure order is delivered?")) {
          delOrder(id);
          window.location.reload();
        }
        break;
      default:
        window.location.reload();
        break;
    }
    window.location.reload();
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
        <span>Token: {props.id}</span>
      </section>
      <section className="orderStatus">
        <button id="deleteOrder" className="bi" onClick={()=> {checkStatus(props.id)}}>
          {props.status}
        </button>
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
      temp.map((z,i)=> <OrderCard key={i} id={z.id} img={z.img} list={z.name} price={z.halfPrice} quant={z.quantity} status={z.orderStatus} />)
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
