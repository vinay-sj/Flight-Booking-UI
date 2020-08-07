import React from 'react';
import { Table } from 'reactstrap';

const PassengerRows = ({ passengers, actionButtons, index, toggle }) => {
	const passengerRows = (passengers || []).map((passenger, passIndex) => {
		const birthDate = new Date(passenger.birthDate);
		index = index || 0;
		const actionbutton = actionButtons(passIndex, index, toggle);
		return (
			<tr key={passIndex}>
				<td>{passIndex + 1}</td>
				<td>{passenger.name}</td>
				<td>{passenger.gender}</td>
				<td>{birthDate.toLocaleDateString()}</td>
				<td>{passenger.emailId}</td>
				<td>{passenger.contactNo}</td>
				<td>{passenger.passPortNo}</td>
				<td>
					{actionbutton}
				</td>
			</tr>
		);
	});
	return <>{passengerRows}</>;
};

class PassengerListTable extends React.Component {

	render() {
		const { passengers, actionButtons, index, toggle } = this.props;
		console.log(passengers);
		return (
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
					<PassengerRows index={index} toggle={toggle} passengers={passengers} actionButtons={actionButtons} />
				</tbody>
			</Table>
		);
	}
}

export default PassengerListTable;