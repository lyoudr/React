import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';
import Cart from '../comp/AddToCart';

const mapStateToProps = state =>{ 
    return({
        cart : state.cart
    })
};

const mapDispatchToProps = dispatch => ({
    addToCart: (id, itemname, detail, color, size) => 
    dispatch(addToCart(id, itemname, detail, color, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)