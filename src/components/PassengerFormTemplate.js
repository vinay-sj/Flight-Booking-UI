import { FormGroup, Input, Jumbotron, Label, Row, FormFeedback, Col } from 'reactstrap';
import React from 'react';
import DatePicker from 'react-datepicker';

class PassengerFormTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			birthDate: new Date(),
			name: '',
			contactNo:'',
			emailId:'',
			gender:'',
			passPortNo:'',
		};
		this.updateBirthDate = this.updateBirthDate.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	updateBirthDate(date) {
		this.setState({
			birthDate: date,
		});
	}

	updateState(event) {
		const { name } = event.target;
		this.setState({
			[name]:event.target.value
		});
	}

	render() {
		const { onChange, index, onDatePickerChange, addPassenger } = this.props;
		let { passengerValue } = this.props;
		passengerValue = passengerValue || [];
		const { birthDate } = this.state;
		const passNo = index + 1 || '';
		const i = index || 0;

		return (
			<>
				<div className='row'>
					<div className='col-md-2 col-sm-8 col-8 col-form-label form-inline'>Add from Saved Passenger List</div>
					<div className='col-form-label form-inline'>{addPassenger}</div>
				</div>
				<Jumbotron key={index}>
					<FormGroup row>
						<Col id={index}>Passenger Details: {passNo}</Col>
					</FormGroup>
					<FormGroup row>
						<Col sm={12}>
							<Label for="name">Name</Label>
						</Col>
						<Col sm={12}>
							<Input
								type="text"
								name="name"
								id="name"
								value={passengerValue.name||this.state.name}
								placeholder="Name"
								onChange={(event) => {
									this.updateState(event);
									onChange(event, i);
								}}
							/>
						</Col>
					</FormGroup>
					<Row form>
						<Col className='col-6 col-sm-6'>
							<FormGroup >
								<Label for="gender">Gender</Label>
								<div>
									<Input
										type="select"
										id="gender"
										value={passengerValue.gender||this.state.gender}
										name="gender"
										onChange={(event) => {
											this.updateState(event);
											onChange(event, i);
										}}
									>
										<option>Select Gender</option>
										<option value={'M'}>Male</option>
										<option value={'F'}>Female</option>
									</Input>
								</div>
							</FormGroup>

						</Col>
						<Col className='col-6 col-sm-6'>
							<FormGroup>
								<Label for="birthDate">Birth Date</Label>
								<div sm={12}>
									<DatePicker
										id='birthDate'
										maxDate={new Date()}
										selected={(passengerValue.birthDate) ? new Date(passengerValue.birthDate) : birthDate}
										onChange={(date) => {
											this.updateBirthDate(date);
											onDatePickerChange(date, 'birthDate', i);
										}}
										className='custom-date-picker-css col-sm-12'
									/>
								</div>
							</FormGroup>
						</Col>
					</Row>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for="email">Email</Label>
								<div>
									<Input
										invalid={ this.props.validate.emailState }
										type="email"
										name="emailId"
										defaultValue={passengerValue.emailId||this.state.emailId}
										id="email"
										placeholder="Email"
										onBlur={(event) => {
											this.updateState(event);
											this.props.validateEmail(event, i);
										}}
									/>
									<FormFeedback>Please enter email in the proper format: wanda@maximoff.com</FormFeedback>
								</div>

							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="contact">Contact No</Label>
								<div>
									<Input
										//invalid={ this.state.validate.phoneState }
										type="text"
										name="contactNo"
										defaultValue={passengerValue.contactNo||this.state.contactNo}
										id="contact"
										placeholder="Contact No"
										onChange={(event) => {
											this.updateState(event);
											onChange(event, i);
										}}
									/>
									<FormFeedback>Please enter phone number in the proper format</FormFeedback>
								</div>
							</FormGroup>
						</Col>
					</Row>

					<FormGroup row>
						<Col sm={12}>
							<Label for="passport">Passport Number</Label>
						</Col>
						<Col sm={12}>
							<Input
								invalid={ this.props.validate.passState }
								type="text"
								name="passPortNo"
								id="passport"
								defaultValue={passengerValue.passPortNo||this.state.passPortNo}
								placeholder="Passport No"
								onBlur={(event) => {
									this.updateState(event);
									this.props.validatePassport(event, i);
								}}
							/>
							<FormFeedback>Please enter passport number in the proper format: AB1234567</FormFeedback>
						</Col>
					</FormGroup>
				</Jumbotron>
			</>
		);
	}
}

export default PassengerFormTemplate;
