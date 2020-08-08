const axios = require('axios');

export async function getPassengers()  {

	let passengers;
	try{
		passengers = await axios({
			method: 'GET',
			// url: 'http://localhost:5000/api/passengers/getPassenger',
			url: 'https://group-project-avengers-api.herokuapp.com/api/passengers/getPassenger',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
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
		// url: 'http://localhost:5000/api/passengers/addPassenger',
		url: 'https://group-project-avengers-api.herokuapp.com/api/passengers/addPassenger',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
		data: reqBody,
	});

}

export async function deletePassenger(id) {

	let success;
	// let url = 'http://localhost:5000/api/passengers/deletePassenger/'.concat('',id);
	let url = 'https://group-project-avengers-api.herokuapp.com/api/passengers/deletePassenger/'.concat('',id);
	try{
		success = await axios({
			method: 'DELETE',
			url,
			withCredentials: true,
		}).then((response) => {
			return response;
		});
	}
	catch(err){
		console.log(err);
	}
	console.log(success);
	return success;
}

export async function editPassenger(id,reqBody) {

	let success;
	// let url_put = 'http://localhost:5000/api/passengers/editPassenger/'.concat('',id);
	let url_put = 'https://group-project-avengers-api.herokuapp.com/api/passengers/editPassenger/'.concat('',id);
	try{
		success = await axios({
			method: 'PUT',
			url: url_put,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
			data: reqBody,
		});
	}catch(err){
		console.log(err);
	}
	//console.log(success);
	return success;
}