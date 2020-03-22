import { connect } from 'react-redux';
import { showSubject, showDetail, addnewMemorandum, addNotetoText } from '../../../../../redux/actions';
import { Business, Economics} from '../presentcomp/Subject';

const mapStateToProps = state => ({
    memorandum: state.memorandum
});

const mapDispatchToProps = dispatch => ({
    showSubject: name => {
        dispatch(showSubject(name))
    },
    showDetail : id => {
        dispatch(showDetail(id));
    },
    addnewMemorandum : (name, note) => {
        dispatch(addnewMemorandum(name, note));
    },
    addNotetoText : (id, text, note) => {
        dispatch(addNotetoText(id, text, note));
    }
});

export const BusinessContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Business)

export const EconomicsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Economics)