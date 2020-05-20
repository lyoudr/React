import React, { lazy } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../../redux/actions/index';
import ShopDetials from './containers/ShopDetail';
import {HttpRequest} from '../../services/http-service/httpService';
import '../../assets/sass/shoplist/shoplist.scss';

// Lazy load cartcollections
const CartCollections = lazy(() => import('./containers/CartContainer'));

class ShopList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      price_range : ['100 ~ 500', '500 ~ 1000', '1000 ~ 1500']
    }
    this.searchRef = React.createRef();
    this.compRef = React.createRef();
    this.searchItem = this.searchItem.bind(this);
    this.choosePrice = this.choosePrice.bind(this);
  }
  /* Avoid Reconciliation => Optimizing Performance */
  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.cart !== nextProps.cart || this.props.postsBysearchText !== nextProps.postsBysearchText){
  //     return true; // if return true, react will re-render component and update DOM.
  //   }
  //   return false; // if return false, react won't re-render component and update DOM.
  // }
  componentDidUpdate() {
    if (this.props.fullComp == true) {
      this.compRef.current.classList.add('fullComp');
    } else {
      this.compRef.current.classList.remove('fullComp');
    }
  }
  async searchItem() {
    const searchText = this.searchRef.current.value;
    // post search text to server to get results
    this.props.dispatch(fetchPosts(searchText));
  }
  choosePrice(price_range){
    HttpRequest.choosePrice(`${process.env.REACT_APP_HOSTURL}/shop_price`, price_range)
      .then(data => console.log('data is =>', data));
  }
  render() {
    return (
      <div ref={this.compRef} className="shoplist main">
        <section className="shopselect">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-10 col-md-8">
                <div>
                  <input type="text" ref={this.searchRef} />
                  <button onClick={this.searchItem}>Search</button>
                  <button>
                    <div>{this.props.cart.length}</div>
                    <Link to='/shoplist/cart'>Cart</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-7 col-md-8">
              {this.state.price_range.map(price => 
                <a key={price} onClick={this.choosePrice.bind(this, price)}>{price}</a>)}
              </div>
              <div className="col-3 col-md-8">
                <a>ASC</a>
                <a>DESC</a>
              </div>
            </div>
          </div>
        </section>
        <section className="shopdetails">
          <div className="container">
            <div className="row">
              <ShopDetials />
            </div>
          </div>
        </section>
        <Switch>
          <Route path='/shoplist/cart' component={CartCollections} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    postsBysearchText: state.postsBysearchText,
    cart: state.cart
  })
};

export default connect(
  mapStateToProps
)(ShopList);
