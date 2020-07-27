import React from 'react';
import TripTypeButton from './TripTypeButton';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SelectAsync from 'react-select/lib/Async';
import * as places from '../connect_api/places';



class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rselected: 1,
      startDate: new Date()
    }

    this.loadOptions = this.loadOptions.bind(this);
    
  }
  
  async loadOptions(term) {
    if (term.length < 3) return [];
    const options = await places.getPlaces(term);
    return options;
  }
  

  render() {
    return(
        <>
          <div>
              <h2> Search for flights</h2>
          </div>
          <div>
              <Form>
                  <Row form>
                      <FormGroup>
                          <TripTypeButton handleSelectedTripType={this.setRselected} rSelected={this.state.rselected}/>
                      </FormGroup>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label >From</Label>
                        <SelectAsync loadOptions={ this.loadOptions } filterOption={() => true}  placeholder="Departure Airport" components={{ DropdownIndicator: null }}/>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>To</Label>
                        <SelectAsync loadOptions = {this.loadOptions} filterOption={() => true} placeholder="Arrival Airport" components={{ DropdownIndicator: null }} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label>Departure</Label>
                        <Input type="date" id="departure" name="departure" />
                      </FormGroup>
                    </Col>
                    <Col md={3}> 
                    {this.state.rselected!==2 && <FormGroup>
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
}
        


export default HomePage;
