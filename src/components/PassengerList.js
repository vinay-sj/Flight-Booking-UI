import React from 'react';
import {Table, Button, ButtonGroup, Modal, ModalFooter, ModalBody} from 'reactstrap';
import {Well, Glyphicon} from 'react-bootstrap';
import PassengerForm from './PassengerForm';

const json = require('../mock_json/passenger.json');
const passengerDetail = JSON.parse(JSON.stringify(json));

const PassengerRows = ({ passengers }) => {
	const passengerRows = (passengers || []).map((passenger, index) => {
		const birthDate = new Date(passenger.birthDate);
		return (
			<tr key={index}>
				<td>{index + 1}</td>
				<td>{passenger.name}</td>
				<td>{passenger.gender}</td>
				<td>{birthDate.toLocaleDateString()}</td>
				<td>{passenger.emailId}</td>
				<td>{passenger.contactNo}</td>
				<td>{passenger.passPortNo}</td>
				<td>
					<ButtonGroup className="btn-group-sm">
						<Button><Glyphicon glyph="edit"/>Edit</Button>
						<Button> <Glyphicon glyph="trash"/>Delete</Button>
					</ButtonGroup>
				</td>
			</tr>
		);
	});
	return <>{passengerRows}</>;
};

class  Passengers extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			modal:false,
			passengerDetails:[]
		};

		this.savePassenger = this.savePassenger.bind(this);
		this.toggle = this.toggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onDatePickerChange = this.onDatePickerChange.bind(this);
	}

	savePassenger() {
		const { passengerDetails } = this.state;
		passengerDetail.push(passengerDetails[0]);
		this.setState({
			passengerDetails:[],
		});
		this.toggle();
	}

	toggle() {
		const { modal } = this.state;
		this.setState({ modal:!modal });
	}

	onChange(event,index) {
		const { name } = event.target;
		let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
		newState[index] = { ...newState[index], [name]: event.target.value };
		this.setState({
			passengerDetails: newState,
		});
	}

	onDatePickerChange(date, name, index) {
		let newState = JSON.parse(JSON.stringify(this.state.passengerDetails));
		newState[index] = { ...newState[index], [name]: date };
		this.setState({
			passengerDetails: newState,
		});
	}

	render() {
		const { modal } = this.state;
		return (
			<>
				<Well bsSize="small">
					<div className="text-center btn-group-sm">
            Passenger List{' '}
						<Button onClick={this.toggle}><Glyphicon glyph="plus"/>Add</Button>
					</div>
					<Modal isOpen={modal} toggle={this.toggle}>
						<ModalBody>
							<PassengerForm onChange={this.onChange} onDatePickerChange={this.onDatePickerChange} />
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.savePassenger}>Save</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</Well>

				<Table responsive hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Gender</th>
							<th>Birth Date</th>
							<th>Email</th>
							<th>Contact No.</th>
							<th>Passport No.</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<PassengerRows passengers={passengerDetail}/>
					</tbody>
				</Table>
			</>
		);
	}
}

export default Passengers;