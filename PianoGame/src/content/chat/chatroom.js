import React, { useState, useEffect } from 'react';
import {fetchPostsIfNeeded} from '../../redux/actions/index';
import Cookie from 'js-cookie';
import sendsvg from '../../assets/svg/send.svg';
import { isNavOpen } from '../nav/Nav';
import '../../assets/sass/chat/chatroom.scss';

const ChatRoom = (props) => {
  const messageRef = React.createRef();

  const [message, setMessage] = useState([]);
  const [oriClass, setClass] = useState('');
  const [socket, setSocket] = useState(new WebSocket(`${process.env.REACT_APP_WEBSOCKET}:8080`, 'echo-protocol'));
  const [contacts, setContacts] = useState([]);
  const [isContactsOpen, setopenContacts] = useState('');

  useEffect(() => {
    // Hide Chat Info
    document.getElementsByClassName('chatarea')[0].style.display = "none";
    
    // Subscribe to nav open status determine to show contacts info
    isNavOpen.subscribe(isOpen => {
      console.log('isOpen is =>', isOpen);
      setopenContacts(isOpen)
    });
    
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
    return () => {
      document.getElementsByClassName('chatarea')[0].style.display = "block";
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
        <aside className={`friend ${isContactsOpen}`}>
          <a className="each_contact title">Contacts</a>
          {contacts.map(contact => 
            <a className="each_contact" key={contact}>{contact.name}</a>
          )}
        </aside>
        <div className="container">
          <div className="row">
            <div className="col-12 chat_area">
              <div className="message_area">
                {message.map(((eachmsg, index) =>
                  <div key={eachmsg} className={
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