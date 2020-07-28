import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron, Table} from "reactstrap";
import { LinkContainer } from 'react-router-bootstrap';
const json = require('../mock_json/flight.json');
const flights = JSON.parse(JSON.stringify(json));

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      departure: '',
      arrival: '',
    };
  }

 flightRows = flights.map((flight,index) => {
    return(
      <tr
        className='text-center'
        key={flight.id}
      >
        <td>{index+1}</td>
        <td>{flight.carrierCode}</td>
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
        <td>{'$'+flight.price}</td>
        <td>
          <LinkContainer to={`/passengerdetails/${flight.id}`}>
          <Button>Book</Button>
          </LinkContainer>
        </td>
      </tr>
    );
  });

  render() {
    return (
      <>
        <h4 className='text-center'>
        Available Flights
        </h4>
        <Jumbotron>
        <Form>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='price'>Price</Label>
                <Input
                  type='number'
                  min='0'
                  name='price'
                  id='price'
                  placeholder='Price'
                  onChange={(event) => this.setState({ price: event.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='departure'>Departure</Label>
                <Input
                  type='time'
                  name='departure'
                  id='departure'
                  placeholder='Departure'
                  onChange={(event) => this.setState({ departure: event.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='arrival'>Arrival</Label>
                <Input
                  type='time'
                  name='arrival'
                  id='arrival'
                  placeholder='Arrival'
                  onChange={(event) => this.setState({ arrival: event.target.value })}/>
              </FormGroup>
            </Col>
            <Col className='text-center'>
              <br/>
              <Button>Filter</Button>
            </Col>
          </Row>
        </Form>
        </Jumbotron>
        <Jumbotron>
        <Table responsive hover striped>
          <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>Flight Name</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Stops</th>
            <th>Travel duration</th>
            <th>Price</th>
            <th>{ ' ' }</th>
          </tr>
          </thead>
          <tbody>
          {this.flightRows}
          </tbody>
        </Table>
        </Jumbotron>
      </>
    );
  }
}

export default Search;