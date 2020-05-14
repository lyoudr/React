import { connect } from 'react-redux';
import Animal from '../presentcomp/Animal';
import {switchCatDetail, selectFood} from '../../../../../redux/actions/index';

const mapStateToProps = state => {
  console.log('state is =>', state);
  return ({
    cats: state.animal.cats,
    foodlists : state.animal.foodlists
  })
};

const mapDispatchToProps = dispatch => ({
  switchCatDetail: (id, show) => dispatch(switchCatDetail(id, show)),
  selectFood : (value) => dispatch(selectFood(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Animal);