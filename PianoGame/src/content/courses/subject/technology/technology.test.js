import React from 'react';
import {Map} from './technology';
import renderer from  'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

describe('technology test', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Map/>);
    // 1. rendering
    let json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();
    
    // manually trigger the callback
    let eventA = {};
    eventA.target = {id: 'pointA', style : {strokeWidth: '4'}};
    let eventB = {};
    eventB.target = {id: 'pointF', style : {strokeWidth: '4'}};
    component.getInstance().countpath(eventA);
    component.getInstance().countpath(eventB);
    component.getInstance().analyzeRoute();

    //2. re-rendering
    json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();
  });

  it('technology dom testing', () => {
    const {container} = render(<Map/>);
  });
});