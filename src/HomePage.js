import React from 'react';
import TripTypeButton from './TripTypeButton';
import { Col, Row, Button,ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';

const HomePage = (props) =>{
    return(
    <div>
        <div>
            <h2> Search for flights</h2>
        </div>
        <div>
            <Form>
                <Row form>
                    <FormGroup>
                        <TripTypeButton />
                    </FormGroup>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label >From</Label>
                      <Input type="text" id="deptAirport" name="deptAirport" placeholder="Departure Airport" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>To</Label>
                      <Input type="text" id="arrAirport" name="arrAirport" placeholder="Arrival Airport" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Departure</Label>
                      <Input type="date" id="departure" name="departure"/>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleState">Return</Label>
                      <Input type="date" name="return" id="return"/>
                    </FormGroup>
                  </Col>
                  <Col md={1}>
                    <FormGroup>
                      <Label>Passengers</Label>
                      <Input type="number" id="numPassengers" name="numPassengers" placeholder="1" min="1"/>
                    </FormGroup>  
                  </Col>
                </Row>
                <Button>Search</Button>
            </Form>
        </div>    
    </div>


    );
}
        

const toggleClass = (value) => "nav-link" + (value ? " active" : "");


export default HomePage;
