import React, { useState, lazy } from 'react';
import { ChatList } from './chatlist';
import { HttpRequest } from '../../services/http-service/httpService';
import '../../assets/sass/chat/chat.scss';
import { Switch, Route } from 'react-router-dom';
import ChatRoom from './container/chatrommcontainer';
import Cookie from 'js-cookie';
import '../../assets/sass/global/global.scss';

/* PersonalPicture Hook */
const PersonalPicture = ({ setImg }) => {
  // Declare a new state variable
  const [imgurl, setImgUrl] = useState(null);
  const chatlist = ChatList;
  // Create uploadRef
  const uploadRef = React.createRef();

  const selectImg = () => {
    uploadRef.current.click();
  }

  const uploadImg = () => {
    // append image to <img/>
    let Img = uploadRef.current.files[0];
    console.log('Img is =>', Img);
    let ImgURL = URL.createObjectURL(Img);
    console.log('ImgURL is =>', ImgURL);
    setImgUrl(ImgURL);
    setImg(Img);
  }

  return (
    <div className="col-5 col-md-3 text-center picture" onClick={selectImg}>
      {imgurl ?
        (<img src={imgurl} alt="..." className="img-fluid" />) :
        (<img src={chatlist[0].src} alt="..." className="img-fluid" />)
      }
      <input onChange={uploadImg} ref={uploadRef} type="file" />
    </div>
  )
};

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        country: '',
        gender: '',
        job: '',
        hobby: '',
        guide: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'gender') {
      if (value === this.state.form.gender) {
        value = '';
      }
    }
    this.setState(state => ({
      form: {
        ...state.form,
        [name]: value
      }
    }))
  }
  render() {
    return (
      <React.Fragment>
        <div className="form-group row">
          <label className="col-sm-2 col-3 col-form-label text-center">Name</label>
          <div className="col-sm-9 col-9">
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.form.name}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-3 col-form-label text-center">Country</label>
          <div className="col-sm-9 col-9">
            <select className="form-control" name="country" value={this.state.form.country} onChange={this.handleInputChange}>
              <option value="USA">USA</option>
              <option value="Taiwan" defaultChecked>Taiwan</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>
        <div className="form-group row justify-content-start checkbox">
          <label className="col-sm-2 col-3 col-form-label text-center">Gender</label>
          <div className="col-sm-9 col-9 gender_choice">
            <div>
              <input type="checkbox" name="gender" checked={this.state.form.gender === 'girl'} value="girl" onChange={this.handleInputChange} />
              <label className="sex">Girl</label>
            </div>
            <div>
              <input type="checkbox" name="gender" checked={this.state.form.gender === 'boy'} value="boy" onChange={this.handleInputChange} />
              <label className="sex">Boy</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-3 col-form-label text-center">Job</label>
          <div className="col-sm-9 col-9">
            <input className="form-control" name="job" type="text" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-3 col-form-label text-center">Hobby</label>
          <div className="col-sm-9 col-9">
            <input className="form-control" name="hobby" type="text" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-3 col-form-label text-center">Guide</label>
          <div className="col-sm-9 col-9">
            <textarea className="form-control" name="guide" rows="5" onChange={this.handleInputChange} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/* Form */
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personalinfo: null,
      image: null,
    }
    this.compRef = React.createRef();
    this.personalInfoRef = React.createRef();
    this.personalPhotoRef = React.createRef();
    this.setImg = this.setImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this);
  }
  componentDidUpdate() {
    if (this.props.fullComp === true) {
      this.compRef.current.classList.add('fullComp');
    } else {
      this.compRef.current.classList.remove('fullComp');
    }
  }
  setImg(Img) {
    this.setState({ image: Img });
  }
  handleSubmit() {
    const personalInfo = this.personalInfoRef.current.state.form;
    personalInfo.userId = Cookie.get('userId');
    this.setState({
      personalinfo: personalInfo,
    }, () => {
      this.postData(this.state.image, 'uploadImg', '/uploadimage');
      this.postData(this.state.personalinfo, 'savePersonal', '/persondata');
    });
  }
  postData(data, type, url) {;
    let formData = new FormData();
    formData.append('photo', data);
    let images_info = {};
    images_info.formData = formData;
    images_info.userId = Cookie.get('userId');
    HttpRequest[`${type}`](`${process.env.REACT_APP_HOSTURL}${url}`, type === 'uploadImg' ? images_info : data)
      .then(data => {
        this.props.history.push('/chat/chatroom');
      });
  }
  render() {
    return (
      <div ref={this.compRef} className="chat main">
        <section className="chatarea">
          <div className="container">
            <div className="row justify-content-center">
              <PersonalPicture setImg={this.setImg} />
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <p className="notify">Please upload your profile, and enter your basic info. After you filling out the form, please click "Submit" to enter to chat room.</p>
                <form className="personalInfo">
                  <PersonalInfo ref={this.personalInfoRef} />
                </form>
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <button className="btn btn-outline-secondary align-self-center" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </section>
        <Switch>
          <Route path='/chat/chatroom' component={ChatRoom} />
        </Switch>
      </div>
    )
  }
}

export default Chat;