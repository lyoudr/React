import React, { useState, useEffect } from 'react';
import { HttpRequest } from '../../../services/http-service/httpService';
import Cookies from 'js-cookie';
import clothes from '../../../assets/images/T_shirt_1.jpg';
import '../../../assets/sass/global/global.scss';
import '../../../assets/sass/shoplist/shopitems.scss';

class ShopItems extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      shop_items : []
    }
    this.getShopItems = this.getShopItems.bind(this);
  }
  componentDidMount(){
    this.getShopItems();
  }

  getShopItems(){
    const url = new URL(`${process.env.REACT_APP_HOSTURL}/shop_items`);
    const user = Cookies.get('userId');
    HttpRequest.getShopItems(url, user)
      .then(res => this.setState({shop_items: res}));
  }

  render(){
    return (
      <div className="shop_items main">
        <section className="commodity">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-11">
                <div className="title">
                  <span></span>
                  <span>Name</span>
                  <span>Color</span>
                  <span>Size</span>
                  <span>Number</span>
                </div>
                <div className="shop_items">
                  {this.state.shop_items.map(item => 
                    <div className="each_item" key={item.itemname}>
                      <div className="item img"><img src={clothes}/></div>
                      <div className="item name">{item.itemname[0].toUpperCase() + item.itemname.slice(1)}</div>
                      <div className="item color">{item.color}</div>
                      <div className="item size">{item.size}</div>
                      <div className="item number">{item.numbers}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
};

export default ShopItems;