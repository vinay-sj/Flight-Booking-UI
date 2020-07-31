import React, { useState } from 'react';
import { Table, Button, Collapse } from 'reactstrap';

const json = require('../mock_json/retrieve_booking.json');
const bookingsNew = JSON.parse(JSON.stringify(json));
const bookingsPrev = JSON.parse(JSON.stringify(json));
const bookingsCancel = JSON.parse(JSON.stringify(json));

const BookingRow = (props) => {
	const { booking, index } = props;
	const passengerNames = booking.passengerDetails.map((passenger) => passenger.name).join(', ');
	const journeyDate = new Date(booking.journeyDate);
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{booking.flightNo}</td>
			<td>{booking.airlineName}</td>
			<td>{journeyDate.toDateString()}</td>
			<td>{passengerNames}</td>
		</tr>
	);
};

const BookingTable = ({ bookingsRows }) => {
	return (
		<Table responsive hover striped>
			<thead>
				<tr>
					<th>#</th>
					<th>Flight No.</th>
					<th>Airline Name</th>
					<th>Journey Date</th>
					<th>Passengers Name</th>
				</tr>
			</thead>
			<tbody>
				<BookingRows bookings={bookingsRows} />
			</tbody>
		</Table>
	);
};

const BookingRows = ({ bookings }) => {
	const bookingRows = bookings.map((booking, index) => <BookingRow key={booking._id} booking={booking} index={index} />);
	return <>{bookingRows}</>;
};

const Bookings = () => {
	const [isToggleNew, setisToggleNew] = useState(true);
	const [isTogglePrevious, setisTogglePrevious] = useState(false);
	const[isToggleCancel, setisToggleCancel] = useState(false);
	const toggleNew = () => setisToggleNew(!isToggleNew);
	const togglePrevious = () => setisTogglePrevious(!isTogglePrevious);
	const toggleCancel = () => setisToggleCancel(!isToggleCancel);

	return (
		<>
			<Button color="secondary" size="lg" onClick={toggleNew} block>
        Upcoming Bookings
			</Button>
			<Collapse isOpen={isToggleNew}>
				<BookingTable bookingsRows={bookingsNew} />
			</Collapse>
			<Button color="secondary" size="lg" onClick={togglePrevious} block>
        Previous Bookings
			</Button>
			<Collapse isOpen={isTogglePrevious}>
				<BookingTable bookingsRows={bookingsPrev} />
			</Collapse>
			<Button color='secondary' size='lg' onClick={toggleCancel} block>
				Cancelled Bookings
			</Button>
			<Collapse isOpen={isToggleCancel}>
				<BookingTable bookingsRows={bookingsCancel} />
			</Collapse>
		</>
	);
};

export default Bookings;
