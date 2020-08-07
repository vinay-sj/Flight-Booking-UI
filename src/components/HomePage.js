/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { Col, Row, Button, Form, FormGroup, ButtonGroup, Label, Input } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SelectAsync from 'react-select/lib/Async';
import * as places from '../connect_api/places';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class HomePage extends React.Component {
	constructor(props) {
		const date = new Date();
		super(props);
		this.state = {
			rselected: 1,
			departureDate: date.toISOString().slice(0,10),
			returnDate: date.toISOString().slice(0,10),
			deptAirport: '',
			arrAirport: '',
			numPassengers: 1,
		};

		this.loadOptions = this.loadOptions.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReturnTrip = this.handleReturnTrip.bind(this);
		this.handleOneWayTrip = this.handleOneWayTrip.bind(this);
		this.handleArrAirportChange = this.handleArrAirportChange.bind(this);
		this.handleDeptAirportChange = this.handleDeptAirportChange.bind(this);
		this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
		this.handleReturnDateChange = this.handleReturnDateChange.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.handleNumPassengersChange = this.handleNumPassengersChange.bind(this);
	}

	async handleDepartureDateChange(date) {
		await this.setState({
			departureDate: date.toISOString().slice(0,10),
		});

		if (this.state.rselected === 1) {
			let dept = Date.parse(this.state.departureDate);
			let ret = Date.parse(this.state.returnDate);

			if (ret < dept) {
				this.setState({
					returnDate: date.toISOString().slice(0,10),
				});
			}
		}
	}

	handleReturnDateChange(date) {
		this.setState({
			returnDate: date.toISOString().slice(0,10),
		});
	}

	handleDeptAirportChange({ value }) {
		this.setState({
			deptAirport: value.split('-')[0]
			// deptAirport: value,
		});
	}
	handleArrAirportChange({ value }) {
		this.setState({
			arrAirport: value.split('-')[0]
			// arrAirport: value,
		});
	}

	handleNumPassengersChange(event) {
		this.setState({
			numPassengers: event.target.value,
		});
	}

	handleOneWayTrip() {
		const { departureDate } = this.state;
		this.setState({
			rselected: 1,
			returnDate: departureDate
		});
	}

	handleReturnTrip() {
		this.setState({
			rselected: 2,
			returnDate: null
		});
	}

	formatDate(date) {
		return Date.parse(date.concat('T00:00:00'));
	}

	async loadOptions(term) {
		if (term.length < 3) return [];
		try {
			const options = await places.getPlaces(term);
			return options;
		} catch (err) {
			console.log(err);
		}
	}

	async handleSubmit() {
		this.props.flightSearchParams(this.state);
	}

	render() {
		const isEnabled =
      this.state.rselected === 1
      	? this.state.departureDate && this.state.returnDate && this.state.deptAirport && this.state.arrAirport
      	: this.state.departureDate && this.state.deptAirport && this.state.arrAirport;

		return (
			<>
				<div>
					<h2> Search for flights</h2>
				</div>
				<div>
					<Form>
						<Row form>
							<FormGroup>
								{/* <TripTypeButton handleSelectedTripType={this.setRselected} rSelected={this.state.rselected} /> */}
								<ButtonGroup>
									<Button color="primary" onClick={this.handleOneWayTrip}>
                    Round Trip
									</Button>
									<Button color="secondary" onClick={this.handleReturnTrip}>
                    One Way
									</Button>
								</ButtonGroup>
							</FormGroup>
						</Row>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Label>From</Label>
									<SelectAsync
										loadOptions={this.loadOptions}
										filterOption={() => true}
										placeholder="Departure Airport"
										components={{ DropdownIndicator: null }}
										name="deptAirport"
										//value={this.state.deptAirport}
										onChange={this.handleDeptAirportChange}
									/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label>To</Label>
									<SelectAsync
										loadOptions={this.loadOptions}
										filterOption={() => true}
										placeholder="Arrival Airport"
										components={{ DropdownIndicator: null }}
										name="arrAirport"
										//value={this.state.arrAirport}
										onChange={this.handleArrAirportChange}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<Label>Departure</Label>
							</Col>
							{this.state.rselected !== 2 &&
								<Col md={3}>
									<Label for="exampleState">Return</Label>
								</Col>
							}
							<Col md={1}>
								<Label>Passengers</Label>
							</Col>
						</Row>
						<Row form>
							<Col md={3}>
								<FormGroup>
									<DatePicker
										minDate={new Date()}
										selected={this.formatDate(this.state.departureDate)}
										onChange={this.handleDepartureDateChange}
									/>
								</FormGroup>
							</Col>
							{this.state.rselected !== 2 &&
								<Col md={3}>
									<FormGroup>
										<DatePicker
											minDate={this.formatDate(this.state.departureDate)}
											selected={this.formatDate(this.state.returnDate)}
											onChange={this.handleReturnDateChange}
										/>
									</FormGroup>
								</Col>
							}
							<Col md={1}>
								<FormGroup>
									<Input
										type="number"
										id="numPassengers"
										name="numPassengers"
										value={this.numPassengers}
										onChange={this.handleNumPassengersChange}
										placeholder="1"
										min="1"
									/>
								</FormGroup>
							</Col>
						</Row>
						<LinkContainer to={'/search'}>
							<Button onClick={this.handleSubmit} disabled={!isEnabled}>
                Search
							</Button>
						</LinkContainer>
					</Form>
				</div>
			</>
		);
	}
}

export default HomePage;
