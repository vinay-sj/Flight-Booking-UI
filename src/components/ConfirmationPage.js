import React from 'react';
import {Container, Row, Col, Table } from 'reactstrap';

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
          <pre>Your confirmation number is {id}.</pre>
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
                <td>{name}</td>
                <td>{meal}</td>
                <td>{specialRequests}</td>
                <td>{seatNumber}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col>Booked on {bookingDate}</Col>
          <Col>Email: {email}</Col>
          <Col>Phone: {number}</Col>
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
                <td>{airlineName}</td>
                <td>{flightNo}</td>
                <td>Your flight departs from {departureLocation} at {departureTime}.</td>
                <td>Your flight will arrive at {arrivalLocation} at {arrivalTime}.</td>
                <td>Your flight will be {flightLength} hours/time long.</td>
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
