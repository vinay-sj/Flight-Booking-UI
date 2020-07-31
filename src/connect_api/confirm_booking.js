import axios from 'axios';

const ConfirmBookingCall = (reqBody) => {
	return axios({
		method: 'POST',
		url: 'http://localhost:5000/api/bookings/confirmBooking',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		},
		data: reqBody,
	});
};

export default ConfirmBookingCall;
