import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron, Table } from 'reactstrap';
import getitenaries from '../connect_api/amadeus';


const FlightRow = (props) => {
	const { flight, index } = props;
	return (
		<tr className="text-center">
			<td>{index + 1}</td>
			<td>{flight.carrierCode.concat('-').concat(flight.aircraft)}</td>
			<td>
				<div>{flight.departure.iataCode}</div>
				<div>{new Date(flight.departure.at).toLocaleString()}</div>
			</td>
			<td>
				<div>{flight.arrival.iataCode}</div>
				<div>{new Date(flight.arrival.at).toLocaleString()}</div>
			</td>
			<td>{flight.numberOfStops}</td>
			<td>{flight.duration}</td>
			<td>{'$' + flight.price}</td>
			<td>
				<Button onClick={() => props.updateBookingDetails({ data: flight })}>Book</Button>
			</td>
		</tr>
	);
};

const FlightTable = ({ flights, updateBookingDetails, direction }) => {
	const flightRows = (flights||[]).map((flight, index) =>
		<FlightRow key={flight.id} flight={flight} index={index} updateBookingDetails={updateBookingDetails} />
	);
	if (!flights){
		return null;
	}
	else {
		return (
			<Col>
				<Jumbotron>
					<h5 className='text-center'>{direction}</h5>
					<Table responsive hover striped>
						<thead>
							<tr className="text-center">
								<th>#</th>
								<th>Flight Name</th>
								<th>Departure</th>
								<th>Arrival</th>
								<th>Stops</th>
								<th>Travel duration</th>
								<th>Price</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{flightRows}
						</tbody>
					</Table>
				</Jumbotron>
			</Col>
		);
	}
};

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			price: '',
			departure: '',
			arrival: '',
			flights_forward: null,
			flights_return: null,
		};
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.searchParams !== this.props.searchParams) {
			this.loadData();
		}
	}

	async loadData() {
		const { departureDate, returnDate, deptAirport, arrAirport, numPassengers } = this.props.searchParams;
		const data_forward = await getitenaries(deptAirport, arrAirport, departureDate, numPassengers);
		this.setState({
			flights_forward: data_forward,
		});
		if(returnDate) {
			const data_return = await getitenaries(arrAirport, deptAirport, returnDate, numPassengers);
			this.setState({
				flights_return: data_return,
			});
		}
	}

	render() {
		const { flights_forward, flights_return } = this.state;
		return (
			<>
				<h4 className="text-center">Available Flights</h4>
				<Jumbotron>
					<Form>
						<Row form>
							<Col md={3}>
								<FormGroup>
									<Label for="price">Price</Label>
									<Input
										type="number"
										min="0"
										name="price"
										id="price"
										placeholder="Price"
										onChange={(event) => this.setState({ price: event.target.value })}
									/>
								</FormGroup>
							</Col>
							<Col md={4}>
								<FormGroup>
									<Label for="departure">Departure</Label>
									<Input
										type="time"
										name="departure"
										id="departure"
										placeholder="Departure"
										onChange={(event) => this.setState({ departure: event.target.value })}
									/>
								</FormGroup>
							</Col>
							<Col md={4}>
								<FormGroup>
									<Label for="arrival">Arrival</Label>
									<Input
										type="time"
										name="arrival"
										id="arrival"
										placeholder="Arrival"
										onChange={(event) => this.setState({ arrival: event.target.value })}
									/>
								</FormGroup>
							</Col>
							<Col className="text-center">
								<br />
								<Button>Filter</Button>
							</Col>
						</Row>
					</Form>
				</Jumbotron>
				<Row>
					<FlightTable flights={flights_forward} updateBookingDetails={this.props.updateBookingDetails} direction={'Onward Journey'} />
					<FlightTable flights={flights_return} updateBookingDetails={this.props.updateBookingDetails} direction={'Return Journey'} />
				</Row>
			</>
		);
	}
}

export default Search;
