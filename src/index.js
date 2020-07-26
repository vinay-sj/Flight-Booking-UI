import React from 'react';
import ReactDOM from 'react-dom';
import PassengerDetails from './components/PassengerDetails';
import "./App.scss";
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <div className="container">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);
