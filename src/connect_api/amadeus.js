let Amadeus = require('amadeus');

let amadeus = new Amadeus({
  clientId: 'BASiQ482pDpwH5pvtUEAKlqDM0t4bqRF',
  clientSecret: 'M0zp5ikeGXsmD0Mc'
});

export  default async function getitenaries(origin,destination,onwardDate, adults){
    let {data} = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: onwardDate,
        adults: adults
    })

    let flights = data.map((obj,key) => {
        let flight = {
            id: key,
            price: obj.price.grandTotal,
            departure : obj.itineraries[0].segments[0].departure,
            arrival : obj.itineraries[0].segments[0].arrival,
            duration : obj.itineraries[0].segments[0].duration.split('T')[1],
            carrierCode : obj.itineraries[0].segments[0].carrierCode,
            aircraft: obj.itineraries[0].segments[0].aircraft.code,
            numberOfStops: obj.itineraries[0].segments[0].numberOfStops
        };

        return flight;
    })
    // console.log(flights); // remove this later
    return(flights);
}

// getitenaries(origin,destination,onwardDate,adults);