import React from 'react';
import Chat from './chat';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
jest.mock('../../services/http-service/httpService');
const { HttpRequest } = require('../../services/http-service/httpService');
HttpRequest.uploadImg.mockImplementation(() => { return Promise.resolve(true)});
HttpRequest.savePersonal.mockImplementation(() => { return Promise.resolve(true)});

describe('chat test', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'userId=Ann',
    });
  });

  it('should return right UI', async () => {
    const history = createMemoryHistory();
    let props = {
      history: history
    };
    // fill the user info form
    const {container} = render(<BrowserRouter><Chat {...props}/></BrowserRouter>);
    const nameInput = container.querySelector('#name');
    const selectInput = container.querySelector('#select');
    const girl = container.querySelector('#girl');
    const boy = container.querySelector('#boy');
    const job = container.querySelector('#job');
    const hobby = container.querySelector('#hobby');
    const guide = container.querySelector('#guide');
    
    fireEvent.change(nameInput, { target: {value: 'Ann'}});
    fireEvent.change(job, { target: {value: 'F2E'}});
    fireEvent.change(hobby, { target: {value: 'Piano'}});
    fireEvent.change(guide, { target: {value: 'Hello!'}});
    expect(nameInput.value).toBe('Ann');

    // Upload img
    const uploadImg = container.querySelector('#personal_img');
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    fireEvent.change(uploadImg, { target: { files: [file]}});
    await waitFor(() => container.querySelector('#personal_img'));
    const dataUrl = container.querySelector('#personal_img').src;
    expect(dataUrl).toBe('http://localhost/upload.png');

    // Click upload Btn expect API be called once
    expect(nameInput.getAttribute('name')).toBe('name');
    const submitBtn = container.querySelector('#submit');
    fireEvent.click(submitBtn);
    await waitFor(() => expect(HttpRequest.uploadImg).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(HttpRequest.savePersonal).toHaveBeenCalledTimes(1));
  });
});