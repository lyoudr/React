import React, { lazy } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../../redux/actions/index';
import ShopDetials from './containers/ShopDetail';
import '../../assets/sass/shoplist/shoplist.scss';

// Lazy load cartcollections
const CartCollections = lazy(() => import('./containers/CartContainer'));

class ShopList extends React.Component {
  constructor(props) {
    super(props)
    this.searchRef = React.createRef();
    this.compRef = React.createRef();
    this.searchItem = this.searchItem.bind(this);
  }
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
