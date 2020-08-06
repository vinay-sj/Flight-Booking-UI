import React from 'react';
import { Table, Button, ButtonGroup, Modal, ModalFooter, ModalBody } from 'reactstrap';
import { Well, Glyphicon } from 'react-bootstrap';
import PassengerFormTemplate from './PassengerFormTemplate';
import { getPassengers, addPassenger, deletePassenger } from '../connect_api/passengers';

const PassengerRows = ({ passengers, deletePassenger }) => {
	const passengerRows = (passengers || []).map((passenger, index) => {
		const birthDate = new Date(passenger.birthDate);

		const onDelete = () => {
			deletePassenger(index);
		};

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
						<Button onClick={onDelete}> <Glyphicon glyph="trash"/>Delete</Button>
					</ButtonGroup>
				</td>
			</tr>
		);
	});
	return <>{passengerRows}</>;
};

class Passengers extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			modal:false,
			passengerDetails:[],
			passengerList: [],
		};

		this.savePassenger = this.savePassenger.bind(this);
		this.toggle = this.toggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onDatePickerChange = this.onDatePickerChange.bind(this);
		this.deletePassenger = this.deletePassenger.bind(this);
	}

	async savePassenger() {
		const { passengerDetails } = this.state;
		await addPassenger(passengerDetails[0]);
		this.loadData();
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

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.passengerList !== this.props.passengerList) {
			this.loadData();
		}
	}

	async loadData() {
		const  passengerList  = await getPassengers();
		this.setState({ passengerList:passengerList });
	}

	async deletePassenger(index) {
		const { passengerList } = this.state;
		await deletePassenger(passengerList[index]._id);
		this.loadData();
	}

	render() {
		const { modal, passengerList } = this.state;
		return (
			<>
				<Well bsSize="small">
					<div className="text-center btn-group-sm">
            Passenger List{' '}
						<Button onClick={this.toggle}><Glyphicon glyph="plus"/>Add</Button>
					</div>
					<Modal isOpen={modal} toggle={this.toggle}>
						<ModalBody>
							<PassengerFormTemplate onChange={this.onChange} onDatePickerChange={this.onDatePickerChange} />
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
						<PassengerRows passengers={passengerList} deletePassenger={this.deletePassenger} />
					</tbody>
				</Table>
			</>
		);
	}
}

export default Passengers;