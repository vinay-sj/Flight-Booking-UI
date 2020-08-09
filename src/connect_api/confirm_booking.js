import axios from 'axios';

const UI_API_ENDPOINT = process.env.REACT_APP_UI_API_ENDPOINT || 'http://localhost:5000'

const ConfirmBookingCall = (reqBody) => {
	return axios({
		method: 'POST',
		url: `${UI_API_ENDPOINT}/api/bookings/confirmBooking`,
		// url: 'https://group-project-avengers-api.herokuapp.com/api/bookings/confirmBooking',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
		data: reqBody,
	});
};

export default ConfirmBookingCall;
