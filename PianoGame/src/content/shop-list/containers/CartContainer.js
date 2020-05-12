import { connect } from 'react-redux';
import {deleteItem, showSopDetailaction} from '../../../redux/actions/index';
import CartCollections from '../comp/CartCollection';

const mapStateToProps = state => { 
    return({
      cartcollection : state.cart
    })
}

const mapDispatchToProps = dispatch => ({
  deleteItem : itemId => dispatch(deleteItem(itemId)),
  showSopDetailaction : id => dispatch(showSopDetailaction(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartCollections)