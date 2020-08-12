let Amadeus = require('amadeus');

let amadeus = new Amadeus({
	clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
	clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET,
});

export default async function getitenaries(origin, destination, onwardDate, adults) {
	try {
		let { data } = await amadeus.shopping.flightOffersSearch.get({
			originLocationCode: origin,
			destinationLocationCode: destination,
			departureDate: onwardDate,
			adults: adults,
		});

		let flights = data.map((obj, key) => {
			let flight = {
				id: key,
				price: obj.price.grandTotal,
				departure: obj.itineraries[0].segments[0].departure,
				arrival: obj.itineraries[0].segments[0].arrival,
				duration: obj.itineraries[0].segments[0].duration.split('T')[1],
				carrierCode: obj.itineraries[0].segments[0].carrierCode,
				aircraft: obj.itineraries[0].segments[0].aircraft.code,
				numberOfStops: obj.itineraries[0].segments[0].numberOfStops,
				destAirport: obj.itineraries[0].segments[0].arrival.iataCode,
			};

			return flight;
		});

		const filters = {
			destAirport: destination,
		};

		flights = flights.filter((flight) => Object.entries(filters).every(([key, val]) => (val !== '' ? flight[key] === val : true)));

		console.log(flights); // remove this later
		return flights;
	} catch (err) {
		console.log(err);
	}
}

//getitenaries('SFO','JFK','2020-08-15',1);
// getitenaries(origin,destination,onwardDate,adults);
