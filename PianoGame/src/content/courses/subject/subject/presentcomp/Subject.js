import React, { useState, useEffect } from 'react';
import { EachSubjectData } from '../../Subjectlist';
import defaultImg from '../../../../../assets/images/subject_default.jpeg';
import '../../../../../assets/sass/courses/subject/subject.scss';
import jQuery from 'jquery';

/* Hooks */

const AddNotetoTextFunc = React.forwardRef((props, ref) => {
  const textRef = React.createRef();

  const [childnotes, setNotes] = useState([]);
  useEffect(() => {
    if (props.notes && props.elemId) {
      let foundnote = props.notes.find(item => {
        return item.id === props.elemId;
      });
      setNotes(foundnote.textNote);
    }
  });

  const addNote = () => {
    let newnote = {};
    newnote[props.selectedText] = textRef.current.value;
    setNotes(oldarr => [...oldarr, newnote]);
    props.hintRef.current.classList.remove('active');
    textRef.current.value = '';
  }

  return (
    <div className="addnotetoText" ref={ref}>
      <textarea ref={textRef}></textarea>
      <NoteContext.Consumer>
        {({ addNotetoText }) => (
          <div className="submitnote">
            <button onClick={() => {
              addNotetoText(props.elemId, props.selectedText, textRef.current.value)
              addNote();
            }}>
              submit
            </button>
          </div>
        )}
      </NoteContext.Consumer>
      <div className="eachnote">
        {childnotes.length && childnotes.map(note =>
          <React.Fragment>
            <div key={note}>
              <p>{Object.keys(note)[0]}</p>
              <p>{note[Object.keys(note)[0]]}</p>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
});


class EachNotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showmemorandum: true,
      selectedText: null,
      elemId: null,
      count: 0
    }
    this.detailRef = null;
    this.noteRef = React.createRef();
    this.titleRef = React.createRef();
    this.hintRef = React.createRef();
    this.makenoteRef = React.createRef();
    this.makenoteRef_list = React.createRef();
    this.makenoteRef_listdetail = React.createRef();

    this.isMemorandumFunc = this.isMemorandumFunc.bind(this);
    this.showmemorandumFunc = this.showmemorandumFunc.bind(this);

    this.addnewMemorandum = this.addnewMemorandum.bind(this);
    this.notesSelectText = this.notesSelectText.bind(this);
    this.makeNotetoText = this.makeNotetoText.bind(this);
  }
  componentDidUpdate() {
    if (!this.detailRef) {
      return;
    } else {
      this.detailRef.addEventListener('mouseup', this.notesSelectText);
    }
  }
  // deside if memorandum shows
  isMemorandumFunc(isShow) {
    this.setState({ showmemorandum: isShow });
  }

  // Click each memorandum to show its detail contents and close blank memorandum
  showmemorandumFunc(id) {
    this.setState({ elemId: id });
    this.props.showDetail(id);
    this.isMemorandumFunc(true);
    this.hintRef.current.classList.remove('active');
    this.makenoteRef.current.classList.remove('active');
    this.makenoteRef_list.current.classList.remove('active');
    this.makenoteRef_listdetail.current.classList.remove('active');
  }

  // Add new memorandum
  addnewMemorandum() {
    let name = this.props.name;
    let note = {
      'title': this.titleRef.current.value,
      'content': this.noteRef.current.value,
      'date': Date.now(),
      'id': `${name}_${this.props.notes.length}`,
      'textNote': []
    }
    this.props.addnewMemorandum(name, note)
  }

  // Select a paragraph in note
  notesSelectText(event) {
    // Get selected text and add tag "span" to it.
    let text = window.getSelection();
    let elem = document.createElement("span");
    elem.id = `${this.state.elemId}_${this.state.count}`;
    text.getRangeAt(0).surroundContents(elem);

    // Record selected text as string
    let selectedText = text.toString();
    this.setState({ selectedText: selectedText });

    // show hintRef (underline and addNotetoText)
    this.hintRef.current.classList.add('active');
    this.hintRef.current.style.left = `${event.clientX}px`;
    this.hintRef.current.style.top = `${event.clientY}px`;
  }

  // Make note to selected text
  makeNotetoText() {
    // Underline selected text
    document.getElementById(`${this.state.elemId}_${this.state.count}`).style.textDecoration = 'underline';
    this.setState({ count: this.state.count + 1 });
    // show makenoteRef area
    this.makenoteRef_list.current.classList.add('active');
    this.makenoteRef_listdetail.current.classList.add('active');
    this.makenoteRef.current.classList.add('active');
  }

  render() {
    const notes = this.props.notes;
    const name = this.props.name;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div ref={this.makenoteRef_list} className="col-6 list">
            <div data-testid="add_icon" onClick={this.isMemorandumFunc.bind(this, false)}>
              <i className="material-icons">add_circle_outline</i>
            </div>
            <div>
              {notes && notes.map((note, index) =>
                <div key={note.id} onClick={this.showmemorandumFunc.bind(this, `${name}_${index}`)}>
                  <p data-testid={note.id}>{note.title}</p>
                </div>
              )}
            </div>
          </div>
          <div ref={this.makenoteRef_listdetail} className="col-6 list_detail">
            {this.state.showmemorandum && notes && notes.map((note, index) => {
              if (note.textNote[0]) {
                let newnote1 = note.content.split(Object.keys(note.textNote[0]))[0];
                let newnote2 = Object.keys(note.textNote[0]);
                let newnote3 = note.content.split(Object.keys(note.textNote[0]))[1];
                return note.showdetail ?
                  <p ref={elem => this.detailRef = elem} key={`${note}-${index}`}>
                    {newnote1}
                    <span
                      style={{ textDecoration: 'underline' }}
                      onMouseOver={() => {
                        this.makenoteRef.current.classList.add('active');
                        this.makenoteRef_list.current.classList.add('active');
                        this.makenoteRef_listdetail.current.classList.add('active');
                      }}>
                      {newnote2}
                    </span>
                    {newnote3}
                  </p>
                  : null
              } else {
                return note.showdetail ?
                  <p ref={elem => this.detailRef = elem} key={index}>{note.content}</p>
                  : null
              }
            })}
            <div className="hint" ref={this.hintRef}>
              <div onClick={this.makeNotetoText}>Add Note</div>
            </div>
            {this.state.showmemorandum === false &&
              <div className="addmemorandum">
                <input data-testid="memorandum_title" ref={this.titleRef} />
                <textarea data-testid="memorandum_content" rows="18" ref={this.noteRef}></textarea>
                <div>
                  <button data-testid="memorandum_submit" onClick={this.addnewMemorandum}>Submit</button>
                </div>
              </div>
            }
          </div>
          <AddNotetoTextFunc
            ref={this.makenoteRef}
            name={name}
            elemId={this.state.elemId}
            selectedText={this.state.selectedText}
            hintRef={this.hintRef}
            notes={notes}
          />
        </div>
      </div>
    )
  }
}

