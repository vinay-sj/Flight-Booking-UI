import { FormGroup, Input, Jumbotron, Label } from 'reactstrap';
import React from 'react';

const PassengerForm = (props) => {
	const { onChange, index } = props;
	return (
		<Jumbotron key={index}>
			<FormGroup>
				<div id={index}>Passenger Details: {index + 1}</div>
			</FormGroup>
			<FormGroup>
				<Label for="name">Name</Label>
				<Input
					type="text"
					name="name"
					id="name"
					placeholder="Name"
					onChange={(event) => {
						onChange(event,index);
					}}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="gender">Gender</Label>
				<div>
					<select
						type="text"
						id="gender"
						name="gender"
						onChange={(event) => {
							onChange(event,index);
						}}
					>
						<option value="---">Select a value</option>
						<option value="M">Male</option>
						<option value="F">Female</option>
					</select>
				</div>
			</FormGroup>
			<FormGroup>
				<Label for="birthDate">Birth Date</Label>
				<Input
					type="date"
					name="birthDate"
					id="birthDate"
					placeholder="Birth Date"
					onChange={(event) => {
						onChange(event,index);
					}}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="email">Email</Label>
				<Input
					type="email"
					name="emailId"
					id="email"
					placeholder="Email"
					onChange={(event) => {
						onChange(event,index);
					}}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="contact">Contact No</Label>
				<Input
					type="number"
					name="contactNo"
					id="contact"
					placeholder="Contact No"
					onChange={(event) => {
						onChange(event,index);
					}}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="passport">Passport</Label>
				<Input
					type="text"
					name="passPortNo"
					id="passport"
					placeholder="Passport No"
					onChange={(event) => {
						onChange(event,index);
					}}
				/>
			</FormGroup>
		</Jumbotron>
	);
};
export default PassengerForm;