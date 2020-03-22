export const HttpRequest = {
    // Get dishes from backend
    requesDishes: (url , data) => {
        console.log('called fetch!');
        return fetch(url,{
            method : 'POST',
            mode : 'cors',
            credentials : 'same-origin',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            return res.json();
        })
    },
    //Upload User Image to backend
    uploadImg : (url, data) => {
        return fetch(url, {
            method: 'POST',
            body: data
        }) 
        .then(res => {
            return res.json();
        })
    },
    //Save personal data to backend
    savePersonal : (url, data) => {
        return fetch(url, {
            headers: {
                'content-type': 'application/json'
            },
            method : 'POST',
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
    },
    // Count shortest path (Using params in Fetch)
    shortestPath: (url, data) =>{
        return fetch(url, {
            headers: {
                'content-type': 'application/json'
            },
            method : 'POST',
            body: data
        })
        .then(res => {
            return res.json();
        });
    }
} 
