import React from 'react';
import {Container, Row, Col, Table, Button } from 'reactstrap';

class ConfirmationPage extends React.Component {
 
  render () {
    return (
      <Container>
        <Row className="text-center">
          <h1>Confirmation</h1>
        </Row>
        <Row className="text-center">
          <pre>Your booking went through Succesfully!</pre>
        </Row>
        <Row className="text-center">
          <pre>Your confirmation number is {this.props.id}.</pre>
        </Row>
        <Row>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Traveller Name</th>
                <th>Meal Prefenece</th>
                <th>Special Request</th>
                <th>Seat Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.name}</td>
                <td>{this.props.meal}</td>
                <td>{this.props.specialRequests}</td>
                <td>{this.props.seatNumber}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col>Booked on {this.props.bookingDate}</Col>
          <Col>Email: {this.props.email}</Col>
          <Col>Phone: {this.props.number}</Col>
        </Row>
        <Row>
          <Table bordered>
            <thead>
              <tr>
                <th>Flight Name</th>
                <th>Flight Number</th>
                <th>Departure Details</th>
                <th>Arrival Details</th>
                <th>Travel Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.airlineName}</td>
                <td>{this.props.flightNo}</td>
                <td>Your flight departs from {this.props.departureLocation} at {this.props.departureTime}.</td>
                <td>Your flight will arrive at {this.props.arrivalLocation} at {this.props.arrivalTime}.</td>
                <td>Your flight will be {this.props.flightLength} hours/time long.</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Button color="secondary">Print</Button>{' '}
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Button color="primary">Close</Button>{' '}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ConfirmationPage;
