import React from 'react';
import Item from './Item';
import AddCartContainer from '../containers/addcartContain';
import PropTypes from 'prop-types';
import jQuery from 'jquery';

class ShopList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: {
        id: '',
        itemname: '',
        detail: ''
      },
      color: '',
      size: ''
    }
    this.chooseColor = this.chooseColor.bind(this);
    this.chooseSize = this.chooseSize.bind(this);
    this.colors = [];
    this.sizes = [];
  }
  componentDidUpdate() {
    // Detect request animation frame
    var scroll = window.requestAnimationFrame ||
      // IE Fallback
      function (callback) { window.setTimeout(callback, 1000 / 60) };

    var elementsToShow = document.querySelectorAll('.show-on-scroll');

    function loop() {
      Array.prototype.forEach.call(elementsToShow, function (element) {
        if (isElementInViewport(element)) {
          element.classList.add('is-visible');
        } else {
          element.classList.remove('is-visible');
        }
      });
      scroll(loop);
    }
    // Call the loop for the first time
    loop();

    // Helper function from: http://stackoverflow.com/a/7557433/274826
    function isElementInViewport(el) {
      // special bonus for those using jQuery
      if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
      }
      var rect = el.getBoundingClientRect();
      return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
      );
    }
  }
  showShopDetail(id, list) {
    this.props.showShopDetail(id);
    this.setState({ list: list });
  }
  chooseColor(color, index) {
    this.setState({ color: color });
    this.colors.forEach((eachcolor, colorindex) => {
      if (colorindex == index) {
        if (!eachcolor.classList.contains('active')) {
          eachcolor.classList.add('active');
        }
      } else {
        eachcolor.classList.remove('active');
      }
    });
  }
  chooseSize(size, index) {
    this.setState({ size: size });
    this.sizes.forEach((eachsize, sizeindex) => {
      console.log('eachsize is =>', eachsize);
      if (sizeindex == index) {
        if (!eachsize.classList.contains('active')) {
          eachsize.classList.add('active');
        }
      } else {
        eachsize.classList.remove('active');
      }
    });
  }
  render() {
    const color = ['pink', 'green', 'blue', 'red'];
    const size = ['S', 'M', 'L', 'XL'];
    const props = this.state;
    return (
      <React.Fragment>
        <div className="col-3 select">
          {this.props.shoplist.map(list =>
            <Item
              key={list.id}
              {...list}
              onClick={this.showShopDetail.bind(this, list.id, list)}
            />
          )
          }
        </div>
        <div className="col-9 display">
          {this.props.shoplist.map(list =>
            list.isDetail ? (
              <div key={list.itemname}>
                <img className="show-on-scroll" src={list.detail.img} />
                <p>{list.itemname}</p>
                <p>{list.detail.price}</p>
                <p>{list.detail.explain}</p>
                <div className="color">
                  <span>Color</span>
                  {color.map((color, index) =>
                    <div key={color} ref={eachcolor => this.colors[index] = eachcolor}
                      onClick={this.chooseColor.bind(this, color, index)}>
                      <span>{color}</span>
                    </div>
                  )}
                </div>
                <div className="size">
                  <span>Size</span>
                  {size.map((size, index) =>
                    <div key={size} ref={eachsize => this.sizes[index] = eachsize} onClick={this.chooseSize.bind(this, size, index)}>
                      {size}
                    </div>
                  )}
                </div>
                <AddCartContainer
                  id={this.state.list.id}
                  itemname={this.state.list.itemname}
                  detail={this.state.list.detail}
                  {...props}
                />
              </div>
            ) : (null)
          )}
        </div>
      </React.Fragment>
    )

  }
}


ShopList.propTypes = {
  shoplist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imgsrc: PropTypes.string.isRequired,
    itemname: PropTypes.string.isRequired,
    isDetail: PropTypes.bool.isRequired,
    detail: PropTypes.object.isRequired
  }).isRequired).isRequired,
  showShopDetail: PropTypes.func.isRequired
}
export default ShopList;