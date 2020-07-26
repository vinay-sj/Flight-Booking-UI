const axios = require('axios');

axios({
  method: 'GET',
  url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    'x-rapidapi-key': '94187e22cdmshb6f23878dd88f1bp184650jsn983460c6e381',
    useQueryString: true,
  },
  params: {
    query: 'Stockholm',
  },
})
  .then((response) => {
    return response;
  })
  .then(({ data }) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
