import React, { useState, useEffect } from 'react';
import { fetchPostsIfNeeded } from '../../redux/actions/index';
import Cookie from 'js-cookie';
import sendsvg from '../../assets/svg/send.svg';
import { isNavOpen } from '../nav/Nav';
import default_img from '../../assets/images/cat_0.jpg';
import '../../assets/sass/chat/chatroom.scss';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: [],
      contacts: [],
      selected_contact: null,
      personInfo : null, 
      oriClass: '',
      isContactsOpen: '',
      socket: new WebSocket(`${process.env.REACT_APP_WEBSOCKET}:8080/${Cookie.get('userId')}`, 'echo-protocol'),
    }
    this.messageRef = React.createRef();
    this.connectwebSocket = this.connectwebSocket.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
  }

  componentDidMount() {
    // Hide Chat Info
    document.getElementsByClassName('chatarea')[0].style.display = "none";

    // Subscribe to nav open status determine to show contacts info
    isNavOpen.subscribe(isOpen => {
      this.setState({ isContactsOpen: isOpen });
    });

    if (document.getElementById(`message${this.state.message.length - 1}`)) {
      setTimeout(() =>
        document.getElementById(`message${this.state.message.length - 1}`).classList.add('show')
      );
    }
    // Fetch all contacts 
    this.fetchContacts();
    // Connect to websocket
    this.connectwebSocket();
  }

  componentWillUnmount() {
    document.getElementsByClassName('chatarea')[0].style.display = "block";
  }

  fetchContacts() {
    // Fetch contacts
    this.props.dispatch(fetchPostsIfNeeded(Cookie.get('userId'))).then(res => {
      const contacts = res.postsByPersonId[`${Cookie.get('userId')}`].contacts;
      this.setState({
        contacts: contacts,
        message: contacts[0].message,
        selected_contact: contacts[0].name
      });
    });
  }

  connectwebSocket() {
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
      const receivedMsg = JSON.parse(event.data);
      console.log('receivedMsg is =>', receivedMsg);
      this.setState(prevState => ({
        message: [...prevState.message, receivedMsg]
      }));
    }
  }

  sendMessage() {
    const currentTime = new Date();
    this.state.socket.send(JSON.stringify({
      who_send: Cookie.get('userId'),
      message: this.messageRef.current.value,
      time: currentTime.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      person: this.state.selected_contact
    }));
  }

  selectContact(name, index) {
    this.setState({
      message: this.state.contacts[index].message,
      selected_contact: name
    });
  }

  showPeronalInfo(userInfo) {
    console.log('userInfo is =>', userInfo);
    this.setState({personInfo: userInfo});
  }

  render() {
    const personInfo = this.state.personInfo;
    return (
      <main className="chatroom">
        <section className="chat">
          <aside className={`friend ${this.state.isContactsOpen}`}>
            <a className="each_contact title">Contacts</a>
            {this.state.contacts.map((contact, index) =>
              <a className={`each_contact ${this.state.selected_contact === contact.name ? 'active' : ''}`}
                onClick={this.selectContact.bind(this, contact.name, index)}
                key={contact.name}>
                {contact.name}
              </a>
            )}
          </aside>
          <div className="container">
            <div className="row">
              <div className="col-12 chat_area">
                <div className="message_area">
                  {this.state.message.map(((eachmsg, index) =>
                    <div className="each_message">
                      {eachmsg.who_send !== Cookie.get('userId') && <img className="user_img left" src={default_img} onClick={this.showPeronalInfo.bind(this, eachmsg)} />}
                      <div key={`${eachmsg}_${index}`} className={
                        eachmsg.who_send === Cookie.get('userId') ?
                          `message right ${this.state.oriClass}` :
                          `message lef ${this.state.oriClass}`}
                        id={`message${index}`}
                      >
                        <p className="name">{eachmsg.who_send}</p>
                        <p className="content">{eachmsg.message}</p>
                        <p className="time">{eachmsg.time}</p>
                      </div>
                      {eachmsg.who_send === Cookie.get('userId') && <img className="user_img right" src={default_img} onClick={this.showPeronalInfo.bind(this, eachmsg)} />}
                    </div>
                  ))}
                  {personInfo && (
                    <>
                      <div className="dimScreen_userinfo"></div>
                      <div className="userinfo_modal">
                        <div className="userinfo_area">
                          <img/>
                          <a onClick={() => this.setState({personInfo : null})}>X</a>
                          <p>{personInfo.who_send}</p>
                          <p>{personInfo.job}</p>
                          <p>{personInfo.country}</p>
                          <p>{personInfo.hobby}</p>
                          <p>{personInfo.guide}</p>
                        </div>
                      </div>
                    </>
                  )}
                  
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