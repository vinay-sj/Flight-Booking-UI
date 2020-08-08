import React from 'react';
import { Button, ButtonGroup, Modal, ModalFooter, ModalBody } from 'reactstrap';
import { Well, Glyphicon } from 'react-bootstrap';
import PassengerFormTemplate from './PassengerFormTemplate';
import { getPassengers, addPassenger, deletePassenger, editPassenger } from '../connect_api/passengers';
import PassengerListTable from './PassengerListTable';

const ActionButtons = (props) => {
	const { deletePassengers, index, editPassengers } = props;
	const onDelete = () => {
		deletePassengers(index);
	};
	const onEdit = () => {
		editPassengers(index);
	};
	return(
		<ButtonGroup className="btn-group-sm">
			<Button className='btn btn-light buttonTheme' onClick={onEdit}><Glyphicon glyph="edit"/>Edit</Button>
			<Button className='btn btn-light buttonTheme' onClick={onDelete}> <Glyphicon glyph="trash"/>Delete</Button>
		</ButtonGroup>
	);
};

class Passengers extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			modal:false,
			editModal: false,
			passengerList: [],
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
	}

	async savePassenger() {
		const { passengerDetails } = this.state;
		await addPassenger(passengerDetails);
		this.setState({passengerDetails:{}});
		await this.loadData();
		this.toggle();
	}

	async updateEditPassenger() {
		const { passengerList, editIndex } = this.state;
		console.log('edit');
		console.log(passengerList[editIndex]);
		await editPassenger(passengerList[editIndex]._id, passengerList[editIndex]);
		await this.loadData();
		this.editToggle();
		this.setState({passengerDetails:{}});
		this.setState({ editIndex: null });
	}

	toggle() {
		const { modal } = this.state;
		this.setState({ modal:!modal });
	}

	editToggle() {
		const { editModal } = this.state;
		this.setState({ editModal: !editModal });
	}

	onUpdateChange(event, index) {
		const { name, value } = event.target;
		let newState = JSON.parse(JSON.stringify(this.state.passengerList));
		newState[index] = { ...newState[index], [name]: value };
		this.setState({
			passengerList: newState,
		});
	}

	onChange(event) {
		const { name, value } = event.target;
		this.setState({
			passengerDetails: {...this.state.passengerDetails, [name]:value}
		});
	}

	onUpdateDatePickerChange(date, name, index) {
		let newState = JSON.parse(JSON.stringify(this.state.passengerList));
		newState[index] = { ...newState[index], [name]: date };
		this.setState({
			passengerList: newState,
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
		if(prevProps.passengers !== this.props.passengers) {
			this.loadData();
		}
	}

	async loadData() {
		const  passengerList  = await getPassengers();
		await this.setState({ passengerList:passengerList });
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
		const { modal, editModal, passengerList, editIndex } = this.state;

		return (
			<>
				<Well bsSize="small">
					<div className="text-center btn-group-sm">
            Passenger List{' '}
						<Button className='btn btn-light buttonTheme' onClick={this.toggle}><Glyphicon glyph="plus"/>Add</Button>
					</div>
					<Modal isOpen={modal} toggle={this.toggle}>
						<ModalBody>
							<PassengerFormTemplate onChange={this.onChange} onDatePickerChange={this.onDatePickerChange} addPassenger={null}/>
						</ModalBody>
						<ModalFooter>
							<Button className='btn btn-light buttonTheme' color="primary" onClick={this.savePassenger}>Save</Button>{' '}
							<Button className='btn btn-light buttonTheme' color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</Well>
				<PassengerListTable passengers={passengerList} actionButtons={(index)=>{return (<ActionButtons index={index} deletePassengers={this.deletePassengers} editPassengers={this.editPassengers} />);}} />
				<Modal isOpen={editModal} toggle={this.editToggle}>
					<ModalBody>
						<PassengerFormTemplate onChange={this.onUpdateChange} index={editIndex} onDatePickerChange={this.onUpdateDatePickerChange} addPassenger={null} passengerValue={passengerList[editIndex]} />
					</ModalBody>
					<ModalFooter>
						<Button className='btn btn-light buttonTheme' color="primary" onClick={this.updateEditPassenger}>Update</Button>{' '}
						<Button className='btn btn-light buttonTheme' color="secondary" onClick={this.editToggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default Passengers;