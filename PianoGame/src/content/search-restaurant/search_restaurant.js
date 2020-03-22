import React from 'react';
import GoogleApiWrapper from './Restaurant/Restaurant';
// svg file
import menu from '../../assets/icon/menu.svg';
import price from '../../assets/icon/price.svg';
import rating from '../../assets/icon/rating.svg';
import distance from '../../assets/icon/distance.svg';
// scss file
import './search_restaurant.scss';

class Search_Restaurant extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      restaurant_lists : [],
      rankResType : [
        {className: 'price', type: 'price_level', img: price},
        {className: 'rating', type: 'rating', img: rating},
        {className: 'distance', type: 'distance', img: distance},
      ],
      selectedRes : null,
      currentLocation:{
        lat : null,
        lng : null
      },
      isOpenSide : false,
      isShowBar : 'show',
      isShowMenu : 'hide'
    }
    this.setRestaurant = this.setRestaurant.bind(this);
    this.setCenter = this.setCenter.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.chooseRestaurant = this.chooseRestaurant.bind(this);
  }
  // Control sidebar display
  showMenu(){
    this.setState({isOpenSide : !this.state.isOpenSide}, () => {
      this.setState({
        isShowBar : this.state.isOpenSide ? 'hide' : 'show', 
        isShowMenu : this.state.isOpenSide ? 'show' : 'hide'
      });
    });
  }

  // Rank restaurant lists according to price, rating, and distance
  rankRestaurant(type){
    const sortFunc = (arr, type) => {
      if(type === 'price_level' || type === 'rating'){
        arr.sort((a, b) => {
          if(a[type] > b[type]){
            return 1;
          }
          if(a[type] < b[type]){
            return -1;
          }
          return 0;
        });
      } else if(type === 'distance'){
        let lat = this.state.currentLocation.lat;
        let lng = this.state.currentLocation.lng;
        arr.sort((a, b) => {
          let a_dis = Math.sqrt(Math.pow((a.geometry.location.lat() - lat), 2) + Math.pow((a.geometry.location.lng() - lng), 2));
          let b_dis = Math.sqrt(Math.pow((b.geometry.location.lat() - lat), 2) + Math.pow((b.geometry.location.lng() - lng), 2));
          if(a_dis > b_dis){
            return 1;
          }
          if(a_dis < b_dis){
            return -1;
          }
          return 0;
        });
      }
      this.setState({restaurant_lists : arr});
    }
    sortFunc(this.state.restaurant_lists, type);
  }

  // Set map center
  setCenter(currentLocation){
    this.setState({currentLocation : currentLocation});
  }

  // Set restaurant lists
  setRestaurant(restaurants){
    this.setState({restaurant_lists : restaurants});
    if(document.getElementById('choosedRes')){
      document.getElementById('choosedRes').scrollIntoView();
    }
  }

  // Choose Restaurant in lists
  chooseRestaurant(restaurant){
    this.setState({selectedRes : restaurant});
  }

  render(){
    return (
      <main className="restaurant">
        <div className={`menu ${this.state.isShowBar}`} 
            onClick = {this.showMenu}>
          <img src={menu} alt='img'/>
        </div>
        <div className={`select ${this.state.isShowMenu}`} >
          {this.state.rankResType.map((type, index) => {
            return(
              <div 
                key = {index} 
                className={type.className} 
                onClick={this.rankRestaurant.bind(this, `${type.type}`)}
              >
                <img src={type.img} alt='img'/>
              </div>
            )
          })}
        </div>
        <div className="container custom">
          <div className="row">
            <div className="col-md-4 col-12 restaurant_info">
              {this.state.restaurant_lists.map((restaurant, index) => {
                return(
                  <div
                    key = {index}
                    onClick = {this.chooseRestaurant.bind(this, restaurant)} 
                    id = {restaurant.isChoosed ? 'choosedRes': null} 
                    className={restaurant.isChoosed ? 'active': ''}
                  >
                    <p className="name">{index + 1}. {restaurant.name}</p>
                    <p className="vicinity">{restaurant.vicinity}</p>
                    <div className="price_rating">
                      <p className="price">{restaurant.price_level}$</p>
                      <p className="rating">Rating: {restaurant.rating}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="col-md-8 col-12 googlemap">
              <GoogleApiWrapper
                setRestaurant = {this.setRestaurant}
                setCenter = {this.setCenter}
                selectedRes = {this.state.selectedRes}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Search_Restaurant;
