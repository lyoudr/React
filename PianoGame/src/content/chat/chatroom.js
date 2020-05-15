import React, { useState, useEffect } from 'react';
import {fetchPostsIfNeeded} from '../../redux/actions/index';
import Cookie from 'js-cookie';
import sendsvg from '../../assets/svg/send.svg';
import '../../assets/sass/chat/chatroom.scss';

const ChatRoom = (props) => {
  const messageRef = React.createRef();

  const [message, setMessage] = useState([]);
  const [oriClass, setClass] = useState('');
  const [socket, setSocket] = useState(new WebSocket(`${process.env.REACT_APP_WEBSOCKET}:8080`, 'echo-protocol'));
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts
    props.dispatch(fetchPostsIfNeeded('ann')).then(res => setContacts(res.postsByPersonId.ann.contacts));
    if (document.getElementById(`message${message.length - 1}`)) {
      setTimeout(() =>
        document.getElementById(`message${message.length - 1}`).classList.add('show')
      );
    }
    // Connection open
    socket.onopen = () => {
      console.log('connect on websocket');
      return () => {
        socket.close();
        console.log('close websocket!');
      }
    }
    // Error occured
    socket.onerror = (error) => {
      console.log(`Web Socket error => ${error}`);
    }
    // Listen for messages
    socket.onmessage = (event) => {
      let receivedMsg = JSON.parse(event.data);
      let newtime = new Date().toUTCString();
      receivedMsg.time = newtime;
      setMessage(oldmsg => [...oldmsg, receivedMsg]);
    }
  });

  const sendMessage = () => {
    socket.send(JSON.stringify({
      nameId: Cookie.get('userId'),
      message: messageRef.current.value
    }))
  }
  return (
    <main className="chatroom">
      <section className="chat">
        <div className="container">
          <div className="row">
            <aside className="col-4 friend">
              {contacts.map(contact => 
                <div key={contact}>{contact.name}</div>
              )}
            </aside>
            <div className="col-8 chat_area">
              <div className="message_area">
                {message.map(((eachmsg, index) =>
                  <div className={
                    eachmsg.nameId === Cookie.get('userId') ?
                      `message right ${oriClass}` :
                      `message lef ${oriClass}`}
                    id={`message${index}`}
                  >
                    <p className="name">{eachmsg.nameId}</p>
                    <p className="content">{eachmsg.message}</p>
                    <p className="time">{eachmsg.time}</p>
                  </div>
                ))}
              </div>
              <div className="message_typing">
                <input ref={messageRef}></input>
                <a className="send" onClick={sendMessage}>
                  <img src={sendsvg} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )

}

export default ChatRoom;