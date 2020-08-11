import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';
import getitenaries from '../connect_api/amadeus';
import { LinkContainer } from 'react-router-bootstrap';
import {MobileCardView, CustomLoaderSpinner} from '../components/MobileCardView';
import PaginationComponent from 'react-reactstrap-pagination';

let displayedRecordsOneWay = {}, displayedRecordsRound = {}, numberofPages = 5;

const keysArray = ['Flight Name', 'From', 'Departure', 'To', 'Arrival', 'Stops', 'Travel Duration', 'Price'];
const bookingDetails = {};

let isValidSelectionHandler,
	isReturnValid = false,
	isOnwardSelected = false,
	isReturnSelected = false;

const handleBooking = (props) => {
	if (props.direction === 1) {
		bookingDetails.data = { ...bookingDetails.data, ...{ onwardFlightDetails: props.flight } };
		isOnwardSelected = true;
	} else {
		bookingDetails.data = { ...bookingDetails.data, ...{ returnFlightDetails: props.flight, isRoundTrip: true } };
		isReturnSelected = true;
	}
	isValidSelectionHandler(isReturnValid ? isReturnSelected && isOnwardSelected : isOnwardSelected);
};

const FlightRow = (props) => {
	const { flight, index } = props;

	const valuesArray = [
		flight.carrierCode.concat('-').concat(flight.aircraft),
		flight.departure.iataCode,
		new Date(flight.departure.at).toLocaleString(),
		flight.arrival.iataCode,
		new Date(flight.arrival.at).toLocaleString(),
		flight.numberOfStops,
		flight.duration,
		'$' + flight.price,
	];

	return window.innerWidth > 620 ? (
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
				<Button className="btn btn-light buttonTheme" onClick={() => handleBooking(props)}>
          Select
				</Button>
			</td>
		</tr>
	) : (
		<MobileCardView
			key={index}
			keysArray={keysArray.slice(0, 9)}
			valuesArray={valuesArray}
			actionHandler={
				<Button className="btn btn-light buttonTheme" onClick={() => handleBooking(props)}>
          Select
				</Button>
			}
			currentIndex={index}
			primaryField={'Flight Name'}
		/>
	);
};

