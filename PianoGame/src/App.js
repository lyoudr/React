import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthService from './services/auth-service/AuthService';
import ShowNav from './shared/components/ShowNav';
import ErrorBoundary from './services/errorboundary-service/ErrorBoundary';
import Cookie from 'js-cookie';
import './index.scss';

// Route-based code splitting => Lazy Loading
const Login = lazy(() => import('./content/login/Login'));
const Nav = lazy(() => import('./content/nav/Nav'));
const Chat = lazy(() => import('./content/chat/chat'));
const PianoGame = lazy(() => import('./content/piano-game/PianoGame'));
const PrintOut = lazy(() => import('./content/print-out/Printout'));
const Courses = lazy(() => import('./content/courses/Course'));
const ShopList = lazy(() => import('./content/shop-list/shoplist'));
const ShopItems = lazy(() => import('./content/shop-list/comp/ShopItems'));
const SearchRestaurant = lazy(() => import('./content/search-restaurant/search_restaurant'));

class SecretRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
    }
    this.openSidebar = this.openSidebar.bind(this);
    this.navChild = React.createRef();
  }
  openSidebar() {
    this.navChild.current.openSideBar();
  }
  render() {
    const Component = this.props.component;
    return (
      <Route render={(props) => (
        AuthService.isAuthenticated === true || Cookie.get('userId')
          ?
          <React.Fragment>
            <Nav
              ref={this.navChild}
            />
            <ShowNav
              openSidebar={this.openSidebar} />
            <Component {...props} />
          </React.Fragment>
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
          }} />
      )} />
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <ErrorBoundary>
        <Switch>
          <Route path="/login" component={Login} />
          <SecretRoute path="/chat" component={Chat} />
          <SecretRoute path="/pianogame" component={PianoGame} />
          <SecretRoute path="/printout" component={PrintOut} />
          <SecretRoute path="/courses" component={Courses} />
          <SecretRoute path="/shoplist" component={ShopList} />
          <SecretRoute path="/shop-items" component={ShopItems}/>
          <SecretRoute path="/search-restaurant" component={SearchRestaurant} />
        </Switch>
      </ErrorBoundary>
    )
  }
}


export default App
