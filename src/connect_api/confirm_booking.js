import axios from 'axios';

const ConfirmBookingCall = (reqBody) => {
  axios({
    method: 'POST',
    url: 'http://localhost:5000/api/bookings/confirmBooking',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    data: { passengerDetails: [reqBody] },
  })
    .then(
      (res) => console.log(res),
      (reject) => console.log(reject)
    )
    .catch((err) => console.log(err));
};

export default ConfirmBookingCall;