const NoteContext = React.createContext();
class EachSubject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      application: null,
      img: null,
      name: '',
    }
    this.chooseItem = this.chooseItem.bind(this);
  }
  chooseItem(eachitem) {
    this.setState({
      application: eachitem.application,
      img: eachitem.img,
      name: eachitem.name,
    });
    this.props.showSubject(eachitem.name);
  }
  render() {
    return (
      <React.Fragment>
        <section className="subject_list">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul className="subjects">
                  {this.state.data.map((eachitem) => (
                    <li data-testid={`subject_${eachitem.name}`} className={`subject_${eachitem.name}`} onClick={() => this.chooseItem(eachitem)} key={eachitem.name}>
                      <span>{eachitem.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="subject_detail">
          <div className="container">
            <div className="row justify-content-center">
              {this.props.render(this.state)}
            </div>
          </div>
        </section>
        <section className="subject_notes">
          <NoteContext.Provider value={{ addNotetoText: this.props.addNotetoText }}>
            <EachNotes
              notes={this.props.memorandum}
              showDetail={this.props.showDetail}
              name={this.state.name}
              addnewMemorandum={this.props.addnewMemorandum}
            />
          </NoteContext.Provider>
        </section>
      </React.Fragment>
    )
  }
}

class SubjectDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const subdetail = this.props.subdetail;
    return (
      <React.Fragment>
        <div className="col-12 col-md-6 picture">
          <img data-testid="content_img" src={subdetail.img? subdetail.img : defaultImg} alt='img' className='inline-photo show-on-scroll' />
        </div>
        <div className="col-12 col-md-6 describe">
          <p data-testid="content" className="content">{subdetail.application}</p>
        </div>
      </React.Fragment>
    )
  }
}

class Subjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    }
  }
  componentDidMount() {
    // Detect request animation frame
    var scroll = window.requestAnimationFrame ||
      // IE Fallback
      function (callback) { window.setTimeout(callback, 1000 / 60) };

    var elementsToShow = document.querySelectorAll('.show-on-scroll');

    function loop() {
      Array.prototype.forEach.call(elementsToShow, function (element) {
        if (isElementInViewport(element)) {
          element.classList.add('is-visible');
        } else {
          element.classList.remove('is-visible');
        }
      });
      scroll(loop);
    }
    // Call the loop for the first time
    loop();

    // Helper function from: http://stackoverflow.com/a/7557433/274826
    function isElementInViewport(el) {
      // special bonus for those using jQuery
      if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
      }
      var rect = el.getBoundingClientRect();
      return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <EachSubject {...this.props} render={subdetail => (
          <SubjectDetail subdetail={subdetail} />
        )}
        />
      </React.Fragment>
    )
  }
}

function HigerOrderComponent(WrappedComponent, data) {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <WrappedComponent data={data} {...this.props} />
      );
    }
  }
};

export const Business = HigerOrderComponent(Subjects, EachSubjectData.businessData);
export const Economics = HigerOrderComponent(Subjects, EachSubjectData.economicsData);


