import { REQUEST_POSTS, RECEIVE_POSTS } from '../../../redux/actions';

export const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TOCART':
      return [
        ...state,
        {
          id: action.id,
          itemname: action.itemname,
          color: action.color,
          size: action.size,
          detail: action.detail,
        }
      ]
    case 'DELETE_ITEM':
      let newstate = state.filter((item) => {
        return item.id !== action.itemId
      });
      return newstate;
    default:
      return state
  }
}

// We extracted posts(state, action) that manages the state of a specific post list.
function posts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

export const postsBysearchText = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.searchText]: posts(state[action.searchText], action)
      });
    default:
      return state;
  }
}

