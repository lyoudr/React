import React ,{ Suspense, lazy} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthService from './services/auth-service/AuthService';
import ShowNav from './shared/ShowNav';
import './index.scss';

// Route-based code splitting => Lazy Loading
const Loading = lazy(() => import('./shared/Loading'));
const Login = lazy(() => import('./content/login/Login'));
const Nav = lazy(() => import('./content/nav/Nav'));
const Chat = lazy(() => import('./content/chat/chat'));
const PianoGame = lazy(() => import('./content/piano-game/PianoGame'));
const PrintOut = lazy(() => import('./content/print-out/Printout'));
const Courses = lazy(() => import('./content/courses/Course'));
const ChatRoom = lazy(() => import('./content/chat/chatroom'));
const ShopList = lazy(() => import('./content/shop-list/shoplist'));
const SearchRestaurant = lazy (() => import('./content/search-restaurant/search_restaurant'));

class SecretRoute extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated : false,
        }
        this.openSidebar = this.openSidebar.bind(this);
        this.navChild = React.createRef();
    }
    openSidebar(){
        this.navChild.current.openSideBar();
    }
    render(){
        const Component = this.props.component;
        return(
            <Route render = {(props) =>(
                AuthService.isAuthenticated === true
                ? 
                <React.Fragment>
                    <Nav 
                        ref={this.navChild}
                    />
                    <ShowNav 
                        openSidebar={this.openSidebar}/>
                    <Component {...props}/>                        
                </React.Fragment>
                : <Redirect to = {{
                    pathname: '/login',
                    state: {from : props.location}
                }}/>
            )} />
        )
    }
}



class App extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <Suspense  fallback={<div> Loading ...</div>}>
                <Switch> 
                    <Route path = "/login" component = {Login}/>
                    <SecretRoute exact path = "/chat" component = {Chat}/>
                    <SecretRoute path='/chat/chatroom' component={ChatRoom}/>
                    <SecretRoute path = "/pianogame" component = {PianoGame}/>
                    <SecretRoute path = "/printout" component = {PrintOut}/>
                    <SecretRoute path = "/courses" component = {Courses}/>
                    <SecretRoute path= "/chatroom" component = {ChatRoom}/>
                    <SecretRoute path = "/shoplist" component = {ShopList}/>
                    <SecretRoute path = "/search-restaurant" component = {SearchRestaurant}/>
                </Switch>
            </Suspense>   
        )
    }
}


export default App
