import React from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';

class ConfirmationPage extends React.Component {
  goToHomepage = () => window.location.replace('/');

  render() {
    return (
      <Container>
        <Row className="text-center">
          <h1>Confirmation</h1>
        </Row>
        <Row className="text-center">
          <pre>Your booking went through Succesfully!</pre>
        </Row>
        <Row className="text-center">
          <pre>Your confirmation number is {this.props.bookingDetails._id}.</pre>
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
            <tbody>
              <tr>
                <td>{this.props.bookingDetails.passengerDetails[0].name}</td>
                {/* <td>{this.props.bookingDetails.meal}</td>
                <td>{this.props.bookingDetails.specialRequests}</td>
                <td>{this.props.bookingDetails.seatNumber}</td> */}
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col>Booked on {Date(this.props.bookingDetails.bookingDate).toString().split('GMT')[0]}</Col>
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
                <td>{this.props.bookingDetails.airlineName}</td>
                <td>{this.props.bookingDetails.flightNo}</td>
                <td>{Date(this.props.bookingDetails.journeyDate).toString().split('GMT')[0]}</td>
                {/* <td>Your flight will arrive at {this.props.bookingDetails.arrivalLocation} at {this.props.bookingDetails.arrivalTime}.</td>
                <td>Your flight will be {this.props.bookingDetails.flightLength} hours/time long.</td> */}
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Button color="secondary">Print</Button>{' '}
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Button onClick={this.goToHomepage} color="primary">
              Go To Homepage
            </Button>{' '}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ConfirmationPage;
