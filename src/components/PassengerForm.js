import {FormGroup, Input, Jumbotron, Label} from "reactstrap";
import React, {useState} from "react";
import DatePicker from "react-datepicker";

class PassengerForm extends React.Component {
  constructor() {
    super();
    this.state = {
      birthDate: new Date,
    }
    this.updateBirthDate = this.updateBirthDate.bind(this);
  }

  updateBirthDate = (date) => this.setState({
    birthDate: date
  });

  render() {
    const { onChange, index, onDatePickerChange } = this.props;
    const { birthDate } = this.state;
    const passNo = index + 1 || ''
    const i = index || 0;
    return (
      <Jumbotron key={index}>
        <FormGroup>
          <div id={index}>Passenger Details: {passNo}</div>
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={(event) => {
              onChange(event, i);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <div>
            <select
              type="text"
              id="gender"
              name="gender"
              onChange={(event) => {
                onChange(event, i);
              }}
            >
              <option value="---">Select a gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Birth Date</Label>
          <DatePicker
            selected={birthDate}
            onChange={(date) => {
              this.updateBirthDate(date);
              onDatePickerChange(date, 'birthDate', i);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="emailId"
            id="email"
            placeholder="Email"
            onChange={(event) => {
              onChange(event, i);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="contact">Contact No</Label>
          <Input
            type="number"
            name="contactNo"
            id="contact"
            placeholder="Contact No"
            onChange={(event) => {
              onChange(event, i);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="passport">Passport</Label>
          <Input
            type="text"
            name="passPortNo"
            id="passport"
            placeholder="Passport No"
            onChange={(event) => {
              onChange(event, i);
            }}
          />
        </FormGroup>
      </Jumbotron>
    );
  }
}

export default PassengerForm;
