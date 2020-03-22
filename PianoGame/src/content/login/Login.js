import React from 'react';
import AuthService from '../../services/auth-service/AuthService';
import { Redirect } from 'react-router-dom';
import user from '../../assets/images/user.jpg'
import QueueAnim from '../../../node_modules/rc-queue-anim';
import '../../assets/sass/global/global.scss';
import '../../assets/sass/login/login.scss';

// Login Component
class Login extends React.Component {
    constructor(props){
        super(props)
        this.userIdRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {redirectToPreviousRoute: false}
        this.login = this.login.bind(this);
    }
    //2. 點擊 login 後，會設定 redirectToPreviousRoute 為 true
    async login(){
        const userInfo ={
            userId : this.userIdRef.current.value,
            password : this.passwordRef.current.value
        }
        AuthService.login(userInfo)
            .then(() => {
                this.setState({redirectToPreviousRoute : true});
            });
    };

    render() {
        const { from } = this.props.location.state || { from : { pathname: "/" }};
        const  redirectToPreviousRoute  = this.state.redirectToPreviousRoute ;

        //3. 當 redirectToPreviousRoute 為 true，路由會導向 from (也就是 PianoGame) 的那頁
        if(redirectToPreviousRoute) {
            return <Redirect to={'/chat'}/>
        }
        //1. 初始化的 redirectToPreviousRoute 為 false，會 render 以下區塊，讓使用者可以點擊 Log in 按鈕
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8 text-center">
                        <QueueAnim interval={100} delay={1000} duration={1000} type="top">
                            <div key="1" className="mt-5">
                                <img src={user} style={{borderRadius : 50 + '%'}}/>
                            </div>
                        </QueueAnim>
                        <QueueAnim interval={100} delay={1000} duration={2000} type="left">
                            <div key="1" className="input-group mt-5">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Name</span>
                                </div>
                                <input ref={this.userIdRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            <div key="2" className="input-group mt-5">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Password</span>
                                </div>
                                <input ref={this.passwordRef} type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            <button key="3" className="btn btn-secondary mt-5" onClick={this.login}>Log in</button>
                        </QueueAnim>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;