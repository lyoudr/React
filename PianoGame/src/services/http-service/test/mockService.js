// Get dishes from backend
export const requestDish = (url, data) => {
  return new Promise((resolve, reject) => {
    if(data){
      resolve({ 'status': '200', 'message': 'ok', 'dishes': ["dish0", "dish3"] })
    } else {
      reject({ error: 'error dish'});
    }
  });
};

// Save personal data to backend
export const savePersonal = (url, data) => {
  return new Promise((resolve, reject) => {
    if(data.country == 'Taiwan' && data.gender == 'girl' && data.guide == 'Piano' && data.hobby == 'Play game' && data.job == 'F2E' && data.name == 'Ann' && data.userId == 'Ann'){
      resolve({status: '200', message: 'ok'});
    } else {
      reject({error: 'error'});
    }
  });
}
