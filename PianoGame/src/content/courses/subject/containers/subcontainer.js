import { connect } from 'react-redux';
import { showSubject } from '../../../../redux/actions';
import { Business, Economics} from '../../Subject';

const mapStateToProps = state => ({
    memorandum: state.memorandum
});

const mapDispatchToProps = dispatch => ({
    showSubject: name => dispatch(showSubject(name)),
});

export const Business = connect(
    mapStateToProps,
    mapDispatchToProps
)(Business)

export const Economics = connect(
    mapStateToProps,
    mapDispatchToProps
)(Economics)