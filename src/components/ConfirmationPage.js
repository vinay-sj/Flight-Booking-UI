import React from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';

class ConfirmationPage extends React.Component {
	constructor(props) {
		super(props);
		this.goToHomepage = () => window.location.replace('/');
		this.goToBookings = () => window.location.replace('/bookings');
		this.state={
			id:this.props.bookingDetails._id,
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.bookingDetails !== this.props.bookingDetails) {
			this.setState({ id: this.props.bookingDetails._id });
		}
	}

	render() {
		if (!this.state.id) {
			return null;
		}
		const { passengerDetails } = this.props.bookingDetails;
		const passengerRow = (passengerDetails || []).map((passenger) => {
			return (
				<tr key={passenger.passPortNo}>
					<td>{passenger.name}</td>
					{/* <td>{this.props.bookingDetails.meal}</td>
          <td>{this.props.bookingDetails.specialRequests}</td>
          <td>{this.props.bookingDetails.seatNumber}</td> */}
				</tr>
			);
		});

		return (
			<Container>
				<Row>
					<h1 className='text-center'>Confirmation</h1>
				</Row>
				<Row>
					<pre className='text-center'>Your booking went through Succesfully!</pre>
				</Row>
				<Row>
					<pre className='text-center'>Your confirmation number is {this.props.bookingDetails._id}.</pre>
				</Row>
				<Row>
					<Table striped bordered>
						<thead>
							<tr>
								<th>Traveller Name</th>
								{/* <th>Meal Prefenece</th>
                <th>Special Request</th>
                <th>Seat Number</th> */}
							</tr>
						</thead>
						<tbody>{passengerRow}</tbody>
					</Table>
				</Row>
				<Row>
					<Col>Booked on {new Date(this.props.bookingDetails.bookingDate).toLocaleString()}</Col>
					<Col>Email: {this.props.bookingDetails.passengerDetails[0].emailId}</Col>
					<Col>Phone: {this.props.bookingDetails.passengerDetails[0].contactNo}</Col>
				</Row>
				<Row>
					<Table bordered>
						<thead>
							<tr>
								<th>Flight Name</th>
								<th>Flight Number</th>
								<th>Journey Details</th>
								{/* <th>Travel Summary</th>  */}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{this.props.bookingDetails.onwardFlightDetails.airlineName}</td>
								<td>{this.props.bookingDetails.onwardFlightDetails.flightNo}</td>
								<td>{new Date(this.props.bookingDetails.onwardFlightDetails.journeyDate).toLocaleString()}</td>
								{/* <td>Your flight will arrive at {this.props.bookingDetails.arrivalLocation} at {this.props.bookingDetails.arrivalTime}.</td>
                <td>Your flight will be {this.props.bookingDetails.flightLength} hours/time long.</td> */}
							</tr>
						</tbody>
					</Table>
				</Row>
				<Row className='text-center'>
					<Col className='col-6'>
						<Button className='btn btn-light buttonTheme' onClick={this.goToHomepage} color="primary">
              Go To Homepage
						</Button>{' '}
					</Col>
					<Col className='col-6'>
						<Button className='btn btn-light buttonTheme' onClick={this.goToBookings} color="primary">
              Previous Bookings
						</Button>{' '}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default ConfirmationPage;
