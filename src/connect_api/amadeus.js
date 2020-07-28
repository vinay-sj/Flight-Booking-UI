let Amadeus = require('amadeus');

let origin = 'SYD';
let destination = 'BKK';
let onwardDate = '2020-08-01';
let adults = '2';

let amadeus = new Amadeus({
  clientId: 'BASiQ482pDpwH5pvtUEAKlqDM0t4bqRF',
  clientSecret: 'M0zp5ikeGXsmD0Mc'
});

async function getitenaries(origin,destination,onwardDate, adults){

    let data = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: onwardDate,
        adults: adults
    }).then(function(response){
      return(response.data);
    }).catch(function(responseError){
      console.log(responseError.code);
    });

    let flights = data.map((obj,key) => {
        let flight = {
            id: key,
            price: obj.price.grandTotal,
            departureDate : obj.itineraries[0].segments[0].departure.at.substring(0, 10),
            departureTime : obj.itineraries[0].segments[0].departure.at.substring(11, 19),
            arrivalDate : obj.itineraries[0].segments[0].arrival.at.substring(0, 10),
            arrivalTime : obj.itineraries[0].segments[0].arrival.at.substring(11, 19),
            duration : obj.itineraries[0].segments[0].duration.split('T')[1],
            carrierCode : obj.itineraries[0].segments[0].carrierCode,
            aircraft: obj.itineraries[0].segments[0].aircraft.code
        };

        return flight;
    })
    console.log(flights); // remove this later
    return(flights);
}

getitenaries(origin,destination,onwardDate,adults);