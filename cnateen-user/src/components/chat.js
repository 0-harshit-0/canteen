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
  return (
    <>
      <div className="chatOptions">
        <input type="text" name="text" id="textBox" />
        <button className="sendBtn bi" onClick={
          ()=>{
            clearInterval(props.inter);
            let temp = props.chatJSON.concat([]);
            temp.push({type:"sent", msg:document.querySelector("#textBox").value});
            props.setChat(temp);
          }
        }>send</button>
      </div>
    </>
  );
}
function Chat() {
  const [chatJSON, setChat] = useState([{type:"recv", msg:"Hello, how can we help you?"}]);

  let inter = setTimeout(()=> {
    let temp = chatJSON.concat([]);
    temp.push({type:"recv", msg:"recieved"});
    setChat(temp);
  }, 30000);

  return (
    <>
      <div className="chatCont">
        <ChatBox chatJSON={chatJSON} />
        <ChatOption chatJSON={chatJSON} setChat={setChat} inter={inter} />
      </div>
    </>
  );
}
export {Chat};