import React, { useState, useEffect } from 'react';
import { fetchPostsIfNeeded } from '../../redux/actions/index';
import { HttpRequest } from '../../services/http-service/httpService';
import { isNavOpen } from '../nav/Nav';
import Cookie from 'js-cookie';
import sendsvg from '../../assets/svg/send.svg';
import trash_can from '../../assets/icon/trash.svg';
import default_img from '../../assets/images/cat_0.jpg';
import '../../assets/sass/chat/chatroom.scss';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: [],
      contacts: [],
      selected_contact: null, // selected friend to chat with
      person_info : null, 
      user_img : null,
      friend_img: null,
      ori_class: '',
      is_contacts_open: '',
      socket: new WebSocket(`${process.env.REACT_APP_WEBSOCKET}:8080/${Cookie.get('userId')}`, 'echo-protocol'),
    }
    this.messageRef = React.createRef();
    this.connectwebSocket = this.connectwebSocket.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
    this.fetchImage = this.fetchImage.bind(this);
  }

  componentDidMount() {
    // Hide Chat Info
    document.getElementsByClassName('chatarea')[0].style.display = "none";

    // Subscribe to nav open status determine to show contacts info
    isNavOpen.subscribe(isOpen => {
      this.setState({ is_contacts_open: isOpen });
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

  // Fetch friends
  fetchContacts() {
    // Fetch contacts
    this.props.dispatch(fetchPostsIfNeeded(Cookie.get('userId'))).then(res => {
      const contacts = res.postsByPersonId[`${Cookie.get('userId')}`].contacts;
      this.setState({
        contacts: contacts,
        message: contacts[0].message,
        selected_contact: contacts[0].name
      }, 
      () => {
        this.fetchImage(Cookie.get('userId'), 'user_img');
        this.fetchImage(this.state.selected_contact,'friend_img');
      });
    });
  }

  // Fetch friend and self images
  fetchImage(user, state){
    // Get self image or friend image
    HttpRequest.fetchImage(`${process.env.REACT_APP_HOSTURL}/user_image/`, user)
      .then(url => this.setState({[state]: url}));
  }

  // Connect to WebSocket
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

  // Send messages via websocket
  sendMessage() {
    const currentTime = new Date();
    this.state.socket.send(JSON.stringify({
      who_send: Cookie.get('userId'),
      message: this.messageRef.current.value,
      time: currentTime.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      person: this.state.selected_contact
    }));
  }

  // choose friend to chat
  selectContact(name, index) {
    this.setState({
      message: this.state.contacts[index].message,
      selected_contact: name
    }, () => this.fetchImage(this.state.selected_contact, 'friend_img'));
  }

  // click on photo to show details about person
  showPeronalInfo(userInfo) {
    this.setState({person_info: userInfo});
  }

  // delete message
  deleteMessage(info, index){
    const delete_info = {
      who_send: info.who_send, 
      who_receive: info.who_receive, 
      message: info.message, 
      time: info.time
    };
    HttpRequest.deleteMessage(`${process.env.REACT_APP_HOSTURL}/delete_msg`, delete_info)
      .then(res => {
        if(res.status === 'ok' && res.isDeleted === 'yes'){
          this.setState(state => {
            state.message[index]['isDeleted'] = true;
            return state;
          })
        }
      });
  }

  render() {
    const person_info = this.state.person_info;
    return (
      <main className="chatroom">
        <section className="chat">
          <aside className={`friend ${this.state.is_contacts_open}`}>
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
                    <div key={`message_${index}`} className={`each_message ${eachmsg.isDeleted ? 'hide': ''}`}>
                      {eachmsg.who_send !== Cookie.get('userId') && <img className="friend_img left" src={this.state.friend_img} onClick={this.showPeronalInfo.bind(this, eachmsg)} />}
                      <div key={`${eachmsg}_${index}`} className={
                        eachmsg.who_send === Cookie.get('userId') ?
                          `message right ${this.state.ori_class}` :
                          `message lef ${this.state.ori_class}`}
                        id={`message${index}`}
                      >
                        <p className="name">{eachmsg.who_send}</p>
                        <p className="content">{eachmsg.message}</p>
                        <p className="time">{eachmsg.time}</p>
                        <a className="delete" onClick={this.deleteMessage.bind(this, eachmsg, index)}>
                          <img src={trash_can}/>
                        </a>
                      </div>
                      {eachmsg.who_send === Cookie.get('userId') && <img className="user_img right" src={this.state.user_img} onClick={this.showPeronalInfo.bind(this, eachmsg)} />}
                    </div>
                  ))}
                  {person_info && (
                    <>
                      <div className="dimScreen_userinfo"></div>
                      <div className="userinfo_modal">
                        <div className="userinfo_area">
                          <img/>
                          <a onClick={() => this.setState({person_info : null})}>X</a>
                          <p>{person_info.who_send}</p>
                          <p>{person_info.job}</p>
                          <p>{person_info.country}</p>
                          <p>{person_info.hobby}</p>
                          <p>{person_info.guide}</p>
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