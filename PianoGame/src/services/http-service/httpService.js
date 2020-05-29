import Cookie from 'js-cookie';

export const HttpRequest = {
  request_headers: {
    'Content-Type': 'application/json',
    'Authorization': Cookie.get('access_token'),
    'Access-Control-Allow-Origin': '*'
  },
  // Get dishes from backend
  requesDishes: async function (url, data) {
    console.log('called fetch!');
    const newdata = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: this.request_headers,
      body: JSON.stringify(data),
    })
    .then(res => res.json());
    return newdata;
  },
  //Upload User Image to backend
  uploadImg: function (url, data) {
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
  },
  //Save personal data to backend
  savePersonal: function (url, data) {
    return fetch(url, {
      headers: this.request_headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
  },
  // Delete Msg
  deleteMessage : function (url, data) {
    console.log('data is =>', data);
    return fetch(url, {
      headers: this.request_headers,
      method: 'DELETE',
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
  },
  // Fetch user and friend images
  fetchImage: function (url, person) {
    return fetch(`${url}${person}`, {
      headers: this.request_headers,
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
  },
  // Count shortest path (Using params in Fetch)
  shortestPath: function (url, data) {
    return fetch(url, {
      headers: this.request_headers,
      method: 'POST',
      body: data
    })
      .then(res => {
        return res.json();
      });
  },
  // Select shop list items according to price range
  choosePrice: function (url, price_range) {
    return fetch(url, {
      headers: this.request_headers,
      method: 'POST',
      body: JSON.stringify({ price: price_range })
    })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log('err is =>', err);
    })
  },
  // Check Out
  checkOut: function (url, selected_items) {
    console.log('selected_item is =>', selected_items);
    return fetch(url, {
      headers: this.request_headers,
      method: 'POST',
      body: JSON.stringify(selected_items)
    })
      .then(res => {
        return res.json();
      })
  },
  // Get Shop Items
  getShopItems: function (url, user) {
    const params = { user: user };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return fetch(url, {
      headers: this.request_headers,
      method: 'GET',
    })
      .then(res => {
        return res.json();
      })
  }
} 
