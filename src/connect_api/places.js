const axios = require('axios');

// let Amadeus = require('amadeus');

// let amadeus = new Amadeus({
// 	clientId: 'BASiQ482pDpwH5pvtUEAKlqDM0t4bqRF',
// 	clientSecret: 'M0zp5ikeGXsmD0Mc',
// });

//const searchString = 'New';

export async function getPlaces(searchString){

	let data = await axios({
		method: 'GET',
		url: process.env.REACT_APP_RAPIDAPI_URL,
		headers: {
			'content-type': 'application/octet-stream',
			'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
			'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
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

	let newArray = data.Places.map(({ PlaceId, PlaceName }) => ({ PlaceId, PlaceName }));
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

//getPlaces(searchString);

// export async function getPlaces(searchString) {
// //async function getPlaces(searchString) {
// 	let airports;
// 	try {
// 		let data;
// 		data = await amadeus.referenceData.locations
// 			.get({
// 				keyword: searchString,
// 				subType: Amadeus.location.any,
// 			})
// 			.then(({ data }) => {
// 				return data;
// 			});

// 		const filters = {
// 			subType: 'AIRPORT',
// 		};

// 		airports = data.filter((airport) => Object.entries(filters).every(([key, val]) => (val !== '' ? airport[key] === val : true)));

// 		airports = airports.map(({ detailedName, iataCode }) => ({ detailedName, iataCode }));
// 		airports = airports.map((obj) => {
// 			obj.value = obj.iataCode;
// 			obj.label = obj.detailedName;
// 			delete obj.iataCode;
// 			delete obj.detailedName;
// 			return obj;
// 		});
// 		//console.log(airports);
// 	} catch (err) {
// 		console.log(err);
// 	}
// 	return airports;

// }


//getPlaces('san');
