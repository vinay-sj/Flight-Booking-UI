import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PassengerListTable from './PassengerListTable';

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
				<Button className='buttonTheme' onClick={this.toggle}>Add</Button>
				<Modal isOpen={modal} toggle={this.toggle}>
					<ModalBody>
						<PassengerListTable index={index} toggle={this.toggle} passengers={passengers} actionButtons={actionButtons}/>
					</ModalBody>
					<ModalFooter>
						<Button className='buttonTheme' color='secondary' onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default AddPassenger;