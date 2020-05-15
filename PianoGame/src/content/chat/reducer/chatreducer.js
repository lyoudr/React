const posts = (state = { isFetching: false, didInvalidate: false, contacts: [] }, action) => {
  switch(action.type){
    case 'REQUEST_CONTACTS':
      return Object.assign({}, state, {isFetching: true, didInvalidate: false});
    case 'RECEIVE_CONTACTS':
      return Object.assign({}, state, {isFetching: false, didInvalidate: false, contacts: action.contacts});
    default:
      return state;
  }
}

export const postsByPersonId = (state = {}, action) => {
  switch(action.type){
    case 'REQUEST_CONTACTS':
    case 'RECEIVE_CONTACTS':
      return Object.assign({}, state,{
        [action.personId]: posts(state[action.personId], action)
      })
    default:
      return state;
  }
}