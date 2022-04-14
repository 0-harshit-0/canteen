import React, {useState} from 'react';
//const LenContext = React.createContext({cartLen:()=>{}});


let cartjson = [
  {
    id: 0,
    list: ['Momos', 'Momos', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 1,
    list: ['Momos1', 'Momos1', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 2,
    list: ['Momos', 'Momos', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 3,
    list: ['Momos1', 'Momos1', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 4,
    list: ['Momos', 'Momos', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 5,
    list: ['Momos1', 'Momos1', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 6,
    list: ['Momos', 'Momos', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 7,
    list: ['Momos1', 'Momos1', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 8,
    list: ['Momos', 'Momos', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  },
  {
    id: 9,
    list: ['Momos1', 'Momos1', 'Momos', 'Momos', 'Momos'],
    price: ['300']
  }
];

function CartDialogueCards(props) {
  const handleJSON = (id) => {
    cartjson = cartjson.filter(z => z.id !== id);
    props.setJson(cartjson)
  }
  return(
    <div className="cartCard">
      <section className="cartImg">
        <img loading="lazy" src={require("../assets/momo.jpg")} alt="card" />
      </section>
      <section className="cartDetail">
        <span>{props.list.reduce((curr, prev)=> {return prev+' '+curr}, (''))}</span>
        <span>Total: {props.price[0]}₹</span>
      </section>
      <section className="cartOptions">
        <button id="deletecart" onClick={()=> {handleJSON(props.id)}}>
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

function CartDialogue(props) {
  const [json, setJson] = useState(cartjson);

  const placeOrder = async () => {
    var formData = new FormData();
    formData.append('orders', JSON.stringify(json));

    let res = await fetch("http://localhost/canteenBack/placeOrders.php", {
      method: "post",
      body: formData
    });
    let resjson = await res.text();
    console.log(resjson);
  };

  return(
    <div className={props.dis}>
      <div className="itemCard">
        {
          json.map((z,i)=> <CartDialogueCards key={i} id={z.id} list={z.list} price={z.price} setJson={setJson} />)
        }
      </div>

      <div className="amountCard">
        <section className="cartCard cartAmountDetail">
          <span>Total Amount (Including Taxes) </span>
          <span>₹
            {
              json.reduce((prev, curr)=> prev+parseInt(curr.price), 0)
            }
          </span>
        </section>
        <button className="cartCard cartOrderBtn bi" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  )
}


function Cart(props) {
  const [dis, setDis] = useState("hiddenCart");

	return (
    <>
    <CartDialogue dis={dis} />
		<button className="cartButton" onClick={()=> {
      setDis(dis==="hiddenCart"? "cartDialogue":"hiddenCart")
    }}>
  		<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
	      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
	    </svg>
	    <span className="cartCount">{props.cartLen ?? 0}</span>
    </button>
    </>
	);
}

export {Cart};