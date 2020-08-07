const axios = require('axios');

export async function getPassengers()  {

	let passengers;
	try{
		passengers = await axios({
			method: 'GET',
			//url: 'http://localhost:5000/api/passengers/getPassenger',
			url: 'https://group-project-avengers-api.herokuapp.com/api/passengers/getPassenger',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
			}
		}).then((response) => {
			return response;
		})
			.then(({ data }) => {
				return(data);
			});


	}catch(err){
		console.log(err);
	}
	//console.log(passengers);
	return passengers;

}

export async function addPassenger(reqBody) {
	return axios({
		method: 'POST',
		//url: 'http://localhost:5000/api/passengers/addPassenger',
		url: 'https://group-project-avengers-api.herokuapp.com/api/passengers/addPassenger',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		},
		data: reqBody,
	});

}

export async function deletePassenger(id) {

	let success;
	//let url = 'http://localhost:5000/api/passengers/deletePassenger/'.concat('',id);
	let url = 'https://group-project-avengers-api.herokuapp.com/api/passengers/deletePassenger/'.concat('',id);
	try{
		success = await axios.delete(url).then((response) => {
			return response;
		});
	}
	catch(err){
		console.log(err);
	}
	console.log(success);
	return success;
}
