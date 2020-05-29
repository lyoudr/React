// Mock Service
import { requestDish, savePersonal } from './mockService';
const HttpRequest = require('./httpServiceTest');
jest.mock('../httpService');

// The assertion for a promise must be returned.
// 1. Get dishes from backend
it('works with promises', () => {
  expect.assertions(1);
  return requestDish('/food', ["meat", "vagetable", "mushroom", "cheese"])
    .then(data => {
      console.log('dishes return data is =>', data);
      expect(data).toEqual({ status: '200', message: 'ok', dishes: ["dish0", "dish3"] })
    });
});

// 2. Save personal data to backend
it('save personal data to backend', () => {
  expect.assertions(1);
  const person_info = {
    country: 'Taiwan',
    gender: 'girl',
    guide: 'Piano',
    hobby: 'Play game',
    job: 'F2E',
    name: 'Ann',
    userId: 'Ann'
  };
  return expect(savePersonal('/personal', person_info)).resolves.toEqual({ status: '200', message: 'ok' });
});

// 3. Shortest Path
it('shortest Path', async (done) => {
  expect.assertions(1);
  const url = 'http://127.0.0.1:8085/shortestpath';
  const path = ["pointA", "pointF"];
  const path_data = await HttpRequest.shortestPath(url, path);
  console.log('path_data is =>', path_data);
  expect(path_data).toEqual({ message: 'ok', path: ['A', 'C', 'F'], status: '200' });
  done();
});

// 4. Error handling
// Testing for async errors using Promise.catch.
it('choosePrice error', () => {
  expect.assertions(1);
  const url = 'http://127.0.0.1:8085/shop_price';
  const price_range = "500 ~ 100";
  return expect(HttpRequest.choosePrice(url, price_range)).resolves.toEqual({err: "wrong price range"});
});

// 5. Upload image
// it('should UploadImg', () => {
//   expect.assertions(1);
//   const url = 'http://127.0.0.1:8085/'
// });
