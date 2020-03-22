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
    this.setState({imgurl: ImgURL});
    // upload image to backend
    this.props.handleSubmit(Img, 'image');
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

class PersonalData extends React.Component{
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
    this.handleSubmit = this.handleSubmit.bind(this);
    // Form input
    this.nameInput = React.createRef();
    this.countryInput = React.createRef();
    this.genderInput = React.createRef();
    this.jobInput = React.createRef();
    this.hobbyInput = React.createRef();
    this.guideInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(preState => ({
        form : {
          name : this.nameInput.current.value,
          country : this.countryInput.current.value,
          gender: this.genderInput.current.value,
          job: this.jobInput.current.value,
          hobby: this.hobbyInput.current.value,
          guide : this.guideInput.current.value
        }
      }), () => 
      this.props.handleSubmit(this.state.form, 'form')
    );
  }

  render(){
    return(
      <div className="col-12 pt-5 personaldata">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-3 col-form-label text-center">Name</label>
            <div className="col-sm-9 col-9">
              <input className="form-control" type = "text" ref={this.nameInput}/>
            </div>
          </div>
          <div class="form-group row">
            <label className="col-sm-2 col-3 col-form-label text-center">Country</label>
            <div className="col-sm-9 col-9">
              <select class="form-control" ref={this.countryInput}>
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
                <input type="checkbox" value="girl" ref={this.genderInput}/>
                <label>Girl</label>
              </div>
              <div>
                <input type="checkbox" value="boy" ref={this.genderInput}/>
                <label>Boy</label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-3 sol-form-label text-center">Job</label>
            <div className="col-sm-9 col-9">
              <input className="form-control" type = "text" ref={this.jobInput}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-3 sol-form-label text-center">Hobby</label>
            <div className="col-sm-9 col-9">
              <input className="form-control" type = "text" ref={this.hobbyInput}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-3 sol-form-label text-center">Guide</label>
            <div className="col-sm-9 col-9">
              <textarea className="form-control" rows="5" ref={this.guideInput} />
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <input type = "submit" value="Submit" className="btn btn-outline-secondary align-self-center"/>
          </div>
        </form>
      </div>
    );
  }
}

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      personaldata: null,
      image : null,
    }
    this.compRef = React.createRef();
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
  
  handleSubmit(personaldata, datatype){
    switch(datatype){
      case 'form':
        this.setState({personaldata : personaldata},() => this.postData(this.state.personaldata, 'form'));
        break;
      case 'image':
        this.setState({image: personaldata}, () => this.postData(this.state.image, 'image'));
        break;
    }
  }

  postData(data ,type){
    if(type == 'image'){
      // Post images to backend
      let formData = new FormData();
      formData.append('photo', data);
      HttpRequest.uploadImg(`${process.env.REACT_APP_HOSTURL}:8085/uploadimage`, formData)
        .then(data => {
          console.log('returned response is =>',data);
          this.props.history.push('/chatroom');
        });
    } else if(type == 'form'){
      // Post personal data to backend
      HttpRequest.savePersonal(`${process.env.REACT_APP_HOSTURL}:8085/persondata`, data)
        .then(data => {
          console.log('returned response is =>',data);
          this.props.history.push('/chatroom');
        });
    }
  }
  render(){
    return(
      <div ref={this.compRef} className ="chat main">
        <section className="chatarea">
          <div className="container">
            <div className="row justify-content-center">
              <PersonalPicture handleSubmit = {this.handleSubmit}/>
            </div>
            <div className="row justify-content-center">
              <PersonalData handleSubmit = {this.handleSubmit}/>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Chat;