const FlightTable = ({ flights, direction = 1 }) => {
	const flightRows = (flights || []).map((flight, index) => (
		<FlightRow key={flight.id} flight={flight} index={index} direction={direction} />
	));
	if (!flights) {
		return null;
	} else {
		return (
			<Row>
				<Col>
					<Jumbotron>
						{window.innerWidth > 620 ? (
							<Table responsive hover striped>
								<thead>
									<tr className="text-center">
										<th className="font-weight-normal">#</th>
										<th className="font-weight-normal">Flight Name</th>
										<th className="font-weight-normal">Departure</th>
										<th className="font-weight-normal">Arrival</th>
										<th className="font-weight-normal">Stops</th>
										<th className="font-weight-normal">Travel duration</th>
										<th className="font-weight-normal">Price</th>
										<th className="font-weight-normal"></th>
									</tr>
								</thead>
								<tbody>{flightRows}</tbody>
							</Table>
						) : (
							flightRows
						)}
					</Jumbotron>
				</Col>
			</Row>
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
			flights_forward: [],
			flights_return: [],
			isValidSelection: false,
			openModal: false,
			selectedPageOneWay: 1,
			selectedPageRound: 1,
		};

		this.isValidSelectionFn = this.isValidSelectionFn.bind(this);
		this.onFilter = this.onFilter.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.searchParams !== this.props.searchParams) {
			this.loadData();
		}
	}

	async onFilter() {
		await this.loadData();
		const { price, departure, arrival } = this.state;
		let { flights_forward, flights_return } = this.state;

		const dateFilter =(flights, filterTime, port) => {
			if(port === 'departure') {
				return 	(flights || []).filter((flight) => {
					const tempReturn = new Date(flight[port].at);
					return new Date(flight[port].at) >= new Date(tempReturn.getFullYear(), tempReturn.getMonth(), tempReturn.getDate(), filterTime.split(':')[0], filterTime.split(':')[1], 0, 0);
				});}
			else {
				return 	(flights || []).filter((flight) => {
					const tempReturn = new Date(flight[port].at);
					return new Date(flight[port].at) <= new Date(tempReturn.getFullYear(), tempReturn.getMonth(), tempReturn.getDate(), filterTime.split(':')[0], filterTime.split(':')[1], 0, 0);
				});
			}
		};

		if (price) {
			flights_forward = (flights_forward || []).filter((flight) => parseFloat(flight.price)<=parseFloat(price));
			flights_return = (flights_return || []).filter((flight) => parseFloat(flight.price)<=parseFloat(price));
		}

		if (departure) {flights_forward = dateFilter(flights_forward, departure,  'departure');
			flights_return = dateFilter(flights_forward, departure, 'departure');
		}
		if (arrival) {
			flights_forward = dateFilter(flights_forward, arrival,  'arrival');
			flights_return = dateFilter(flights_forward, arrival, 'arrival');
		}
		this.setState({ flights_forward: flights_forward });
		this.setState({ flights_return: flights_return });
	}

	isValidSelectionFn(value) {
		this.setState({ isValidSelection: value });
	}

	async loadData() {
		
;		if (!('searchParams' in window.localStorage)) {
			window.localStorage.setItem('searchParams', JSON.stringify(this.props.searchParams));
		}

		alert(window.localStorage.getItem('searchParams'));

		const { departureDate, returnDate, deptAirport, arrAirport, numPassengers } = JSON.parse(localStorage.getItem('searchParams'));
		window.localStorage.setItem('numPassengers', numPassengers);
		let data_forward;
		if (window.localStorage.getItem('forward') === null) {
			data_forward = await getitenaries(deptAirport, arrAirport, departureDate, numPassengers);
			window.localStorage.setItem('forward', JSON.stringify(data_forward));
		} else {
			data_forward = JSON.parse(localStorage.getItem('forward'));
		}
		this.setState({
			flights_forward: data_forward,
		});
		if (returnDate) {
			isReturnValid = true;
			let data_return;
			if (window.localStorage.getItem('return') === null) {
				data_return = await getitenaries(arrAirport, deptAirport, returnDate, numPassengers);
				window.localStorage.setItem('return', JSON.stringify(data_return));
			} else {
				data_return = JSON.parse(localStorage.getItem('return'));
			}
			this.setState({
				flights_return: data_return,
			});
		}
	}

	render() {
		isValidSelectionHandler = this.isValidSelectionFn;
		const { flights_forward, flights_return } = this.state;

		const recPerpageOneWay = numberofPages, recPerpageRound = numberofPages;
		for(let i = 0; i < numberofPages; i++){
			displayedRecordsOneWay[i] = flights_forward.slice(i * recPerpageOneWay, recPerpageOneWay * (i+1));
		}
		for(let i = 0; i < numberofPages; i++){
			displayedRecordsRound[i] = flights_return.slice(i * recPerpageRound, recPerpageRound * (i+1));
		}

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
										onChange={(event) => {
											this.setState({ arrival: event.target.value });
										}
										}
									/>
								</FormGroup>
							</Col>
							<Col className="text-center">
								<br />
								<Button onClick={this.onFilter}>Filter</Button>
							</Col>
							<Col className="text-center">
								<br />
								<Button onClick={this.loadData}>Reset</Button>
							</Col>
						</Row>
					</Form>
				</Jumbotron>
				<Tabs className="text-center" defaultActiveKey="oneway" id="flight-search-details">
					<Tab tabClassName="col-6" eventKey="oneway" title="Forward Flights">
						{flights_forward.length ? (
							<FlightTable flights={displayedRecordsOneWay[this.state.selectedPageOneWay -1]} direction={1} />
						) : <CustomLoaderSpinner/>}

						<PaginationComponent
							maxPaginationNumbers={window.innerWidth > 620 ? 5 : 4}
							size={window.innerWidth > 620 ? 'md' : 'sm'}
							totalItems={flights_forward.length}
							pageSize={numberofPages}
							onSelect={(selected) => this.setState({ selectedPageOneWay: selected })}
						/>
					</Tab>
					{isReturnValid && (
						<Tab tabClassName="col-6" eventKey="return" title="Return Flights">
							{flights_return.length ? (
								<FlightTable flights={displayedRecordsRound[this.state.selectedPageRound -1]} direction={2} />
							) : <CustomLoaderSpinner/>}

							<PaginationComponent
								maxPaginationNumbers={window.innerWidth > 620 ? 5 : 4}
								size={window.innerWidth > 620 ? 'md' : 'sm'}
								totalItems={flights_return.length}
								pageSize={numberofPages}
								onSelect={(selected) => this.setState({ selectedPageRound: selected })}/>
						</Tab>
					)}
				</Tabs>

				{this.state.isValidSelection && !this.props.userData ? (
					<div>
						<Button className="btn btn-light buttonTheme" onClick={() => {
							this.setState({ openModal: true });
						}}>
              Proceed
						</Button>
						<Modal
							isOpen={this.state.openModal}
							toggle={() => this.setState({ openModal: false })}
							onClosed={() => this.setState({ openModal: false })}
						>
							<ModalHeader toggle={() => this.setState({ openModal: false })}>Login</ModalHeader>
							<ModalBody>Please Login first to proceed with booking</ModalBody>
							<ModalFooter>
								<Button className="btn btn-light buttonTheme" color="primary" onClick={() => this.setState({ openModal: false })}>
                  Ok
								</Button>{' '}
							</ModalFooter>
						</Modal>
					</div>
				) : (
					<LinkContainer to={'/passengerdetails'}>
						<Button
							className="btn btn-light buttonTheme"
							disabled={!(this.state.isValidSelection && this.props.userData)}
							onClick={() => {
								window.localStorage.removeItem('propsPassengerDetails');
								this.props.updateBookingDetails(bookingDetails);
							}
							}
						>
              Proceed
						</Button>
					</LinkContainer>
				)}
			</>
		);
	}
}

export default Search;
