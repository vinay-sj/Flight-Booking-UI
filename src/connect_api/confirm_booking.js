import axios from 'axios';

const ConfirmBookingCall = (reqBody) => {
	return axios({
		method: 'POST',
		url: 'http://localhost:5000/api/bookings/confirmBooking',
		// url: 'https://group-project-avengers-api.herokuapp.com/api/bookings/confirmBooking',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
		data: reqBody,
	});
};

export default ConfirmBookingCall;
