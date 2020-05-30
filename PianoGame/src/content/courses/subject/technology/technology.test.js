import React from 'react';
import {Map} from './technology';
import renderer from  'react-test-renderer';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';

jest.mock('../../../../services/http-service/httpService');
const { HttpRequest } = require('../../../../services/http-service/httpService');
HttpRequest.shortestPath.mockImplementation(() => {
  return Promise.resolve({message: 'ok', path: ['A', 'C', 'F'], status: '200'});
});

describe('technology test', () => {

  afterEach(cleanup);

  it('click pointA and pointF should return right path', async() => {
    const {container} = render(<Map/>);
    const pointA = container.querySelector('#pointA');
    const pointF = container.querySelector('#pointF');
    const analyze_btn = container.querySelector('#analyze');
    const reset_btn = container.querySelector('#reset');
    fireEvent.click(pointA);
    fireEvent.click(pointF);
    expect(pointA.style.strokeWidth).toBe('8');
    expect(pointA.style.stroke).toBe('red');
    // analyze
    fireEvent.click(analyze_btn); 
    // wait for Api
    await waitFor(() => expect(HttpRequest.shortestPath).toHaveBeenCalledTimes(1));
    // show shortest path
    expect(container.querySelectorAll('.path_result')[0].innerHTML).toMatch(/A =&gt;/);
    expect(container.querySelectorAll('.path_result')[1].innerHTML).toMatch(/C =&gt;/);
    expect(container.querySelectorAll('.path_result')[2].innerHTML).toMatch(/F/);
    // clear
    fireEvent.click(reset_btn);
    expect(pointA.style.strokeWidth).toBe('4');
    expect(pointA.style.stroke).toBe('black');
    expect(container.querySelectorAll('.path_result')[0]).toBeUndefined();
  });

  function createNodeMock(element) {
    if (element.type === 'div') {
      return {
        focus() {},
        appendChild() {},
        // This is your fake DOM node for <p>.
        // Feel free to add any stub methods, e.g. focus() or any
        // other methods necessary to prevent crashes in your components.
      };
    }
    return null;
  }
  // Since test renderer is not coupled to React DOM, it doesn't know anything about 
  // what refs are supposed to look like. 
  // React 15.4.0 adds the ability to mock refs for test renderer but you should provide 
  // those mocks yourself.
  it('renders correctly', () => {
    const options = {createNodeMock};
    const component = renderer.create(<Map/>, options);
  
    // 1. rendering
    let json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();
    
    //2. manually trigger the callback
    let eventA = {};
    eventA.target = {id: 'pointA', style : {strokeWidth: '4'}};
    let eventB = {};
    eventB.target = {id: 'pointF', style : {strokeWidth: '4'}};
    component.getInstance().countpath(eventA);
    component.getInstance().countpath(eventB);
    component.getInstance().analyzeRoute();

    //3. re-rendering
    json_tree = component.toJSON();
    expect(json_tree).toMatchSnapshot();
  });
});
