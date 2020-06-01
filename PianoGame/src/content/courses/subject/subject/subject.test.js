import React from 'react';
// We're using our own custom render function and not RTL's render
// our customer utils also re-export everything from RTL 
// so we can import fireEvent and screen here as well
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from './test-utils';
import { Business } from './presentcomp/Subject';
import { mapStateToProps, mapDispatchToProps } from './containers/subcontainer';
import { EachSubjectData, memorandum } from './reducers/memorandum';
import { createStore } from 'redux';

describe('Subject test', () => {
  const state = {
    memorandum: EachSubjectData.businessData['Statistic']
  };
  // store
  let store;
  // state and funciton
  let memorandum_data;
  let showSubject;
  let addnewMemorandum;
  
  beforeEach(() => {
    store = createStore(memorandum, state.memorandum),
    memorandum_data = mapStateToProps(state).memorandum;
    showSubject = (name) => mapDispatchToProps(store.dispatch).showSubject(name);
    addnewMemorandum = (name, note) => mapDispatchToProps(store.dispatch).addnewMemorandum(name, note);
  });
  
  it('renders correctly', () => {
    const component = renderer.create(<Business />);
    //1. rendering
    let json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();
  });

  test('can render with redux with defaults', () => {
    const business = render(<Business showSubject = {showSubject}/>);
    const statistic_btn = screen.getByTestId('subject_Statistic');
    const content_img = screen.getByTestId('content_img');
    const content = screen.getByTestId('content');
    fireEvent.click(statistic_btn);
    expect(content_img.src).toMatch("http://localhost/business1.jpg")
    expect(content.textContent).toContain('statistic');
  });

  test('should add right', async() => {
    const {business, rerender} = render(
    <Business 
      showSubject = {showSubject} 
      addnewMemorandum = {addnewMemorandum}
      memorandum = {memorandum_data}
    />);
    // choose subject
    const statistic_btn = screen.getByTestId('subject_Statistic');
    fireEvent.click(statistic_btn);
    // click add note button
    const add_btn = screen.getByTestId('add_icon');
    fireEvent.click(add_btn);
    // expect add note area to show
    const memorandum_title = screen.getByTestId('memorandum_title');
    const memorandum_content = screen.getByTestId('memorandum_content');
    expect(memorandum_title).toBeTruthy();
    expect(memorandum_content).toBeTruthy();
    // add note right
    fireEvent.change(memorandum_title, { target: { value: 'Piano' }});
    fireEvent.change(memorandum_content, {target: { value: 'This is a note about piano.'}});
    expect(memorandum_title.value).toMatch(/Piano/);
    expect(memorandum_content.value).toContain('This is a note about piano.');  
    // submit notes
    const memorandum_submit = screen.getByTestId('memorandum_submit');
    fireEvent.click(memorandum_submit);
    // re-render the same component by using new state from "getState()"
    rerender(<Business 
      showSubject = {showSubject} 
      addnewMemorandum = {addnewMemorandum}
      memorandum = {store.getState()}
    />)
    const new_note = screen.getByTestId('Statistic_3');
    expect(new_note.textContent).toMatch(/Piano/);
  });
});