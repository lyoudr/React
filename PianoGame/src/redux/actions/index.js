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
    console.log('searchText is =>', searchText);
    dispatch(requestPosts(searchText))
    const reqBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchText: searchText})
    }
    return fetch(`${process.env.REACT_APP_HOSTURL}:8085/shoplists`, reqBody)
      .then(
        res => res.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        console.log('received data is =>', json);
        dispatch(receivePosts(searchText, json));
        return searchText;
      })
      .then(searchText => {
        console.log("res is =>", searchText);
        dispatch(addnewShopdetail(searchText))
      })
  }
}

export function addnewShopdetail(searchText) {
  return(dispatch, getState) => {
    const state = getState();
    console.log('getState is =>', getState());
    const searchResult = state.postsBysearchText[`${searchText}`].items;
    console.log('searchResult is =>', searchResult);
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