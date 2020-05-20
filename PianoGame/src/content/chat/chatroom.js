import React, { useState, useEffect } from 'react';
import {fetchPostsIfNeeded} from '../../redux/actions/index';
import Cookie from 'js-cookie';
import sendsvg from '../../assets/svg/send.svg';
import { isNavOpen } from '../nav/Nav';
import '../../assets/sass/chat/chatroom.scss';

class ChatRoom extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      message : [],
      oriClass : '',
      contacts : [],
      isContactsOpen : '',
      socket : new WebSocket(`${process.env.REACT_APP_WEBSOCKET}:8080/${Cookie.get('userId')}`, 'echo-protocol')
    }
    this.messageRef = React.createRef();
  }

  componentDidMount(){
    // Hide Chat Info
    document.getElementsByClassName('chatarea')[0].style.display = "none";
    
    // Subscribe to nav open status determine to show contacts info
    isNavOpen.subscribe(isOpen => {
      this.setState({isContactsOpen: isOpen});
    });
    
    // Fetch contacts
    this.props.dispatch(fetchPostsIfNeeded('ann')).then(res => 
      this.setState({contacts: res.postsByPersonId.ann.contacts})
    );

    if (document.getElementById(`message${this.state.message.length - 1}`)) {
      setTimeout(() =>
        document.getElementById(`message${this.state.message.length - 1}`).classList.add('show')
      );
    }
    
    // Connection open
    this.state.socket.onopen = () => {
      console.log('connect on websocket');
      return () => {
        this.state.socket.close();
        console.log('close websocket!');
      }
    }
    // Error occured
    this.state.socket.onerror = (error) => {
      console.log(`Web Socket error => ${error}`);
    }
    // Listen for messages
    this.state.socket.onmessage = (event) => {
      let receivedMsg = JSON.parse(event.data);
      let newtime = new Date().toUTCString();
      receivedMsg.time = newtime;
      console.log('receivedMsg is =>', receivedMsg);
      this.setState(prevState => ({
        message: [...prevState.message, receivedMsg]
      }));
    }
  }

  componentWillUnmount(){
    document.getElementsByClassName('chatarea')[0].style.display = "block";
  }

  sendMessage(){
    this.state.socket.send(JSON.stringify({
      nameId: Cookie.get('userId'),
      message: this.messageRef.current.value,
      person: 'John'
    }))
  }

  render(){
    return (
      <main className="chatroom">
        <section className="chat">
          <aside className={`friend ${this.state.isContactsOpen}`}>
            <a className="each_contact title">Contacts</a>
            {this.state.contacts.map(contact => 
              <a className="each_contact" key={contact}>{contact.name}</a>
            )}
          </aside>
          <div className="container">
            <div className="row">
              <div className="col-12 chat_area">
                <div className="message_area">
                  {this.state.message.map(((eachmsg, index) =>
                    <div key={eachmsg} className={
                      eachmsg.nameId === Cookie.get('userId') ?
                        `message right ${this.state.oriClass}` :
                        `message lef ${this.state.oriClass}`}
                      id={`message${index}`}
                    >
                      <p className="name">{eachmsg.nameId}</p>
                      <p className="content">{eachmsg.message}</p>
                      <p className="time">{eachmsg.time}</p>
                    </div>
                  ))}
                </div>
                <div className="message_typing">
                  <input ref={this.messageRef}></input>
                  <a className="send" onClick={this.sendMessage.bind(this)}>
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
}

export default ChatRoom;