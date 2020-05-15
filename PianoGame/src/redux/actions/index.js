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

/* Another Fetch */
// Request contacts
function requestContacts(personId) {
  return {
    type : 'REQUEST_CONTACTS',
    personId
  }
}
// Receive contacts
function receiveContacts(personId, json){
  console.log('json is =>', json);
  return{
    type : 'RECEIVE_CONTACTS',
    personId,
    contacts: json,
    receivedAt : Date.now()
  }
}
// Fetch Posts
function fetchContactsPosts(personId){
  return (dispatch, getState) => {
    dispatch(requestContacts(personId))
      const url = new URL(`${process.env.REACT_APP_HOSTURL}/chat`);
      const params = {personId : personId};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      return fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log('json is =>', json);
          dispatch(receiveContacts(personId, json));
          return Promise.resolve(getState());
        })
  }
}
// Should Fetch Posts 
function shouldFetchPosts(state, personId){
  const contactInfo = state.postsByPersonId[personId];
  if(!contactInfo){
    return true;
  }else if(contactInfo.isFetching){
    return false;
  }else{
    return contactInfo.didInvalidate;
  }
}
// Fetch Posts If Needed
export function fetchPostsIfNeeded(personId){
  return (dispatch, getState) =>{
    if(shouldFetchPosts(getState(), personId)){
      return dispatch(fetchContactsPosts(personId));
    } else {
      return Promise.resolve(getState());
    }
  }
}
