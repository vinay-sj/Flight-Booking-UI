import React, { useState } from 'react';
import { Row, Table, Button, Collapse } from 'reactstrap';

const json = require('../mock_json/retrieve_booking.json');

const bookingsNew =JSON.parse(JSON.stringify(json));
const bookingsPrev =JSON.parse(JSON.stringify(json));

const BookingRow = (props)=>{
  const {
      booking, index
    } = props;
    // console.log(booking)
  const passengerNames = booking.passengerDetails.map((passenger)=>
    passenger.name
  ).join(', ')

    return (
      <tr>
        <td>{index+1}</td>
        <td>{booking.flightNo}</td>
        <td>{booking.airlineName}</td>
        <td>{booking.journeyDate}</td>
        <td>{passengerNames}</td>
      </tr>

    )

}

  const Bookings = (props) =>{
    // console.log(bookingsNew[0].airlineName)
    const bookingRowsNew = bookingsNew.map((booking, index) =>
      <BookingRow
        key={booking._id}
        booking={booking}
        index={index}
      />
    );

    const bookingRowsPrevious = bookingsPrev.map((booking, index) =>
    <BookingRow
      key={booking._id}
      booking={booking}
      index={index}
    />
  );
    const [isToggleNew, setisToggleNew] = useState(true);
    const [isTogglePrevious, setisTogglePrevious] = useState(false);
    const toggleNew = () => setisToggleNew(!isToggleNew);
    const togglePrevious = () => setisTogglePrevious(!isTogglePrevious);

    return (
      <>
          <Button color='secondary' size='lg' onClick={toggleNew} block>Upcoming Bookings</Button>
          {/*<Collapse isOpen={isToggleNew}>*/}
            <Table hover striped>
              <thead>
              <tr>
                <th>#</th>
                <th>Flight No.</th>
                <th>Airline Name</th>
                <th>Journey Date</th>
                <th>Passengers Name</th>
              </tr>
              </thead>
              <tbody>
              {bookingRowsNew}
              </tbody>
            </Table>
          {/*</Collapse>*/}
        <Button color='secondary' size='lg' onClick={togglePrevious} block>Previous Bookings</Button>
        {/*<Collapse isOpen={isTogglePrevious}>*/}
        <Table hover striped>
          <thead>
          <tr>
            <th>#</th>
            <th>Flight No.</th>
            <th>Airline Name</th>
            <th>Journey Date</th>
            <th>Passengers Name</th>
          </tr>
          </thead>
          <tbody>
          {bookingRowsPrevious}
          </tbody>
        </Table>
        {/*</Collapse>*/}
      </>
    );
}
export default  Bookings;