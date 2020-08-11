import React from 'react';
import { Table, Button } from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { getOneWayBookings, getRoundTripBookings, deleteBooking } from '../connect_api/bookings_list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {MobileCardView, CustomLoaderSpinner} from '../components/MobileCardView';
import Paginate from './Pagination.js';

const keysArrayOne = ['Flight No.', 'Airline Name', 'Journey Date', 'Passengers Name', 'Cancel Booking'];

const BookingRowOne = (props) => {
	const { booking, index, deleteBookings } = props;
	const passengerNames = (booking.names || []).map((name) => name).join(', ');
	const journeyDate = new Date(booking.onwardJourneyDate);

	const onDelete = (e) => {
		e.preventDefault();
		deleteBookings(false, index);
	};

	const valuesArrayOne = [booking.onwardFlightNo, booking.onwardAirlineName, journeyDate.toDateString(), passengerNames, null];

	return window.innerWidth > 620 ? (
		<tr className="text-center">
			<td>{index + 1}</td>
			{valuesArrayOne.map((item, index) => {
				return item && <td key={index}>{item}</td>;
			})}
			<td>
				<Button key={index} className="btn btn-light buttonTheme" onClick={onDelete}>
					<FontAwesomeIcon icon={faTimes} />
				</Button>
			</td>
		</tr>
	) : (
		<MobileCardView
			key={index}
			keysArray={keysArrayOne}
			valuesArray={valuesArrayOne}
			currentIndex={index}
			actionHandler={
				<Button key={index} className="btn btn-light buttonTheme" onClick={onDelete}>
					<FontAwesomeIcon icon={faTimes} />
				</Button>
			}
			primaryField={'Passengers Name'}
		/>
	);
};

const keysArrayRound = [
	'Onward Flight No.',
	'Onward Airline Name',
	'Onward Journey Date',
	'Return Flight No.',
	'Return Airline Name',
	'Return Journey Date',
	'Passengers Name',
	'Cancel Booking',
];

const BookingRowReturn = (props) => {
	const { booking, index, deleteBookings } = props;
	const passengerNames = (booking.names || []).map((name) => name).join(', ');
	const onwardJourneyDate = new Date(booking.onwardJourneyDate);
	const returnJourneyDate = new Date(booking.returnJourneyDate);

	const onDelete = (e) => {
		e.preventDefault();
		deleteBookings(true, index);
	};

	const valuesArrayRound = [
		booking.onwardFlightNo,
		booking.onwardAirlineName,
		onwardJourneyDate.toDateString(),
		booking.returnFlightNo,
		booking.returnAirlineName,
		returnJourneyDate.toDateString(),
		passengerNames,
		null,
	];

	return window.innerWidth > 620 ? (
		<tr className="text-center">
			<td>{index + 1}</td>
			{valuesArrayRound.map((item, index) => {
				return item && <td key={index}>{item}</td>;
			})}
			<td>
				<Button key={index} className="btn btn-light buttonTheme" onClick={onDelete}>
					<FontAwesomeIcon icon={faTimes} />
				</Button>
			</td>
		</tr>
	) : (
		<MobileCardView
			key={index}
			keysArray={keysArrayRound}
			valuesArray={valuesArrayRound}
			currentIndex={index}
			actionHandler={
				<Button key={index} className="btn btn-light buttonTheme" onClick={onDelete}>
					<FontAwesomeIcon icon={faTimes} />
				</Button>
			}
			primaryField={'Passengers Name'}
		/>
	);
};

