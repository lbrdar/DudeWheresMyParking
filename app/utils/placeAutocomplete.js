import config from '../config';

const googleApiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const apiKey = config.googleAPIKey;

const placeAutocomplete = {

  queryWithBias(queryString, userPosition, radius = 10000, types = 'address') {  // bias to 10km around user's position and return only full address places

    if (!queryString) return Promise.reject(new Error('Provided query is invalid'));
    if (!userPosition) return Promise.reject(new Error('User position should be provided'));

    const url = `${googleApiUrl}?key=${apiKey}&input=${queryString}&location=${userPosition.latitude},${userPosition.longitude}&radius=${radius}&types=${types}`;

    return fetch(url).then(response => { // eslint-disable-line no-undef
      return response.json().then(json => {
        if (json.status === 'OK') {
          return json.predictions;
        }
        else {
          return Promise.reject(new Error(`Server returned status code ${json.status}`));
        }
      }).catch((err) => {
          return Promise.reject(new Error(`Error parsing server response: ${err.message}`));
        }
      );

    }).catch((err) => {
      return Promise.reject(new Error(`Error fetching data: ${err.message}`));
    });
  }
};

export default placeAutocomplete;