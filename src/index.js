import React from 'react';
import ReactDOM from 'react-dom';
import PassengerDetails from './components/PassengerDetails';
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <div className="container">
    <React.StrictMode>
      <PassengerDetails />
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);