const BookingTableOne = ({ bookingsRows, deleteBookings }) => {
	return window.innerWidth > 620 ? (
		(
			<Table responsive hover striped>
				<thead>
					<tr className="text-center">
						<th className="font-weight-normal">#</th>
						{keysArrayOne.map((item, index) => {
							return (
								<th className="font-weight-normal" key={index}>
									{item}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<BookingRowsOne bookings={bookingsRows} deleteBookings={deleteBookings} />
				</tbody>
			</Table>
		) || <div>No data to display</div>
	) : (
		<BookingRowsOne bookings={bookingsRows} deleteBookings={deleteBookings} />
	);
};

const BookingTableReturn = ({ bookingsRows, deleteBookings }) => {
	return window.innerWidth > 620 ? (
		<Table responsive hover striped>
			<thead>
				<tr className="text-center">
					<th className="font-weight-normal">#</th>
					{keysArrayRound.map((item, index) => {
						return (
							<th className="font-weight-normal" key={index}>
								{item}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				<BookingRowsReturn bookings={bookingsRows} deleteBookings={deleteBookings} />
			</tbody>
		</Table>
	) : (
		<BookingRowsReturn bookings={bookingsRows} deleteBookings={deleteBookings} />
	);
};

const BookingRowsOne = ({ bookings, deleteBookings }) => {
	const bookingRows = (bookings || []).map((booking, index) => (
		<BookingRowOne key={booking._id} booking={booking} index={index} deleteBookings={deleteBookings} />
	));
	return <>{bookingRows}</>;
};

const BookingRowsReturn = ({ bookings, deleteBookings }) => {
	const bookingRows = (bookings || []).map((booking, index) => (
		<BookingRowReturn key={booking._id} booking={booking} index={index} deleteBookings={deleteBookings} />
	));
	return <>{bookingRows}</>;
};

class Bookings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingsOne: [],
			bookingsRound: [],
		};
		this.deleteBookings = this.deleteBookings.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.bookingsOne !== this.props.bookingsOne) {
			this.loadBookingsOne();
		}
		if (prevProps.bookingsRound !== this.props.bookingsRound) {
			this.loadBookingsRound();
		}
	}
	componentDidMount() {
		this.loadBookingsOne();
		this.loadBookingsRound();
	}

	async loadBookingsOne() {
		const bookingsOne = await getOneWayBookings();
		console.log(bookingsOne);
		this.setState({ bookingsOne: bookingsOne });
	}

	async loadBookingsRound() {
		const bookingsRound = await getRoundTripBookings();
		console.log(bookingsRound);
		this.setState({ bookingsRound: bookingsRound });
	}

	async deleteBookings(isRoundTrip, index) {
		if (!isRoundTrip) {
			const { bookingsOne } = this.state;
			console.log(bookingsOne[index]);
			await deleteBooking(isRoundTrip, bookingsOne[index]._id);
			this.loadBookingsOne();
		} else {
			const { bookingsRound } = this.state;
			await deleteBooking(isRoundTrip, bookingsRound[index]._id);
			this.loadBookingsRound();
		}
	}

	render() {
		const { bookingsOne, bookingsRound } = this.state;
		return (
			<>
				<Tabs className="text-center" defaultActiveKey="oneWayBookings" id="previous-booking-details">
					<Tab tabClassName="col-6" eventKey="oneWayBookings" title="Forward Flights">
						{bookingsOne.length ? (
							<div>
								<BookingTableOne bookingsRows={bookingsOne} deleteBookings={this.deleteBookings} />
								<div><Paginate/></div>
							</div>
						) : (
							<div>
								<div>No data to display</div>
								<CustomLoaderSpinner/>
							</div>
						)}
					</Tab>
					<Tab tabClassName="col-6" eventKey="roundTripBookings" title="Return Flights">
						{bookingsRound.length ? (
							<div>
								<BookingTableReturn bookingsRows={bookingsRound} deleteBookings={this.deleteBookings} />
								<div><Paginate/></div>
							</div>
						) : (
							<div>
								<div>No data to display</div>
								<CustomLoaderSpinner/>
							</div>
						)}
					</Tab>
				</Tabs>
				{/* <Button className="btn btn-light buttonTheme" color="secondary" size="lg" onClick={this.toggleOne} block>
          One Way Bookings
				</Button>
				<Button className="btn btn-light buttonTheme" color="secondary" size="lg" onClick={this.toggleRound} block>
          Round Trip Bookings
				</Button> */}
				{/*<Button className='btn btn-light buttonTheme' color='secondary' size='lg' onClick={toggleCancel} block>*/}
				{/*	Cancelled Bookings*/}
				{/*</Button>*/}
				{/*<Collapse isOpen={isToggleCancel}>*/}
				{/*	<BookingTable bookingsRows={bookingsCancel} />*/}
				{/*</Collapse>*/}
			</>
		);
	}
}

export default Bookings;
