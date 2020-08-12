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
			validate: {
				emailState: false,
				passState: false,
				phoneState: false,
			}
		};
		this.updateBirthDate = this.updateBirthDate.bind(this);
		this.updateState = this.updateState.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassport = this.validatePassport.bind(this);
		this.validatePhone = this.validatePhone.bind(this);
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

	validateEmail(e, i){
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let { validate } = this.state;

		if (emailRex.test(e.target.value)) {
			validate.emailState = false;
			this.props.onChange(e, i);
			this.updateState(e);
		} else {
			validate.emailState = true;
		}
		this.setState({ validate });
	}

	validatePhone(e, i) {
		// eslint-disable-next-line no-useless-escape
		const phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		let { validate } = this.state;

		if (phoneRex.test(e.target.value)) {
			validate.phoneState = false;
			this.props.onChange(e, i);
			this.updateState(e);
		}else {
			validate.phoneState = true;
		}
		this.setState({ validate });
	}

	validatePassport(e, i) {
		const passRex = /[A-Z]{2}[0-9]{7}/;
		let { validate } = this.state;

		if (passRex.test(e.target.value)) {
			validate.passState = false;
			this.props.onChange(e, i);
			this.updateState(e);
		} else {
			validate.passState = true;
		}

		this.setState({ validate });
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
								defaultValue={passengerValue.name||this.state.name}
								placeholder="Name"
								onBlur={(event) => {
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
										defaultValue={passengerValue.gender||this.state.gender}
										name="gender"
										onBlur={(event) => {
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
										invalid={ this.state.validate.emailState }
										type="email"
										name="emailId"
										defaultValue={passengerValue.emailId||this.state.emailId}
										id="email"
										placeholder="Email"
										onBlur={(event) => {
											this.validateEmail(event, i);
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
										invalid={ this.state.validate.phoneState }
										type="number"
										name="contactNo"
										defaultValue={passengerValue.contactNo||this.state.contactNo}
										id="contact"
										placeholder="Contact No"
										onBlur={(event) => {
											this.validatePhone(event, i);
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
								invalid={ this.state.validate.passState }
								type="text"
								name="passPortNo"
								id="passport"
								defaultValue={passengerValue.passPortNo||this.state.passPortNo}
								placeholder="Passport No"
								onBlur={(event) => {
									this.validatePassport(event, i);
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
