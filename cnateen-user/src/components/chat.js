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
  const addItem = (m) => {
    let itemData = {
      from: "user",
      msg: m
    };
    var formData = new FormData();
    formData.append('msgs', JSON.stringify(itemData));

    fetch("https://shinto-tune.000webhostapp.com/websocket.php", {
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
            let v = document.querySelector("#textBox").value;
            addItem(v);
            props.getChat(v);
            document.querySelector("#textBox").value = '';
          }
        }>send</button>
      </div>
    </>
  );
}
function Chat() {
  const [chatJSON, setChat] = useState([{type:"recv", msg:"Hello, how can we help you?"}]);
  const [dis, setDis] = useState("hiddenChat");

  const getChat = (m) => {
    clearTimeout(inter);
    let temp = chatJSON.concat([]);
    if (m) {
      temp.push({type:"sent", msg:m});
    }
    fetch("https://shinto-tune.000webhostapp.com/websocket.php?from=user").then((res)=> {
      res.json().then(d=> {
        //console.log(d);
        if(!d) return;
        //if(d.no === temp[temp.length-1].no) return;
        d.forEach(z=> {
          /*z.from === "admin" && */temp.push({type:"recv", msg:z.msg});
        })
        setChat(temp);
      });
    });
  }

  let inter = setTimeout(()=> {
    getChat();
    //temp.push({type:"recv", msg:"recieved"});
  }, 5000);

  return (
    <>
      <div className={dis}>
        <ChatBox chatJSON={chatJSON} />
        <ChatOption getChat={getChat} />
      </div>
      <button className="chatButton" onClick=
        {
          ()=> {
            clearTimeout(inter);
            setDis(dis==="hiddenChat"? "chatCont":"hiddenChat")
          }
        }>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>{/*
        <span className="chatCount">{len}</span>*/}
      </button>
    </>
  );
}
export {Chat};