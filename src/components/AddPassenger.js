import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
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
				<Modal className='custom-modal-outer-class' contentClassName='custom-modal-class' role={'modal'} centered isOpen={modal} toggle={this.toggle}>
					<ModalHeader tag='div'>Please select one from the list of your previously saved list of Passengers</ModalHeader>
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