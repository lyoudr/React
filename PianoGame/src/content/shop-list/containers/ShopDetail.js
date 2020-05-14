import { connect } from 'react-redux';
import { showShopDetail }  from '../../../redux/actions';
import ShopList from '../comp/ShopList';

const mapStateToProps = state =>{ 
    return({
        shoplist : state.shoplist
    })
};

const mapDispatchToProps = dispatch => ({
    showShopDetail: id => dispatch(showShopDetail(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopList)