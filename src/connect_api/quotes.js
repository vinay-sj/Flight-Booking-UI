const axios = require('axios');

axios({
  method: 'GET',
  url:
    'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-09-01',
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    'x-rapidapi-key': '94187e22cdmshb6f23878dd88f1bp184650jsn983460c6e381',
    useQueryString: true,
  },
  params: {
    inboundpartialdate: '2019-12-01',
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
