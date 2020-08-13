import axios from 'axios';

const UI_API_ENDPOINT = process.env.REACT_APP_UI_API_ENDPOINT || 'http://localhost:5000';

export async function getRoundTripBookings() {
	let roundTripBookings;
	try {
		roundTripBookings = await axios({
			method: 'GET',
			url: `${UI_API_ENDPOINT}/api/bookings/roundTripBookings`,
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				return response;
			})
			.then(({ data }) => {
				return data;
			});

		roundTripBookings = roundTripBookings.filter((booking) => booking.isRoundTrip);

		roundTripBookings = roundTripBookings.map((obj) => {
			obj.names = obj.passengerDetails.map(({ name }) => name);
			obj.onwardFlightNo = obj.onwardFlightDetails.flightNo;
			obj.onwardAirlineName = obj.onwardFlightDetails.airlineName;
			obj.onwardJourneyDate = obj.onwardFlightDetails.journeyDate;
			obj.returnFlightNo = obj.returnFlightDetails.flightNo;
			obj.returnAirlineName = obj.returnFlightDetails.airlineName;
			obj.returnJourneyDate = obj.returnFlightDetails.journeyDate;
			delete obj.onwardFlightDetails;
			delete obj.returnFlightDetails;
			delete obj.passengerDetails;
			delete obj.__v;
			delete obj.bookingDate;
			return obj;
		});

		roundTripBookings = roundTripBookings.sort((a, b) => (a.onwardJourneyDate > b.onwardJourneyDate ? 1 : -1));
	} catch (err) {
		console.log(err);
	}
	return roundTripBookings || [];
}

export async function getOneWayBookings() {
	let oneWayBookings;
	try {
		oneWayBookings = await axios({
			method: 'GET',
			url: `${UI_API_ENDPOINT}/api/bookings/oneWayBookings`,
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				return response;
			})
			.then(({ data }) => {
				return data;
			});

		oneWayBookings = oneWayBookings.filter((booking) => !booking.isRoundTrip);

		oneWayBookings = oneWayBookings.map((obj) => {
			obj.names = obj.passengerDetails.map(({ name }) => name);
			obj.onwardFlightNo = obj.onwardFlightDetails.flightNo;
			obj.onwardAirlineName = obj.onwardFlightDetails.airlineName;
			obj.onwardJourneyDate = obj.onwardFlightDetails.journeyDate;
			if (obj.returnFlightDetails) {
				delete obj.returnFlightDetails;
			}
			delete obj.onwardFlightDetails;
			delete obj.passengerDetails;
			delete obj.__v;
			delete obj.bookingDate;
			return obj;
		});

		oneWayBookings = oneWayBookings.sort((a, b) => (a.onwardJourneyDate > b.onwardJourneyDate ? 1 : -1));
	} catch (err) {
		console.log(err);
	}
	return oneWayBookings || [];
}

export async function deleteBooking(isRoundTrip, id) {
	let success;
	let url;
	if (isRoundTrip) {
		url = `${UI_API_ENDPOINT}/api/bookings/deleteRoundTrip/`.concat('', id);
	} else {
		url = `${UI_API_ENDPOINT}/api/bookings/deleteOneWayTrip/`.concat('', id);
	}

	try {
		success = await axios({
			method: 'DELETE',
			url,
			withCredentials: true,
		}).then((response) => {
			return response;
		}, (err) => {return err;});
	} catch (err) {
		console.log(err);
	}
	return success;
}
