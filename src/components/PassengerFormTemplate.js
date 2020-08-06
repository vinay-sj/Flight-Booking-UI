import { FormGroup, Input, Jumbotron, Label, Row } from 'reactstrap';
import React from 'react';
import DatePicker from 'react-datepicker';

class PassengerFormTemplate extends React.Component {
	constructor() {
		super();
		this.state = {
			birthDate: new Date(),
		};
		this.updateBirthDate = this.updateBirthDate.bind(this);
	}

	updateBirthDate(date) {
		this.setState({
			birthDate: date,
		});
	}

	render() {
		const { onChange, index, onDatePickerChange, addPassenger } = this.props;
		const { birthDate } = this.state;
		const passNo = index + 1 || '';
		const i = index || 0;
		return (
			<Jumbotron key={index}>
				<FormGroup row>
					<div id={index}>Passenger Details: {passNo}  {addPassenger}</div>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="name">Name</Label>
					</Row>
					<Row>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Name"
							onChange={(event) => {
								onChange(event, i);
							}}
						/>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="gender">Gender</Label>
					</Row>
					<Row>
						<div>
							<select
								type="text"
								id="gender"
								name="gender"
								onChange={(event) => {
									onChange(event, i);
								}}
							>
								<option value="---">Select a gender</option>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</div>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="birthDate">Birth Date</Label>
					</Row>
					<Row>
						<DatePicker
							selected={birthDate}
							onChange={(date) => {
								this.updateBirthDate(date);
								onDatePickerChange(date, 'birthDate', i);
							}}
						/>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="email">Email</Label>
					</Row>
					<Row>
						<Input
							type="email"
							name="emailId"
							id="email"
							placeholder="Email"
							onChange={(event) => {
								onChange(event, i);
							}}
						/>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="contact">Contact No</Label>
					</Row>
					<Row>
						<Input
							type="number"
							name="contactNo"
							id="contact"
							placeholder="Contact No"
							onChange={(event) => {
								onChange(event, i);
							}}
						/>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="passport">Passport</Label>
					</Row>
					<Row>
						<Input
							type="text"
							name="passPortNo"
							id="passport"
							placeholder="Passport No"
							onChange={(event) => {
								onChange(event, i);
							}}
						/>
					</Row>
				</FormGroup>
			</Jumbotron>
		);
	}
}

export default PassengerFormTemplate;
