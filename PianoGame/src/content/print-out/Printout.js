import React from 'react';
import { ThemeContext, themes } from './theme-context';
import pianoSheet from './Printlist';
import '../../assets/sass/global/global.scss';
import '../../assets/sass/printout/printout.scss';
import $ from 'jquery';
import jQuery from 'jquery';

/* Context */
class ThemedButton extends React.Component {
    render() {
      let props = this.props;
      let theme = this.context;
      return (
        <button
          {...props}
          style={{backgroundColor: theme.background}}
        />
      );
    }
}
ThemedButton.contextType = ThemeContext; 

function Toolbar(props){
    return (
        <ThemedButton onClick={props.onClick}>
            Search
        </ThemedButton>
    )
}


class UpLoad extends React.Component {
    constructor(props){
        super(props)
        this.textInput = null;
        this.nameInput = React.createRef();
        this.youtubeInput = React.createRef();
        this.setTextInputRef = (element) => {
            this.textInput = element;
        }
        this.clickTextInput = () => {
            // click the text input using the raw DOM API
            if(this.textInput){
                this.textInput.click();
            }
        }
        this.handleFile = this.handleFile.bind(this);
    }
    handleFile(event){
        const files = event.target.files;
        const newpeices = {
            "name" : this.nameInput.current.value,
            "src" : URL.createObjectURL(files[0]),
            "youtubesrc" : this.youtubeInput.current.value,
        }
        this.props.uploadImg(newpeices);
        this.nameInput.current.value = '';
        this.youtubeInput.current.value = '';
    }
    render(){
        return(
            <div className="row justify-content-center mb-5 upload">
                <div className="col-md-8 text-center">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Name</label>
                            <input ref={this.nameInput} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlYoutube">Youtube Link</label>
                            <input ref={this.youtubeInput} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Describe your pecies</label>
                            <textarea className="form-control" rows="5"></textarea>
                        </div>
                    </form>
                    <input type="file" ref={this.setTextInputRef} onChange={this.handleFile} style={{display:'none'}}/>
                    <button type="button" className="btn btn-dark" onClick = {this.clickTextInput}>Upload</button>
                </div>
            </div>
        )
    }
}
class LinkArea extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            youtubesrc : ''
        }
    }
    componentDidMount(){
        this.setState({youtubesrc : "https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"})
    }
    componentWillReceiveProps(){
        this.setState({youtubesrc: this.props.youtubesrc});
    }
    render(){
        const youtubesrc = this.state.youtubesrc;
        return(
            <div className="row justify-content-center mb-5 link show-on-scroll"> 
                <div className="col-md-8 text-center">
                    <iframe src = {youtubesrc}></iframe>
                    <h4>Vedio</h4>
                </div>
            </div>
        )
    }
}
class PrintOut extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme : themes.light,
            searchFocus : false,
            images : pianoSheet,
            youtubesrc : '',
        }
        this.toggleTheme = this.toggleTheme.bind(this);
        this.searchList = this.searchList.bind(this);
        this.focus = this.focus.bind(this);
        this.showLink = this.showLink.bind(this);
        this.textInput = React.createRef();
        this.uploadImg = this.uploadImg.bind(this);
        this.loop = this.loop.bind(this);
    }
    componentDidMount(){
        this.loop();
    }
    componentDidUpdate(){
        this.loop();
    }
    componentWillUnmount(){
        const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        cancelAnimationFrame(this.loop);   
    }
    loop(){
        const scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};
        var elementsToShow = document.querySelectorAll('.show-on-scroll');
        Array.prototype.forEach.call(elementsToShow, function(element){
            if (isElementInViewport(element)) {
                console.log('isElementInViewport is =>', isElementInViewport(element));
              element.classList.add('is-visible');
            } else {
              element.classList.remove('is-visible');
            }
        });
        scroll(this.loop);
        // Helper function from: http://stackoverflow.com/a/7557433/274826
        function isElementInViewport(el) {
            // special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
              el = el[0];
            }
            var rect = el.getBoundingClientRect();
            return (
              (rect.top <= 0 && rect.bottom >= 0) ||
              (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
              (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            );
        }
    }
    toggleTheme(){
        this.setState(state => ({
            theme: state.theme === themes.dark? themes.light : themes.dark,
        }));
    }
    searchList(){
        console.log('search!');
        console.log('textInput is =>', this.textInput.current.value.length);
        //console.log('geted point is =>', $(`.${this.textInput.current.value}`).length);
        this.textInput.current.focus();
        setTimeout(() => {
            if(`.${this.textInput.current.value}`){
                $('.piano').hide();
                $(`.${this.textInput.current.value}`).show();
            } else {
                $('.piano').show();
            }
        }, 500);
    }
    focus(){
        this.setState({
            searchFocus : true
        })
    }
    showLink(youtubesrc){
        console.log('youtubesrc is =>', youtubesrc);
        this.setState({youtubesrc: youtubesrc});
    }
    uploadImg(newpeices){
        console.log('2. newpeices is =>', newpeices);
        const newImages = this.state.images.slice();
        newImages.push(newpeices);
        this.setState({images : newImages});
    }
    render(){
        let youtubesrc = this.state.youtubesrc;
        return(
            <div className ="printout main">
                <section className="pieces">
                    <div className="container">
                        <div className="row justify-content-center mb-5 pb-5">
                            <input onChange={this.searchList} ref={this.textInput}/>
                            <ThemeContext.Provider value={this.state.theme}>
                                <Toolbar onClick = {() => {this.toggleTheme(); this.searchList()}}/>
                            </ThemeContext.Provider>
                        </div>
                        <div className="row">
                            {
                                this.state.images.map((eachitem, index) => {
                                    return(
                                        <div key={eachitem.name} 
                                            className={`col-md-4 text-center pb-5 piano ${eachitem.name} show-on-scroll`}
                                            onClick={this.showLink.bind(this, eachitem.youtubesrc)}>
                                            <img src={eachitem.src}/>
                                            <div className="mt-3">{eachitem.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                <section className="linkupload">
                    <div className="container">
                        <LinkArea youtubesrc = {youtubesrc}/>
                        <UpLoad uploadImg = {this.uploadImg}/>
                    </div>
                </section>
            </div>
        )
    }
    
}

export default PrintOut;