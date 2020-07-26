import React, { useState } from 'react';
import TripTypeButton from './TripTypeButton';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import * as places from '../connect_api/places';

//let options = places.getPlaces('Stockholm');
//console.log(options);

// for testing
let options1 = [ { label: 'Stockholm', value: 'STOC-sky' },
{ label: 'Stockholm Arlanda', value: 'ARN-sky' },
{ label: 'Stockholm Skavsta', value: 'NYO-sky' },
{ label: 'Stockholm Bromma', value: 'BMA-sky' },
{ label: 'Stockholm Vasteras', value: 'VST-sky' } ];

let options2 = [ { value: 'NCL-sky', label: 'Newcastle' },
{ value: 'DEL-sky', label: 'New Delhi' },
{ value: 'NQY-sky', label: 'Newquay' },
{ value: 'NYCA-sky', label: 'New York' },
{ value: 'JFK-sky', label: 'New York John F. Kennedy' },
{ value: 'EWR-sky', label: 'New York Newark' },
{ value: 'LGA-sky', label: 'New York LaGuardia' },
{ value: 'SWF-sky', label: 'Stewart International' },
{ value: 'NZ-sky', label: 'New Zealand' },
{ value: 'MSYA-sky', label: 'New Orleans' } ];



const HomePage = (props) =>{
    
    const [rselected, setRselected] = useState(1);

    return(
    <>
        <div>
            <h2> Search for flights</h2>
        </div>
        <div>
            <Form>
                <Row form>
                    <FormGroup>
                        <TripTypeButton handleSelectedTripType={setRselected} rSelected={rselected}/>
                    </FormGroup>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label >From</Label>
                      <Select options = {options1}  id="deptAirport" name="deptAirport" placeholder="Departure Airport" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>To</Label>
                      <Select options = {options2} id="arrAirport" name="arrAirport" placeholder="Arrival Airport" />
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
                  {rselected!==2 && <FormGroup>
                      <Label for="exampleState">Return</Label>
                      <Input type="date" name="return" id="return"/>
                    </FormGroup>}                    
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
    </>


    );
}
        


export default HomePage;
