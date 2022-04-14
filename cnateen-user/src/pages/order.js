import React, {useState} from 'react';
import {Nav} from '../components/header.js';
import {Cart} from '../components/cart.js';


let orderjson = [
  {
    id: 0,
    list: ['Momos', 'Momos', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 1,
    list: ['Momos1', 'Momos1', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  }
];

function OrderCard(props) {
  let handleJSON = (id) => {
    orderjson = orderjson.filter(z => z.id !== id);
    props.setJson(orderjson)
  }
  return(
    <div className="orderCard">
      <section className="orderImg">
        <img loading="lazy" src={require("../assets/momo.jpg")} alt="card" />
      </section>
      <section className="orderDetail">
        <span>{props.list.reduce((curr, prev)=> {return prev+' '+curr}, (''))}</span>
        <span>Total: {props.price[0]}₹</span>
      </section>
      <section className="orderOptions">
        <button id="deleteOrder" onClick={()=> {handleJSON(props.id)}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
        </button>
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
  const [json, setJson] = useState(orderjson);
  return(
    <div className="orderCont containers">
    {
      json.map((z,i)=> <OrderCard key={i} id={z.id} list={z.list} price={z.price} setJson={setJson} />)
    }
    </div>
  )
}

function Order(props) {
  return(
    <>
      <Nav />
      <OrderCont />
      <Cart cartLen={props.count} />
    </>
  );
}

export {Order};
