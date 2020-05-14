import { combineReducers } from 'redux';
import { memorandum } from '../../content/courses/subject/subject/reducers/memorandum';
import { shoplist } from '../../content/shop-list/reducers/shop';
import { cart, postsBysearchText } from '../../content/shop-list/reducers/cart';

export default combineReducers({
  shoplist,
  memorandum,
  cart,
  postsBysearchText
});