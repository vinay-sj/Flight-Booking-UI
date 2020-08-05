import React from 'react';
import { Table, Button, Collapse } from 'reactstrap';
import { getOneWayBookings, getRoundTripBookings } from '../connect_api/bookings_list'

const BookingRowOne = (props) => {
	const { booking, index } = props;
	const passengerNames = (booking.names || []).map((name) => name).join(', ');
	const journeyDate = new Date(booking.onwardJourneyDate);
	return (
		<tr className='text-center'>
			<td>{index + 1}</td>
			<td>{booking.onwardFlightNo}</td>
			<td>{booking.onwardAirlineName}</td>
			<td>{journeyDate.toDateString()}</td>
			<td>{passengerNames}</td>
			<td>
				<Button>Cancel</Button>
			</td>
		</tr>
	);
};

const BookingRowReturn = (props) => {
	const { booking, index } = props;
	const passengerNames = (booking.names || []).map((name) => name).join(', ');
	const onwardJourneyDate = new Date(booking.onwardJourneyDate);
	const returnJourneyDate = new Date(booking.returnJourneyDate);
	return (
		<tr className='text-center'>
			<td>{index + 1}</td>
			<td>{booking.onwardFlightNo}</td>
			<td>{booking.onwardAirlineName}</td>
			<td>{onwardJourneyDate.toDateString()}</td>
			<td>{booking.returnFlightNo}</td>
			<td>{booking.returnAirlineName}</td>
			<td>{returnJourneyDate.toDateString()}</td>
			<td>{passengerNames}</td>
			<td>
				<Button>Cancel</Button>
			</td>
		</tr>
	);
};

const BookingTableOne = ({ bookingsRows }) => {
	return (
		<Table responsive hover striped>
			<thead>
				<tr className='text-center'>
					<th>#</th>
					<th>Flight No.</th>
					<th>Airline Name</th>
					<th>Journey Date</th>
					<th>Passengers Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<BookingRowsOne bookings={bookingsRows} />
			</tbody>
		</Table>
	);
};

const BookingTableReturn = ({ bookingsRows }) => {
	return (
		<Table responsive hover striped>
			<thead>
			<tr className='text-center'>
				<th>#</th>
				<th>Onward Flight No.</th>
				<th>Onward Airline Name</th>
				<th>Onward Journey Date</th>
				<th>Return Flight No.</th>
				<th>Return Airline Name</th>
				<th>Return Journey Date</th>
				<th>Passengers Name</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			<BookingRowsReturn bookings={bookingsRows} />
			</tbody>
		</Table>
	);
};


const BookingRowsOne = ({ bookings }) => {
	const bookingRows = (bookings || []).map((booking, index) => <BookingRowOne key={booking._id} booking={booking} index={index} />);
	return <>{bookingRows}</>;
};

const BookingRowsReturn = ({ bookings }) => {
	const bookingRows = (bookings || []).map((booking, index) => <BookingRowReturn key={booking._id} booking={booking} index={index} />);
	return <>{bookingRows}</>;
};

class Bookings extends React.Component {
	// const [isToggleOne, setisToggleOne] = useState(true);
	// const [isToggleRound, setisToggleRound] = useState(false);
	// // const[isToggleCancel, setisToggleCancel] = useState(false);
	// const toggleOne = () => setisToggleOne(!isToggleOne);
	// const toggleRound = () => setisToggleRound(!isToggleRound);
	// // const toggleCancel = () => setisToggleCancel(!isToggleCancel);
	constructor(props) {
		super(props);
		this.state = {
			isToggleOne:true,
			isToggleRound:true,
			bookingsOne: [],
			bookingsRound:[],
		}
		this.toggleOne = this.toggleOne.bind(this);
		this.toggleRound = this.toggleRound.bind(this);
	}

	toggleOne(){
		const { isToggleOne } = this.state;
		this.setState({ isToggleOne:!isToggleOne })
	}

	toggleRound(){
		const { isToggleRound } = this.state;
		this.setState({isToggleRound:!isToggleRound})
	}
	componentDidUpdate(prevProps) {
		if(prevProps.bookingsOne !== this.props.bookingsOne) {
			this.loadBookingsOne();
		}
		if(prevProps.bookingsRound !== this.props.bookingsRound) {
			this.loadBookingsRound();
		}
	}
	componentDidMount() {
		this.loadBookingsOne();
		this.loadBookingsRound();
	}

	async loadBookingsOne() {
		const bookingsOne = await getOneWayBookings();
		this.setState({ bookingsOne:bookingsOne });
	}

	async loadBookingsRound() {
		const bookingsRound = await getRoundTripBookings();
		this.setState({ bookingsRound:bookingsRound });
	}
	render() {
		const { isToggleOne, isToggleRound, bookingsOne, bookingsRound } = this.state;
		return (
			<>
				<Button color="secondary" size="lg" onClick={this.toggleOne} block>
					One Way Bookings
				</Button>
				<Collapse isOpen={isToggleOne}>
					<BookingTableOne bookingsRows={bookingsOne} />
				</Collapse>
				<Button color="secondary" size="lg" onClick={this.toggleRound} block>
					Round Trip Bookings
				</Button>
				<Collapse isOpen={isToggleRound}>
					<BookingTableReturn bookingsRows={bookingsRound} />
				</Collapse>
				{/*<Button color='secondary' size='lg' onClick={toggleCancel} block>*/}
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
