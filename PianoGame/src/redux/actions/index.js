let nextTodoId = 0;
/* Courses Notes */
export const showSubject = name => ({
  type: 'SHOW_SUBJECT',
  name
});

export const addnewMemorandum = (name, note) => ({
  type: 'ADD_MEMO',
  name,
  note
});

export const showDetail = id => ({
  type: 'SHOW_DETAIL',
  id
});

export const addNotetoText = (id, text, note) => ({
  type: 'ADD_NOTETOTEXT',
  id,
  text,
  note
});

/* Animal */
export const switchCatDetail = (id, show) => ({
  type : 'SWITCH_CATDETAIL',
  id,
  show
});

/* Food */
export const selectFood = (value) => ({
  type : 'SELECT_FOOD',
  value
});

/* ShopList */
export const showShopDetail = id => ({
  type : 'SHOW_SHOPDETAIL',
  id
});

export const addToCart = (id, itemname, detail, color, size) => ({
  type: 'ADD_TOCART',
  itemname,
  detail,
  id,
  color,
  size
});

export const newShopDetail = shoplists => ({
  type: 'NEW_SHOPDETAIL',
  shoplists
});

/* fetch the posts */
// By using specific middleware "Redux Thunk middleware", an action creator can return a funciton instead of an action object.
// This way, the action creator becomes a "thunk".

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(searchText){
  return {
    type: REQUEST_POSTS,
    searchText
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(searchText, json){
  return{
    type: RECEIVE_POSTS,
    searchText,
    posts: json.data,
    receivedAt: Date.now()
  }
}

// Thunk action creator
export function fetchPosts(searchText){
  return function (dispatch){
    dispatch(requestPosts(searchText))
    const reqBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchText: searchText})
    }
    return fetch(`${process.env.REACT_APP_HOSTURL}/shoplists`, reqBody)
      .then(
        res => res.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        dispatch(receivePosts(searchText, json));
        return searchText;
      })
      .then(searchText => {
        dispatch(addnewShopdetail(searchText))
      })
  }
}

export function addnewShopdetail(searchText) {
  return(dispatch, getState) => {
    const state = getState();
    const searchResult = state.postsBysearchText[`${searchText}`].items;
    return (dispatch(newShopDetail(searchResult)))
  }
}

/* Shopping Cart */
export const deleteItem = (itemId) => ({
  type: 'DELETE_ITEM',
  itemId
});

/* Export this action creater to manipulate showSopDetail action */
export const showSopDetailaction = (id) => {
  return function (dispatch){
    dispatch(showShopDetail(id));
  }
}