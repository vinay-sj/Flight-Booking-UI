import React from 'react';
// import { useHistory } from 'react-router-dom';

import { Button, Form, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
// import { Select } from 'react-select'
import ConfirmBookingCall from '../connect_api/confirm_booking';
import { LinkContainer } from 'react-router-bootstrap';
import PassengerFormTemplate from './PassengerFormTemplate';

class PassengerDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingDetails: {
				userEmail: props.userData ? props.userData.profileObj.email : null,
				onwardFlightDetails: {
					journeyDate: props.bookingDetails.onwardFlightDetails.departure.at,
					flightNo: props.bookingDetails.onwardFlightDetails.carrierCode
						.concat('-')
						.concat(props.bookingDetails.onwardFlightDetails.aircraft),
					airlineName: props.bookingDetails.onwardFlightDetails.carrierCode.concat(' Airlines'),
				},
				isRoundTrip: props.bookingDetails.isRoundTrip,
				numPassengers: props.numPassengers,
				passengerDetails: [],
			},
			openModal: false
		};
		if (this.state.bookingDetails.isRoundTrip) {
			this.state.bookingDetails.returnFlightDetails = {
				journeyDate: props.bookingDetails.returnFlightDetails.departure.at,
				flightNo: props.bookingDetails.returnFlightDetails.carrierCode
					.concat('-')
					.concat(props.bookingDetails.returnFlightDetails.aircraft),
				airlineName: props.bookingDetails.returnFlightDetails.carrierCode.concat(' Airlines'),
			};
		}
		this.confirmBooking = this.confirmBooking.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onDatePickerChange = this.onDatePickerChange.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userData !== this.props.userData) {
			this.setState({ userEmail: this.props.userData ? this.props.userData.profileObj.email : null });
		}
	}

	confirmBooking() {
		ConfirmBookingCall(this.state.bookingDetails).then((res) => {
			this.props.updateBookingDetails(res, true);
		});
	}

	onChange(event, index) {
		const { name } = event.target;
		let newState = JSON.parse(JSON.stringify(this.state.bookingDetails.passengerDetails));
		newState[index] = { ...newState[index], [name]: event.target.value };
		this.setState({
			bookingDetails: {...this.state.bookingDetails, passengerDetails: newState},
		});
	}

	onDatePickerChange(date, name, index) {
		let newState = JSON.parse(JSON.stringify(this.state.bookingDetails.passengerDetails));
		newState[index] = { ...newState[index], [name]: date };
		this.setState({
			bookingDetails: {...this.state.bookingDetails, passengerDetails: newState},
		});
	}

	render() {
		const { numPassengers } = this.state.bookingDetails;
		const passengerForm = Array.apply(null, { length: numPassengers }).map((e, index) => {
			return <PassengerFormTemplate key={index} onChange={this.onChange} onDatePickerChange={this.onDatePickerChange} index={index} />;
		});

		return (
			<Form>
				{passengerForm}
				<Button onClick={() => this.setState({openModal: true})}>Confirm</Button>
				{this.state.openModal ? (
					<Modal isOpen={this.state.openModal} toggle={() => this.setState({openModal: false})}>
						<ModalHeader toggle={() => this.setState({openModal: false})}>Confirm Booking</ModalHeader>
						<ModalBody>{!this.props.userData ? 'Please Login first to confirm booking' : 'Do you really want to confirm Booking'}</ModalBody>
						<ModalFooter>
							{!this.props.userData ? (
								<Button color='primary' onClick={() => this.setState({openModal: false})}>Ok</Button>
							) : (
								<div>
									<LinkContainer to='/bookingConfirmation'>
										<Button color='primary' onClick={this.confirmBooking}>Confirm</Button>
									</LinkContainer>{' '}
									<Button color='secondary' onClick={() => this.setState({openModal: false})}>Cancel</Button>
								</div>
							)}
						</ModalFooter>
					</Modal>
				) : <div></div>}
			</Form>
		);
	}
}

export default PassengerDetails;
