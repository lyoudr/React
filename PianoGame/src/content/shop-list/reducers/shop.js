import jacket from '../../../assets/images/jacket.jpg';
import necklace from '../../../assets/images/necklace.jpg';
import sweater from '../../../assets/images/sweater.jpg';
import shoes from '../../../assets/images/shoes.jpg';
import coat from '../../../assets/images/coat.jpg';

const InitialState = [
  {
    id : 'item1',
    imgsrc : jacket,
    itemname: 'jack',
    isDetail : false,
    detail : {
      img : jacket,
      explain : "Our planet is something unbelievable. It is so diverse and beautiful, so unique and controversial. Earth is worth our admiring. The easiest way to explore all wonders and unique places of our planet is travelling. It is very romantic and it takes one's breath away because new emotions are always",
      price : '300$'
    }
  },
  {
    id : 'item2',
    imgsrc : necklace,
    itemname: 'neck',
    isDetail : false,
    detail : {
      img : necklace,
      explain : "Our planet is something unbelievable. It is so diverse and beautiful, so unique and controversial. Earth is worth our admiring. The easiest way to explore all wonders and unique places of our planet is travelling. It is very romantic and it takes one's breath away because new emotions are always",
      price : '200$'
    }
  },
  {
    id : 'item3',
    imgsrc : sweater,
    itemname: 'sweater',
    isDetail : false,
    detail : {
      img : sweater,
      explain : "Our planet is something unbelievable. It is so diverse and beautiful, so unique and controversial. Earth is worth our admiring. The easiest way to explore all wonders and unique places of our planet is travelling. It is very romantic and it takes one's breath away because new emotions are always",
      price : '100$'
    }
  },
  {
    id : 'item4',
    imgsrc : shoes,
    itemname: 'shoes',
    isDetail : false,
    detail : {
      img : shoes,
      explain : "Our planet is something unbelievable. It is so diverse and beautiful, so unique and controversial. Earth is worth our admiring. The easiest way to explore all wonders and unique places of our planet is travelling. It is very romantic and it takes one's breath away because new emotions are always",
      price : '400$'
    }
  },
  {
    id : 'item5',
    imgsrc : coat,
    itemname: 'coat',
    isDetail : false,
    detail : {
      img : coat,
      explain : "Our planet is something unbelievable. It is so diverse and beautiful, so unique and controversial. Earth is worth our admiring. The easiest way to explore all wonders and unique places of our planet is travelling. It is very romantic and it takes one's breath away because new emotions are always",
      price : '500$'
    }
  }
]
export const shoplist = (state = InitialState, action) => {
  switch(action.type){
    case 'SHOW_SHOPDETAIL':
      return state.map(item =>{
        if(item.id === action.id){
          item.isDetail = true;
          return item;
        } else {
          item.isDetail = false;
          return item;
        }
        }
      ) 
    case 'NEW_SHOPDETAIL':
      return action.shoplists;
    default:
      return InitialState;
  }
}