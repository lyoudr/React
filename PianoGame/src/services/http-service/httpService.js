export const HttpRequest = {
  // Get dishes from backend
  requesDishes: (url, data) => {
    console.log('called fetch!');
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json();
      })
  },
  //Upload User Image to backend
  uploadImg: (url, data) => {
    return fetch(url, {
      method: 'POST',
      body: data
    })
      .then(res => {
        return res.json();
      })
  },
  //Save personal data to backend
  savePersonal: (url, data) => {
    return fetch(url, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
  },
  // Count shortest path (Using params in Fetch)
  shortestPath: (url, data) => {
    return fetch(url, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: data
    })
    .then(res => {
      return res.json();
    });
  },
  // Select shop list items according to price range
  choosePrice: (url, price_range) => {
    return fetch(url, {
      headers : {
        'content-type' : 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({price : price_range})
    })
    .then(res => {
      return res.json();
    })
  },
  // Check Out
  checkOut:(url, selected_items) =>{
    console.log('selected_item is =>', selected_items);
    return fetch(url, {
      headers : {
        'content-type' : 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(selected_items)
    })
    .then(res => {
      return res.json();
    })
  },
  // Get Shop Items
  getShopItems: (url, user) => {
    const params = {user : user};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return fetch(url, {
      headers : {
        'content-type' : 'application/json'
      },
      method : 'GET',
    })
    .then(res => {
      return res.json();
    })
  }
} 
