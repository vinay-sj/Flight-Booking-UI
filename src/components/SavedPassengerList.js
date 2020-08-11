import React from 'react';
import { Button, ButtonGroup, Modal, ModalFooter, ModalBody } from 'reactstrap';
import PassengerFormTemplate from './PassengerFormTemplate';
import { getPassengers, addPassenger, deletePassenger, editPassenger } from '../connect_api/passengers';
import PassengerListTable from './PassengerListTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {CustomLoaderSpinner} from './MobileCardView';

const ActionButtons = (props) => {
	const { deletePassengers, index, editPassengers } = props;
	const onDelete = () => {
		deletePassengers(index);
	};
	const onEdit = () => {
		editPassengers(index);
	};
	return (
		<ButtonGroup className="btn-group-sm">
			<Button className="btn btn-light buttonTheme" onClick={onEdit}>
				<FontAwesomeIcon icon={faEdit} />
			</Button>
			<Button className="btn btn-light buttonTheme" onClick={onDelete}>
				<FontAwesomeIcon icon={faTrashAlt} />
			</Button>
		</ButtonGroup>
	);
};

class Passengers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validate: {
				emailState: false,
				passState: false,
			},
			modal: false,
			editModal: false,
			passengerList: [],
			editPassengerList: [],
			editIndex: null,
		};

		this.savePassenger = this.savePassenger.bind(this);
		this.toggle = this.toggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onUpdateChange = this.onUpdateChange.bind(this);
		this.onDatePickerChange = this.onDatePickerChange.bind(this);
		this.onUpdateDatePickerChange = this.onUpdateDatePickerChange.bind(this);
		this.deletePassengers = this.deletePassengers.bind(this);
		this.loadData = this.loadData.bind(this);
		this.editPassengers = this.editPassengers.bind(this);
		this.updateEditPassenger = this.updateEditPassenger.bind(this);
		this.editToggle = this.editToggle.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassport = this.validatePassport.bind(this);
	}

	validateEmail(e){
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let { validate } = this.state;

		if (emailRex.test(e.target.value)) {
			validate.emailState = false;
			this.onChange(e);
		} else {
			validate.emailState = true;
		}

		this.setState({ validate });
	}

	validatePassport(e) {
		const passRex = /[A-Z]{2}[0-9]{7}/;
		let { validate } = this.state;

		if (passRex.test(e.target.value)) {
			validate.passState = false;
			this.onChange(e);
		} else {
			validate.passState = true;
		}

		this.setState({ validate });
	}

	async savePassenger() {
		const { passengerDetails } = this.state;
		await addPassenger(passengerDetails);
		this.setState({ passengerDetails:{} });
		await this.loadData();
		this.toggle();
	}

	async updateEditPassenger() {
		const { editPassengerList, editIndex } = this.state;
		console.log('edit');
		console.log(editPassengerList[editIndex]);
		await editPassenger(editPassengerList[editIndex]._id, editPassengerList[editIndex]);
		await this.loadData();
		this.editToggle();
		this.setState({ passengerDetails:{} });
		this.setState({ editIndex: null });
	}

	toggle() {
		const { modal } = this.state;
		this.setState({ modal: !modal });
	}

	editToggle() {
		const { editModal } = this.state;
		this.setState({ editModal: !editModal });
	}

	onUpdateChange(event, index) {
		const { name, value } = event.target;
		let newState = JSON.parse(JSON.stringify(this.state.editPassengerList));
		newState[index] = { ...newState[index], [name]: value };
		this.setState({
			editPassengerList: newState,
		});
	}

	onChange(event) {
		const { name, value } = event.target;
		this.setState({
			passengerDetails: { ...this.state.passengerDetails, [name]:value }
		});
	}

	onUpdateDatePickerChange(date, name, index) {
		let newState = JSON.parse(JSON.stringify(this.state.editPassengerList));
		newState[index] = { ...newState[index], [name]: date };
		this.setState({
			editPassengerList: newState,
		});
	}

	onDatePickerChange(date, name) {
		this.setState({
			passengerDetails: {...this.state.passengerDetails, [name]:date}
		});
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.passengers !== this.props.passengers) {
			this.loadData();
		}
	}

	async loadData() {
		const  passengerList = await getPassengers();
		await this.setState({ passengerList: passengerList });
		await this.setState({ editPassengerList: passengerList });
	}

	async deletePassengers(index) {
		const { passengerList } = this.state;
		await deletePassenger(passengerList[index]._id);
		await this.loadData();
	}

	editPassengers(index) {
		this.setState({ editIndex: index });
		this.editToggle();
	}

	render() {
		let isEnabled = false;
		if (this.state.passengerDetails) {
			isEnabled = Object.keys(this.state.passengerDetails).length >= 6 && !Object.values(this.state.validate).every(Boolean);
		}

		const { modal, editModal, passengerList, editIndex, editPassengerList } = this.state;

		return (
			<>
				<div style={{'paddingBottom': '10px'}} className="text-center btn-group-sm">
					Passenger List &nbsp;
					<Button className='btn btn-light buttonTheme' onClick={this.toggle}>
						<FontAwesomeIcon icon={faUser} /> Add
					</Button>
				</div>

				<Modal isOpen={modal} toggle={this.toggle}>
					<ModalBody>
						<PassengerFormTemplate
							onChange={this.onChange}
							onDatePickerChange={this.onDatePickerChange}
							addPassenger={null}
							validateEmail={this.validateEmail}
							validatePassport={this.validatePassport}
							validate={this.state.validate}
						/>
					</ModalBody>
					<ModalFooter>
						<Button disabled={!isEnabled} className="btn btn-light buttonTheme" color="primary" onClick={this.savePassenger}>
							Save
						</Button>{' '}
						<Button className="btn btn-light buttonTheme" color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<div className='font-weight-normal form-control-lg'>Saved Passenger List</div>
				{passengerList.length ? <PassengerListTable
					passengers={passengerList}
					actionButtons={(index) => {
						return <ActionButtons index={index} deletePassengers={this.deletePassengers} editPassengers={this.editPassengers} />;
					}}
				/> : (
					<div>
						<div>No data to display</div>
						<CustomLoaderSpinner/>
					</div>
				)}
				<Modal isOpen={editModal} toggle={this.editToggle}>
					<ModalBody>
						<PassengerFormTemplate
							onChange={this.onUpdateChange}
							index={editIndex}
							onDatePickerChange={this.onUpdateDatePickerChange}
							addPassenger={null}
							passengerValue={editPassengerList[editIndex]}
						/>
					</ModalBody>
					<ModalFooter>
						<Button className="btn btn-light buttonTheme" color="primary" onClick={this.updateEditPassenger}>
							Update
						</Button>{' '}
						<Button className="btn btn-light buttonTheme" color="secondary" onClick={this.editToggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default Passengers;
