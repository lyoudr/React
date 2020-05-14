import { connect } from 'react-redux';
import Animal from '../presentcomp/Animal';
import {switchCatDetail} from '../../../../../redux/actions/index';

const mapStateToProps = state => {
  return ({
    cats: state.animal.cats,
  })
};

const mapDispatchToProps = dispatch => ({
  switchCatDetail: (id, show) => dispatch(switchCatDetail(id, show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Animal);