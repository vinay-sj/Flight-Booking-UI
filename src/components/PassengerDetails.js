import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Form } from 'reactstrap';
// import { Select } from 'react-select'
import ConfirmBookingCall from '../connect_api/confirm_booking';
// import { LinkContainer } from 'react-router-bootstrap';
import PassengerForm from './PassengerForm';

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
		this.onChange = this.onChange.bind(this);
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

	onChange(event, index) {
		const { name } = event.target;
		let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
		newState[index] = { ...newState[index], [name]: event.target.value };
		this.setState({
			passengerDetails: newState,
		});
	}

	render() {
		const { numPassengers } = this.state;
		const passengerForm = Array.apply(null, { length: numPassengers }).map((e, index) => {
			return <PassengerForm key={index} onChange={this.onChange} index={index} />;
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
