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
			passenger.passPortNo, null
		];

		return window.innerWidth > 620 ? (
			<tr key={passIndex}>
				<td>{passIndex + 1}</td>
				{valuesArray.map((item, index) => {
					return item && <td key={index}>{item}</td>;
				})}
				<td>{actionbutton}</td>
			</tr>
		) : (
			<MobileCardView
				key={passIndex}
				keysArray={keysArray}
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
						 <th className='font-weight-normal' >#</th>
						{keysArray.map((item, index) => {return  <th className='font-weight-normal'  key={index}>{item}</th>;})}
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
