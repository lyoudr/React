import React, { useState, useEffect } from 'react';
import "../../../assets/sass/shoplist/shoplist.scss";

const CartCollections = (props) => {
  const [totalcount, setTotalCount] = useState(0);
  useEffect(() => {
    console.log('init');
    let total = 0;
    props.cartcollection.forEach((item) => {
      total = total + Number(item.detail.price.split('$')[0]);
    });
    setTotalCount(total);
    if (props.location.pathname == '/shoplist/cart') {
      document.getElementsByClassName('shopdetails')[0].style.display = 'none';
    }
    return () => {
      document.getElementsByClassName('shopdetails')[0].style.display = 'block';
    }
  });
  function deleteItem(itemId) {
    props.deleteItem(itemId);
  }
  function goBack(id) {
    props.showSopDetailaction(id);
    props.history.goBack();
  }
  return (
    <section className="shop_cart">
      <div className="container">
        <div className="row">
          <div className="col-8">
            {props.cartcollection &&
              props.cartcollection.map((cart, index) => {
                let upperitemname = cart.itemname.charAt(0).toUpperCase() + cart.itemname.slice(1);
                return (
                  <div key={cart.id}>
                    <div onClick={() => goBack(cart.id)}>
                      <img src={cart.detail.img} />
                    </div>
                    <div>
                      <p>{upperitemname}</p>
                      <p>{cart.color}</p>
                      <p>{cart.size}</p>
                    </div>
                    <div>
                      <p>{cart.detail.price}</p>
                      <p onClick={() => deleteItem(cart.id)}> X </p>
                    </div>
                  </div>
                )
              })
            }
            <div>
              <div>
                <p>Total: {totalcount}</p>
                <button>CheckOut</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartCollections;