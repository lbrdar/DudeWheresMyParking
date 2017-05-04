import config from '../config';

const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';
const apiKey = config.googleAPIKey;

const geoCoder = {


  getFromLocation(address) {

    if (!address) {
      return Promise.reject(new Error('Provided address is invalid'));
    }

    const url = `${googleApiUrl}?key=${apiKey}&address=${encodeURI(address)}`;

    return fetch(url).then(response => { // eslint-disable-line no-undef
      return response.json().then(json => {
        if (json.status === 'OK') {
          return json.results;
        }
        else {
          return Promise.reject(new Error(`Server returned status code ${json.status}`));
        }
      }).catch(() => {
          return Promise.reject(new Error('Error parsing server response'));
        }
      );

    }).catch(() => {
      return Promise.reject(new Error('Error fetching data'));
    });
  }
};

export default geoCoder;