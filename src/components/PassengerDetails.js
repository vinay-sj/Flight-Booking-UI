import React from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import ConfirmBookingCall from "../connect_api/confirm_booking"

class PassengerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      birthDate: '',
      emailId: '',
      contactNo: '',
      passPortNo: '',
    };
  }

  genderSelect = (event) => {
    this.setState({ gender: event.target.value });
  };

  confirmBooking = () => {
    console.log(this.state);
    ConfirmBookingCall(this.state)
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Name" onChange={(event) => this.setState({ name: event.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <div>
            <CustomInput id="male" type="radio" name="gender" label="Male" inline defaultValue={'M'} onClick={this.genderSelect} />
            <CustomInput id="female" type="radio" name="gender" label="Female" inline defaultValue={'F'} onClick={this.genderSelect} />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Birth Date</Label>
          <Input
            type="date"
            name="birthDate"
            id="birthDate"
            placeholder="Birth Date"
            onChange={(event) => this.setState({ birthDate: event.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(event) => this.setState({ emailId: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="contact">Contact No</Label>
          <Input
            type="number"
            name="contact"
            id="contact"
            placeholder="Contact No"
            onChange={(event) => this.setState({ contactNo: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="passport">Passport</Label>
          <Input
            type="text"
            name="passport"
            id="passport"
            placeholder="Passport No"
            onChange={(event) => this.setState({ passPortNo: event.target.value })}
          />
        </FormGroup>

        <Button onClick={this.confirmBooking}>Confirm</Button>
      </Form>
    );
  }
}

export default PassengerDetails;
