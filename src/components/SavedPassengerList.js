import React from 'react';
import { Button, ButtonGroup, Modal, ModalFooter, ModalBody } from 'reactstrap';
import { Well, Glyphicon } from 'react-bootstrap';
import PassengerFormTemplate from './PassengerFormTemplate';
import { getPassengers, addPassenger, deletePassenger } from '../connect_api/passengers';
import PassengerListTable from "./PassengerListTable";

const ActionButtons = (props) => {
	const { deletePassengers, index} = props;
	const onDelete = () => {
		deletePassengers(index);
	};
	return(
		<ButtonGroup className="btn-group-sm">
			<Button><Glyphicon glyph="edit"/>Edit</Button>
			<Button onClick={onDelete}> <Glyphicon glyph="trash"/>Delete</Button>
		</ButtonGroup>
	);
}

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
		this.deletePassengers = this.deletePassengers.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	async savePassenger() {
		const { passengerDetails } = this.state;
		await addPassenger(passengerDetails[0]);
		await this.loadData();
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
							<PassengerFormTemplate onChange={this.onChange} onDatePickerChange={this.onDatePickerChange} addPassenger={null}/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.savePassenger}>Save</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</Well>
				<PassengerListTable passengers={passengerList} actionButtons={(index)=>{return (<ActionButtons index={index} deletePassengers={this.deletePassengers}/>)}} />
			</>
		);
	}
}

export default Passengers;