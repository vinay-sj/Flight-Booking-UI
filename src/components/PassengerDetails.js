import React from 'react';
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
// import { Select } from 'react-select'
import ConfirmBookingCall from '../connect_api/confirm_booking';
// import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';

/* Not using LinkContainer as it redirects to confirmation page even before successful POST call. Therefore using 'useHistory' instead */

let confirmBooking, history;

const ConfirmBookingButton = () => {
	history = useHistory();
	return <Button onClick={confirmBooking}>Confirm</Button>;
};

class PassengerDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
		};
		if (this.state.isRoundTrip) {
			this.state.returnFlightDetails = {
				journeyDate: props.bookingDetails.returnFlightDetails.departure.at,
				flightNo: props.bookingDetails.returnFlightDetails.carrierCode
					.concat('-')
					.concat(props.bookingDetails.returnFlightDetails.aircraft),
				airlineName: props.bookingDetails.returnFlightDetails.carrierCode.concat(' Airlines'),
			};
		}
		this.confirmBooking = this.confirmBooking.bind(this);
		confirmBooking = this.confirmBooking;
	}

	componentDidUpdate(prevProps) {
		if(prevProps.userData !== this.props.userData) {
			this.setState({userEmail: this.props.userData.profileObj.email});
		}
	}

	confirmBooking() {
		if (this.props.userData && this.props.userData.profileObj.email) {
			ConfirmBookingCall(this.state).then((res) => {
				this.props.updateBookingDetails(res, true);
				history.push('/bookingConfirmation');
			});
		} else {
			console.log('Please Login first');
		}
	}

	render() {
		const { numPassengers } = this.state;
		const passengerForm = Array.apply(null, { length: numPassengers }).map((e, i) => {
			return (
				<Jumbotron key={i}>
					<FormGroup>
						<div id={i}>Passenger Details: {i + 1}</div>
					</FormGroup>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Name"
							onChange={(event) => {
								let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
								newState[i] = { ...newState[i], name: event.target.value };
								this.setState({
									passengerDetails: newState,
								});
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="gender">Gender</Label>
						<div>
							<select
								type="text"
								id="gender"
								name="gender"
								onChange={(event) => {
									let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
									newState[i] = { ...newState[i], gender: event.target.value };
									this.setState({
										passengerDetails: newState,
									});
								}}
							>
								<option value="---">Select a value</option>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</div>
					</FormGroup>
					<FormGroup>
						<Label for="birthDate">Birth Date</Label>
						<Input
							type="date"
							name="birthDate"
							id="birthDate"
							placeholder="Birth Date"
							onChange={(event) => {
								let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
								newState[i] = { ...newState[i], birthDate: event.target.value };
								this.setState({
									passengerDetails: newState,
								});
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							onChange={(event) => {
								let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
								newState[i] = { ...newState[i], emailId: event.target.value };
								this.setState({
									passengerDetails: newState,
								});
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="contact">Contact No</Label>
						<Input
							type="number"
							name="contact"
							id="contact"
							placeholder="Contact No"
							onChange={(event) => {
								let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
								newState[i] = { ...newState[i], contactNo: event.target.value };
								this.setState({
									passengerDetails: newState,
								});
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="passport">Passport</Label>
						<Input
							type="text"
							name="passport"
							id="passport"
							placeholder="Passport No"
							onChange={(event) => {
								let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
								newState[i] = { ...newState[i], passPortNo: event.target.value };
								this.setState({
									passengerDetails: newState,
								});
							}}
						/>
					</FormGroup>
				</Jumbotron>
			);
		});

		return (
			<Form>
				{passengerForm}
				<ConfirmBookingButton />
			</Form>
		);
	}
}

export default PassengerDetails;
