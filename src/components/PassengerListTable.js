import React from 'react';
import { Table } from 'reactstrap';
import MobileCardView from '../components/MobileCardView';

const keysArray = ['Name', 'Gender', 'Birth Date', 'Email', 'Contact No.', 'Passport No.', 'Actions'];

const PassengerRows = ({ passengers, actionButtons, index, toggle }) => {
	const passengerRows = (passengers || []).map((passenger, passIndex) => {
		const birthDate = new Date(passenger.birthDate);
		index = index || 0;
		const actionbutton = actionButtons(passIndex, index, toggle);

		const valuesArray = [
			passenger.name,
			passenger.gender,
			birthDate.toLocaleDateString(),
			passenger.emailId,
			passenger.contactNo,
			passenger.passPortNo,
		];

		return window.innerWidth > 620 ? (
			<tr key={passIndex}>
				<td>{passIndex + 1}</td>
				{valuesArray.map((item, index) => {
					return <td key={index}>{item}</td>;
				})}
				<td>{actionbutton}</td>
			</tr>
		) : (
			<MobileCardView
				key={passIndex}
				keysArray={keysArray.slice(0, 6)}
				valuesArray={valuesArray}
				actionHandler={actionbutton}
				currentIndex={passIndex}
				primaryField={'Name'}
			/>
		);
	});
	return <>{passengerRows}</>;
};

class PassengerListTable extends React.Component {
	render() {
		const { passengers, actionButtons, index, toggle } = this.props;
		console.log(passengers);
		return window.innerWidth > 620 ? (
			<Table responsive hover>
				<thead>
					<tr>
						<th>#</th>
						{keysArray.map((item, index) => {return <th key={index}>{item}</th>;})}
					</tr>
				</thead>
				<tbody>
					<PassengerRows index={index} toggle={toggle} passengers={passengers} actionButtons={actionButtons} />
				</tbody>
			</Table>
		) : (
			<PassengerRows index={index} toggle={toggle} passengers={passengers} actionButtons={actionButtons} />
		);
	}
}

export default PassengerListTable;
