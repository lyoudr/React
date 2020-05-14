import { connect } from 'react-redux';
import Animal from '../presentcomp/Animal';
import {showCatDetail, notshowCatDetail} from '../../../../../redux/actions/index';

const mapStateToProps = state => {
  return ({
    cats: state.animal.cats,
  })
};

const mapDispatchToProps = dispatch => ({
  showCatDetail: (id) => dispatch(showCatDetail(id)),
  notshowCatDetail : (id) => dispatch(notshowCatDetail(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Animal);