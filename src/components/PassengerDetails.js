import React from 'react';
// import { useHistory } from 'react-router-dom';

import {Button, Form, Modal, ModalHeader, ModalFooter, ModalBody, ButtonGroup} from 'reactstrap';
// import { Select } from 'react-select'
import ConfirmBookingCall from '../connect_api/confirm_booking';
import { LinkContainer } from 'react-router-bootstrap';
import PassengerFormTemplate from './PassengerFormTemplate';
import AddPassenger from './AddPassenger';
import {getPassengers} from '../connect_api/passengers';
import {Glyphicon} from 'react-bootstrap';

const ActionButtons = (props) => {
	const { selectPassengers, passIndex, index, toggle } = props;
	const onSelect = () => {
		selectPassengers(passIndex, index, toggle);
	};
	return(
		<ButtonGroup className="btn-group-sm">
			<Button className='buttonTheme' onClick={onSelect}> <Glyphicon glyph="ok"/>Select</Button>
		</ButtonGroup>
	);
};

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
		this.selectPassengers = this.selectPassengers.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userData !== this.props.userData) {
			this.setState({ userEmail: this.props.userData ? this.props.userData.profileObj.email : null });
		}
		if(prevProps.passengerList !== this.props.passengerList) {
			this.loadData();
		}
	}

	componentDidMount() {
		this.setState({ userEmail: this.props.userData ? this.props.userData.profileObj.email : null });
		this.loadData();
	}

	async loadData() {
		const  passengerList  = await getPassengers();
		await this.setState({ passengerList: passengerList });
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

	selectPassengers(passIndex, index, toggle) {
		const { passengerList } = this.state;
		let newState = JSON.parse(JSON.stringify(this.state.bookingDetails.passengerDetails));
		const passenger = passengerList[passIndex];
		newState[index] = { ...newState[index], ...passenger };
		this.setState({
			bookingDetails: {...this.state.bookingDetails, passengerDetails: newState},
		});
		toggle();
	}

	render() {
		const { numPassengers, passengerDetails } = this.state.bookingDetails;
		const { passengerList } = this.state;
		const addPassengers = (index) => <AddPassenger
			index={index}
			passengers={passengerList}
			actionButtons={(passIndex, index, toggle) => {
				return (
					<ActionButtons
						index={index}
						passIndex={passIndex}
						toggle={toggle}
						selectPassengers={this.selectPassengers}
					/>
				);
			}}
		/>;
		const passengerForm = Array.apply(null, { length: numPassengers }).map((e, index) => {
			return <PassengerFormTemplate
				key={index}
				onChange={this.onChange}
				onDatePickerChange={this.onDatePickerChange}
				index={index}
				addPassenger={addPassengers(index)}
				passengerValue={passengerDetails[index]}
			/>;
		});

		return (
			<Form>
				{passengerForm}
				<Button className='buttonTheme' onClick={() => this.setState({openModal: true})}>Confirm</Button>
				{this.state.openModal ? (
					<Modal size='lg' isOpen={this.state.openModal} toggle={() => this.setState({openModal: false})}>
						<ModalHeader toggle={() => this.setState({openModal: false})}>Confirm Booking</ModalHeader>
						<ModalBody>{!this.props.userData ? 'Please Login first to confirm booking' : 'Do you really want to confirm Booking'}</ModalBody>
						<ModalFooter>
							{!this.props.userData ? (
								<Button className='buttonTheme' color='primary' onClick={() => this.setState({openModal: false})}>Ok</Button>
							) : (
								<div>
									<LinkContainer to='/bookingConfirmation'>
										<Button className='buttonTheme' color='primary' onClick={this.confirmBooking}>Confirm</Button>
									</LinkContainer>{' '}
									<Button className='buttonTheme' color='secondary' onClick={() => this.setState({openModal: false})}>Cancel</Button>
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
