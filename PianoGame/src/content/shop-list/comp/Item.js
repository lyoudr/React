import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <React.Fragment>
        <div onClick={this.props.onClick}>
          <p>{this.props.itemname}</p>
          <img src={this.props.imgsrc} />
        </div>
      </React.Fragment>
    )
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  imgsrc: PropTypes.string.isRequired,
  itemname: PropTypes.string.isRequired,
  isDetail: PropTypes.bool.isRequired,
  detail: PropTypes.object.isRequired
}
export default Item;