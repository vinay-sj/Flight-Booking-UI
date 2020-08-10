import { FormGroup, Input, Jumbotron, Label, Row, FormFeedback, } from 'reactstrap';
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
			}
		};
		this.updateBirthDate = this.updateBirthDate.bind(this);
		this.updateState = this.updateState.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassport = this.validatePassport.bind(this);
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
			<Jumbotron key={index}>
				<FormGroup row>
					<div className='pt-2' id={index}>Passenger Details: {passNo} &nbsp;</div>
					<div>{addPassenger}</div>
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
							value={passengerValue.name||this.state.name}
							placeholder="Name"
							onChange={(event) => {
								this.updateState(event);
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
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="birthDate">Birth Date</Label>
					</Row>
					<Row>
						<DatePicker
							maxDate={new Date()}
							selected={(passengerValue.birthDate)?new Date(passengerValue.birthDate):birthDate}
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
						<Input
							invalid={ this.state.validate.emailState }
							type="email"
							name="emailId"
							defaultValue={passengerValue.emailId||this.state.emailId}
							id="email"
							placeholder="Email"
							onBlur={(event) => {
								this.updateState(event);
								this.validateEmail(event, i);
							}}
						/>
						<FormFeedback>Please enter email in the proper format: wanda@maximoff.com</FormFeedback>
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
							defaultValue={passengerValue.contactNo||this.state.contactNo}
							id="contact"
							placeholder="Contact No"
							onChange={(event) => {
								this.validatePassport(event, i);
								this.updateState(event);
								onChange(event, i);
							}}
						/>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Label for="passport">Passport Number</Label>
						<Input
							invalid={ this.state.validate.passState }
							type="text"
							name="passPortNo"
							id="passport"
							defaultValue={passengerValue.passPortNo||this.state.passPortNo}
							placeholder="Passport No"
							onBlur={(event) => {
								this.updateState(event);
								this.validatePassport(event, i);
							}}
						/>
						<FormFeedback>Please enter passport number in the proper format: AB1234567</FormFeedback>
					</Row>
				</FormGroup>
			</Jumbotron>
		);
	}
}

export default PassengerFormTemplate;
