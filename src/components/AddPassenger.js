import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PassengerListTable from './PassengerListTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class AddPassenger extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			modal: false,
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({ modal:!this.state.modal });
	}

	render() {
		const { modal } = this.state;
		const { passengers, actionButtons, index } = this.props;
		return(
			<>
				<Button className='btn btn-light buttonTheme' onClick={this.toggle}>{' '}<FontAwesomeIcon icon={faUser}/>{' '}Add</Button>
				<Modal isOpen={modal} toggle={this.toggle}>
					<ModalBody>
						<PassengerListTable index={index} toggle={this.toggle} passengers={passengers} actionButtons={actionButtons}/>
					</ModalBody>
					<ModalFooter>
						<Button className='btn btn-light buttonTheme' color='secondary' onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default AddPassenger;