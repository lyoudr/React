import React from 'react';
import {ChatList} from './chatlist';
import { HttpRequest } from '../../services/http-service/httpService';
import '../../assets/sass/chat/chat.scss';

/* Form */
class PersonalPicture extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chatlist : ChatList, 
      imgsrc: null,
      imgurl: null
    }
    this.UploadRef = React.createRef();
    this.selectImg = this.selectImg.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
  }
  selectImg(){
    this.UploadRef.current.click();
  }
  uploadImg() {
    //append image to <img/>
    let Img = this.UploadRef.current.files[0];
    let ImgURL = URL.createObjectURL(Img);
    this.setState({
      imgurl: ImgURL,
      imgsrc: Img
    }); 
  }
  render(){
    const chatimg = this.state.chatlist[0].src
    return(
      <div className="col-12 text-center picture" onClick={this.selectImg}>
        {this.state.imgurl ? 
          (<img src={this.state.imgurl} alt="..." className="img-fluid"/>) :
          (<img src={chatimg} alt="..." className="img-fluid"/>)
        }
        <input onChange={this.uploadImg} ref={this.UploadRef} type="file"/>
      </div>
    )
  }
}

class PersonalInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      form : {
        name : '',
        country : '',
        gender: '',
        job: '',
        hobby: '',
        guide : ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event){
    let name = event.target.name;
    let value = event.target.value;
    if(name === 'gender'){
      if(value === this.state.form.gender){
        value = '';
      }
    }
    this.setState(state => ({
        form: {
          ...state.form,
          [name] : value
        }
      }), () => console.log('this.state.form is =>', this.state.form)
    )
  }
  render(){
    return(
      <React.Fragment>
        <div className="form-group row">
          <label className="col-sm-2 col-3 col-form-label text-center">Name</label>
          <div className="col-sm-9 col-9">
            <input 
              className="form-control" 
              type = "text" 
              name="name"
              value={this.state.form.name}
              onChange={this.handleInputChange}/>
          </div>
        </div>
        <div class="form-group row">
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
          <div className="col-sm-9 col-9">
            <div>
              <input type="checkbox" name="gender" checked={this.state.form.gender === 'girl'} value="girl" onChange={this.handleInputChange} />
              <label>Girl</label>
            </div>
            <div>
              <input type="checkbox" name="gender" checked={this.state.form.gender === 'boy'} value="boy" onChange={this.handleInputChange} />
              <label>Boy</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-3 sol-form-label text-center">Job</label>
          <div className="col-sm-9 col-9">
            <input className="form-control" name = "job" type = "text" onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-3 sol-form-label text-center">Hobby</label>
          <div className="col-sm-9 col-9">
            <input className="form-control" name = "hobby" type = "text" onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-3 sol-form-label text-center">Guide</label>
          <div className="col-sm-9 col-9">
            <textarea className="form-control" name = "guide" rows="5" onChange={this.handleInputChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      personalinfo: null,
      image : null,
    }
    this.compRef = React.createRef();
    this.personalInfoRef = React.createRef();
    this.personalPhotoRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this);
  }
  componentDidUpdate(){
    if(this.props.fullComp == true){
      this.compRef.current.classList.add('fullComp');
    } else {
      this.compRef.current.classList.remove('fullComp');
    }
  }
  
  handleSubmit(){
    const personalInfo = this.personalInfoRef.current.state.form;
    const personalPhoto = this.personalPhotoRef.current.state.imgsrc;
    this.setState({
      personalinfo : personalInfo,
      image : personalPhoto
    }, () => {
      this.postData(this.state.image, 'uploadImg', '/uploadimage');
      this.postData(this.state.personalinfo, 'savePersonal', '/persondata');
    });
  }

  postData(data ,type, url){
    let formData = new FormData();
    formData.append('photo', data);
    HttpRequest[`${type}`](`${process.env.REACT_APP_HOSTURL}${url}`, type === 'uploadImg' ? formData : data)
      .then(data => {
        console.log('returned response is =>',data);
        this.props.history.push('/chatroom');
      });
  }

  render(){
    return(
      <div ref={this.compRef} className ="chat main">
        <section className="chatarea">
          <div className="container">
            <div className="row justify-content-center">
              <PersonalPicture ref={this.personalPhotoRef}/>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 ptinfo">
                <form>
                  <PersonalInfo ref={this.personalInfoRef}/>
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
      </div>
    )
  }
}

export default Chat;