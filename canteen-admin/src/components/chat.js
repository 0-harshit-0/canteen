import React, {useState} from 'react';
//const LenContext = React.createContext({cartLen:()=>{}});

function Chats(props) {
  return(
    <span className={"chats " + props.type}>{props.msg}</span>
  );
}
function ChatBox(props) {
  return (
    <>
      <div className="chatDialogue">
        {
          props.chatJSON.map((z,i)=> <Chats key={i} type={z.type} msg={z.msg} />)
        }
      </div>
    </>
  );
}
function ChatOption(props) {
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
    formData.append('msgs', JSON.stringify(itemData));

    fetch("http://localhost/canteenBack/websocket.php", {
      method: "post",
      body: formData
    }).then((res)=> {
      res.text().then(d=> {
        console.log(d)
      });
    });
  };

  return (
    <>
      <div className="chatOptions">
        <input type="text" name="text" id="textBox" />
        <button className="sendBtn bi" onClick={
          ()=>{
            clearInterval(props.inter);
            addItem();
            props.getChat();
          }
        }>send</button>
      </div>
    </>
  );
}
function Chat() {
  const [chatJSON, setChat] = useState([{no:0, type:"recv", msg:"Hello, how can we help you?"}]);
  
  const getChat = () => {
    let temp = chatJSON.concat([]);
    fetch("http://localhost/canteenBack/websocket.php").then((res)=> {
      res.json().then(d=> {
        console.log(d, temp);
        if(!d) return;
        if(d.no === temp[temp.length-1].no) return;
        temp.push(d);
        setChat(temp);
      });
    });
  }

  let inter = setTimeout(()=> {
    getChat();
    //temp.push({type:"recv", msg:"recieved"});
  }, 3000);

  return (
    <>
      <div className="chatCont">
        <ChatBox chatJSON={chatJSON} />
        <ChatOption getChat={getChat} inter={inter} />
      </div>
    </>
  );
}
export {Chat};