import React from 'react';
import { Table } from "reactstrap";

const PassengerRows = ({ passengers, actionButtons }) => {
  const passengerRows = (passengers || []).map((passenger, index) => {
    const birthDate = new Date(passenger.birthDate);
    const actionbutton = actionButtons(index);

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{passenger.name}</td>
        <td>{passenger.gender}</td>
        <td>{birthDate.toLocaleDateString()}</td>
        <td>{passenger.emailId}</td>
        <td>{passenger.contactNo}</td>
        <td>{passenger.passPortNo}</td>
        <td>
          {actionbutton}
        </td>
      </tr>
    );
  });
  return <>{passengerRows}</>;
};

class PassengerListTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadData();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.passengers !== this.props.passengers) {
      this.props.loadData();
    }
  }

  render() {
    const { passengers, actionButtons } = this.props;
    console.log(passengers)
    return (
      <Table responsive hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Birth Date</th>
          <th>Email</th>
          <th>Contact No.</th>
          <th>Passport No.</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <PassengerRows passengers={passengers} actionButtons={actionButtons} />
        </tbody>
      </Table>
    );
  }
}

export default PassengerListTable