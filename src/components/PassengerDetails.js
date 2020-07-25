import React from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

class PassengerDetails extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Name" />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <div>
            <CustomInput id="male" type="radio" name="gender" label="Male" inline />
            <CustomInput id="female" type="radio" name="gender" label="Female" inline />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Birth Date</Label>
          <Input type="date" name="birthDate" id="birthDate" placeholder="Birth Date" />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Label for="contact">Contact No</Label>
          <Input type="number" name="contact" id="contact" placeholder="Contact No" />
        </FormGroup>
        <FormGroup>
          <Label for="passport">Passport</Label>
          <Input type="text" name="passport" id="passport" placeholder="Passport No" />
        </FormGroup>

        <Button>Confirm</Button>
      </Form>
    );
  }
}

export default PassengerDetails;
