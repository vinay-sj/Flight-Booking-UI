import React from 'react';
import {
  Panel, Grid, Button, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar,
} from 'react-bootstrap';
import PanelBody from "react-bootstrap/lib/PanelBody";

class PassengerDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid fluid>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Passenger Details</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <FormGroup>
                <ControlLabel>First Name:</ControlLabel>
                  <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Middle Name:</ControlLabel>
                  <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Last Name:</ControlLabel>
                <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Gender:</ControlLabel>
                <FormControl
                  componentClass="select"
                >
                  <option value="">---</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender Male">Transgender Male</option>
                  <option value="Transgender Female">Transgender Female</option>
                  <option value="Gender variant/non-conforming">Gender variant/non-conforming</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to answer">Prefer not to answer</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Meal Preference:</ControlLabel>

                <FormControl
                  componentClass="select"
                >
                  <option value="">---</option>
                  <option value="Baby meal">Baby meal</option>
                  <option value="Bland meal">Bland meal</option>
                  <option value="Children's meal">Children's meal</option>
                  <option value="Diabetic meal">Diabetic meal</option>
                  <option value="Fruit plate meal">Fruit plate meal</option>
                  <option value="Gluten intolerant meal">Gluten intolerant meal</option>
                  <option value="Hindu meal">Hindu meal</option>
                  <option value="Kosher meal">Kosher meal</option>
                  <option value="Low-calorie meal">Low-calorie meal</option>
                  <option value="Low fat meal">Low fat meal</option>
                  <option value="Low lactose meal">Low lactose meal</option>
                  <option value="Low salt meal">Low salt meal</option>
                  <option value="Muslim meal">Muslim meal</option>
                  <option value="Vegetarian Asian / Hindu meal">Vegetarian Asian / Hindu meal</option>
                  <option value="Vegetarian Jain meal">Vegetarian Jain meal</option>
                  <option value="Vegetarian Vegan meal (Non-dairy, no-eggs)">Vegetarian Vegan meal (Non-dairy, no-eggs)</option>
                  <option value="Vegetarian meal (lacto-ovo)">Vegetarian meal (lacto-ovo)</option>
                  <option value="Vegetarian oriental meal">Vegetarian oriental meal</option>



                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Nationality:</ControlLabel>
                <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Passport Number:</ControlLabel>
                <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Passport Issuing Country:</ControlLabel>
                <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Passport Expiry Date:</ControlLabel>
                <FormControl/>
              </FormGroup>
            </Panel.Body>
              <Panel.Heading>
              <Panel.Title>Contact Information</Panel.Title>
                </Panel.Heading>
            <PanelBody>
              <FormGroup>
                <ControlLabel>Country Code:</ControlLabel>
                <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Phone Number:</ControlLabel>
                <FormControl/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Email ID:</ControlLabel>
                <FormControl/>
              </FormGroup>
<ButtonToolbar>
  <Button bsStyle="primary" type="button">
    Save
  </Button>
  <Button bsStyle="primary" type="button">
    Save & Add another
  </Button>
  <Button bsStyle="primary" type="button">
    Confirm
  </Button>
</ButtonToolbar>

            </PanelBody>
          </Panel>
        </Grid>
      </React.Fragment>

    );
  };

}

export default PassengerDetails;