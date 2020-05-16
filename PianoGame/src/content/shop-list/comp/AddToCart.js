import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  addToCart(id, itemname, detail, color, size) {
    this.props.addToCart(id, itemname, detail, color, size);
  }
  render() {
    return (
      <div className="addtocart">
        <button onClick={this.addToCart.bind(
          this,
          this.props.id,
          this.props.itemname,
          this.props.detail,
          this.props.color,
          this.props.size)}>
          Add To Cart
        </button>
      </div>
    )
  }
}

Cart.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Cart