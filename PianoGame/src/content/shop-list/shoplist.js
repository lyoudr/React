import React, { lazy } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { newShopDetail, fetchPosts, showAllItem } from '../../redux/actions/index';
import ShopDetials from './containers/ShopDetail';
import {HttpRequest} from '../../services/http-service/httpService';
import '../../assets/sass/shoplist/shoplist.scss';

// Lazy load cartcollections
const CartCollections = lazy(() => import('./containers/CartContainer'));

class ShopList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      price_range : ['100 ~ 500', '500 ~ 1000', '1000 ~ 1500'],
      selected_price : '100 ~ 500'
    }
    this.searchRef = React.createRef();
    this.compRef = React.createRef();
    this.searchItem = this.searchItem.bind(this);
    this.choosePrice = this.choosePrice.bind(this);
    this.detectInput = this.detectInput.bind(this);
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
    this.props.fetchPosts(searchText);
  }
  choosePrice(price_range){
    this.setState({selected_price: price_range});
    HttpRequest.choosePrice(`${process.env.REACT_APP_HOSTURL}/shop_price`, price_range)
      .then(data => this.props.newShopDetail(data));
  }
  detectInput(e){
    if(e.target.value === ''){
      this.props.showAllItem();
    }
  }
  render() {
    return (
      <div ref={this.compRef} className="shoplist main">
        <section className="shopselect">
          <div className="container">
            <div className="row justify-content-center search">
              <div className="col-10 col-md-8">
                <div>
                  <input type="text" ref={this.searchRef} onChange={this.detectInput.bind(this)}/>
                  <button onClick={this.searchItem}>Search</button>
                  <button>
                    <div>{this.props.cart.length}</div>
                    <Link to='/shoplist/cart'>Cart</Link>
                  </button>
                </div>
              </div>
            </div>
            <nav>
              <ul>
                <li className="sub-menu-parent" tab-index="0">
                  <a href="#">Item1</a>
                  <ul className="sub-menu">
                    <li><a href="#">Sub Item 1</a></li>
                    <li><a href="#">Sub Item 2</a></li>
                    <li><a href="#">Sub Item 3</a></li>
                    <li><a href="#">Sub Item 4</a></li>
                  </ul>
                </li>
                <li className="sub-menu-parent" tab-index="0">
                  <a href="#">Item2</a>
                  <ul className="sub-menu">
                    <li><a href="#">Sub Item 1</a></li>
                    <li><a href="#">Sub Item 2</a></li>
                    <li><a href="#">Sub Item 3</a></li>
                    <li><a href="#">Sub Item 4</a></li>
                    <li><a href="#">Sub Item 5</a></li>
                    <li><a href="#">Sub Item 6</a></li>
                  </ul>
                </li>
                <li className="sub-menu-parent" tab-index="0">
                  <a href="#">Price</a>
                  <ul className="sub-menu">
                  {this.state.price_range.map(price => 
                    <li key={price}>
                      <a className={`price ${this.state.selected_price === price ? 'active': ''}`} 
                        onClick={this.choosePrice.bind(this, price)}>
                          {price}
                      </a>
                    </li>)}
                  </ul>
                </li>
              </ul>
            </nav>
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

const mapDispatchToProps = dispatch => ({
  newShopDetail : (shoplists) => dispatch(newShopDetail(shoplists)),
  fetchPosts : (searchText) => dispatch(fetchPosts(searchText)),
  showAllItem : () => dispatch(showAllItem())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopList);
