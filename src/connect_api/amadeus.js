let Amadeus = require('amadeus');

let amadeus = new Amadeus({
  clientId: 'BASiQ482pDpwH5pvtUEAKlqDM0t4bqRF',
  clientSecret: 'M0zp5ikeGXsmD0Mc'
});

async function getitenaries(){

    let data = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: '2020-08-01',
        adults: '2'
    }).then(function(response){
      return(response.data);
    }).catch(function(responseError){
      console.log(responseError.code);
    });

    let itineraries = data.map(({itineraries}) => ({itineraries}));
    itineraries = itineraries.map(obj => {
        let val = obj.itineraries[0];
        return val;

    })

    let segments = itineraries.map(obj => {
        return obj.segments[0];
    })

    console.log(segments);
}

getitenaries();