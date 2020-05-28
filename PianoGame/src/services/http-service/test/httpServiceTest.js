import Cookie from 'js-cookie';

const request_headers = {
  'Content-Type': 'application/json',
  'Authorization': Cookie.get('access_token'),
  'Access-Control-Allow-Origin': '*'
};
// Get dishes from backend
const requesDishes = (url, data) => {
  console.log('called fetch!');
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: request_headers,
    body: JSON.stringify(data),
  })
    .then(res => {
      return res.json();
    })
};
//Upload User Image to backend
const uploadImg = (url, data) => {
  return fetch(`${url}/${data.userId}`, {
    method: 'POST',
    headers:  {
      'Authorization': Cookie.get('access_token'),
      'Access-Control-Allow-Origin': '*'
    },
    body: data.formData
  })
    .then(res => {
      return res.json();
    })
};
//Save personal data to backend
const savePersonal = (url, data) => {
  return fetch(url, {
    headers: request_headers,
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
};
// Delete Msg
const deleteMessage = (url, data) => {
  return fetch(url, {
    headers: request_headers,
    method: 'DELETE',
    body: JSON.stringify(data)
  })
  .then(res => {
    return res.json();
  });
};
// Fetch user and friend images
const fetchImage = (url, person) => {
  return fetch(`${url}${person}`, {
    headers: request_headers,
    method: 'GET',
  })
    .then(res => {
      const reader = res.body.getReader();
      return new ReadableStream({
        start(controller) {
          const pump = () => {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
          return pump();
        }
      })
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
};
// Count shortest path (Using params in Fetch)
const shortestPath = (url, data) => {
  return fetch(url, {
    headers: request_headers,
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    });
};
// Select shop list items according to price range
const choosePrice = (url, price_range) => {
  return fetch(url, {
    headers: request_headers,
    method: 'POST',
    body: JSON.stringify({ price: price_range })
  })
  .then(res => {
    return res.json();
  })
  .catch(err => {
    return err;
  });
};
// Check Out
const checkOut = (url, selected_items) => {
  console.log('selected_item is =>', selected_items);
  return fetch(url, {
    headers: request_headers,
    method: 'POST',
    body: JSON.stringify(selected_items)
  })
    .then(res => {
      return res.json();
    })
};
// Get Shop Items
const getShopItems = (url, user) => {
  const params = { user: user };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url, {
    headers: request_headers,
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
};

module.exports = {
  requesDishes : requesDishes,
  uploadImg : uploadImg,
  savePersonal : savePersonal,
  deleteMessage : deleteMessage,
  fetchImage : fetchImage,
  shortestPath : shortestPath,
  choosePrice : choosePrice,
  checkOut : checkOut,
  getShopItems : getShopItems
};