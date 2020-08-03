import React from 'react';
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
// import { Select } from 'react-select'
import ConfirmBookingCall from '../connect_api/confirm_booking';
import { LinkContainer } from 'react-router-bootstrap';
import PassengerForm from "./PassengerForm";

class PassengerDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onwardFlightDetails: {
				journeyDate: props.bookingDetails.onwardFlightDetails.departure.at,
				flightNo: props.bookingDetails.onwardFlightDetails.carrierCode.concat('-').concat(props.bookingDetails.onwardFlightDetails.aircraft),
				airlineName: props.bookingDetails.onwardFlightDetails.carrierCode.concat(' Airlines'),
			},
			isRoundTrip: props.bookingDetails.isRoundTrip,
			numPassengers: props.numPassengers,
			passengerDetails: [],
		};
		if (this.state.isRoundTrip) {
			this.state.returnFlightDetails = {
				journeyDate: props.bookingDetails.returnFlightDetails.departure.at,
				flightNo: props.bookingDetails.returnFlightDetails.carrierCode.concat('-').concat(props.bookingDetails.returnFlightDetails.aircraft),
				airlineName: props.bookingDetails.returnFlightDetails.carrierCode.concat(' Airlines'),
			};
		}
		this.confirmBooking = this.confirmBooking.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	confirmBooking() {
		ConfirmBookingCall(this.state).then((res) => {
			this.props.updateBookingDetails(res, true);
		});
	}

	onChange(event,index) {
		const {name} = event.target;
		let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
		newState[index] = { ...newState[index], [name]: event.target.value };
		this.setState({
			passengerDetails: newState,
		});
	}

	render() {
		const { numPassengers } = this.state;
		const passengerForm = Array.apply(null, { length: numPassengers }).map((e, index) => {
			return (
				<PassengerForm onChange={this.onChange} index={index}/>
			);
		});

		return (
			<Form>
				{passengerForm}
				<LinkContainer to={'/bookingConfirmation'}>
					<Button onClick={this.confirmBooking}>Confirm</Button>
				</LinkContainer>
			</Form>
		);
	}
}

export default PassengerDetails;
