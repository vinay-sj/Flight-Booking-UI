import React from 'react';
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
// import { Select } from 'react-select'
import ConfirmBookingCall from '../connect_api/confirm_booking';

class PassengerDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			journeyDate: props.bookingDetails.departure.at,
			flightNo: props.bookingDetails.carrierCode.concat('-').concat(props.bookingDetails.aircraft),
			airlineName: props.bookingDetails.carrierCode.concat(' Airlines'),
			numPassengers: props.numPassengers,
			passengerDetails: []
		};
		this.confirmBooking = this.confirmBooking.bind(this);
	}

	confirmBooking() {
		ConfirmBookingCall(this.state).then((res) => {
			console.log(res);
			this.props.updateBookingDetails(res, true);
		});
	}

	render() {
		const { numPassengers } = this.state;
		const passengerForm = Array.apply(null, { length: numPassengers }).map((e,i) => {
			return (
				<Jumbotron key={i}>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Name"
							onChange={(event) => {
								let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
								newState[i]= { ...newState[i], name:event.target.value };
								this.setState({
									passengerDetails: newState
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
									newState[i]= { ...newState[i], gender:event.target.value };
									this.setState({
										passengerDetails: newState
									});
								}}>
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
								newState[i]= { ...newState[i], birthDate:event.target.value };
								this.setState({
									passengerDetails: newState
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
								newState[i]= { ...newState[i], emailId:event.target.value };
								this.setState({
									passengerDetails: newState
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
								newState[i]= { ...newState[i], contactNo:event.target.value };
								this.setState({
									passengerDetails: newState
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
								newState[i]= { ...newState[i], passPortNo:event.target.value };
								this.setState({
									passengerDetails: newState
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
				<Button onClick={this.confirmBooking}>Confirm</Button>
			</Form>
		);
	}
}

export default PassengerDetails;
