const axios = require('axios');

const searchString = 'New';

async function getPlaces(searchString){

  let data = await axios({
    method: 'GET',
    url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      'x-rapidapi-key': '94187e22cdmshb6f23878dd88f1bp184650jsn983460c6e381',
      useQueryString: true,
    },
    params: {
      query: searchString,
    },
  })
    .then((response) => {
      return response;
    })
    .then(({ data }) => {
      return(data);
    })
    .catch((error) => {
      console.log(error);
    });

  let newArray = data.Places.map(({ PlaceId, PlaceName }) => ({ PlaceId, PlaceName }))
  newArray = newArray.map((obj) => {
    obj.value = obj.PlaceId;
    obj.label = obj.PlaceName;      
    delete obj.PlaceName;
    delete obj.PlaceId;
    return obj;      
  });
  console.log(newArray);
  return newArray;
  //return places
}

getPlaces(searchString);

