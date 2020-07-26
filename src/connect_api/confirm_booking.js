import axios from 'axios';

const ConfirmBookingCall = (body) => {
  axios
    .post('http://localhost:5000/api/bookings/confirmBooking', { passengerDetails: [body] })
    .then(
      (res) => console.log(res),
      (reject) => console.log(reject)
    )
    .catch((err) => console.log(err));
};

export default ConfirmBookingCall;