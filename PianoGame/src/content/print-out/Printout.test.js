import React from 'react';
import PrintOut from './Printout';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

describe('pritOut test', () => {
  // Snapshot test
  it('renders correctly when searc', () => {
    const component = renderer.create(<PrintOut />);
    // 1. rendering
    let json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();

    // manually trigger the callback
    component.getInstance().showLink('A');
    component.getInstance().toggleTheme();

    //2. re-rendering
    json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();

    // manually trigger the callback
    component.getInstance().showLink('B');

    // 3. re-rendering
    json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();
  });
  // DOM testing
  it('react testing library do testing', () => {
    const {container} = render(<PrintOut/>);
    const input = container.querySelector('#input');
    fireEvent.change(input, {target:{value: 'BACH'}});
    expect(input.value).toBe('BACH');
    setTimeout(() => {
      const bach_style = window.getComputedStyle(container.querySelector('#BACH'));
      const beethovan_style = window.getComputedStyle(container.querySelector('#Beethovan'));
      const mozart_style =  window.getComputedStyle(container.querySelector('#Mozart'));
      expect(bach_style.display).toBe('block');
      expect(beethovan_style.display).toBe('none');
      expect(mozart_style.display).toBe('none');
    }, 1500);
  });
});