import React from 'react';
import ChatRoom from '../chatroom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return ({
    contacts: state.postByPersonId
  });
}

export default connect(mapStateToProps)(ChatRoom);