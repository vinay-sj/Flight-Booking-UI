import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/HomePage';
import PassengerDetails from './components/PassengerDetails';
import Bookings from './components/Bookings';
import Search from './components/Search';
import ConfirmationPage from './components/ConfirmationPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateBookingDetails = (response) => {
      this.setState({ bookingDetails: response.data });
    };
  }
  render() {
    if (this.state.bookingDetails) {
      return (
        <div className="container main">
          <BrowserRouter>
            <Route path="/bookingConfirmation" render={() => <ConfirmationPage bookingDetails={this.state.bookingDetails} />} />
            <Redirect to="/bookingConfirmation" />
          </BrowserRouter>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="container main">
          <BrowserRouter>
            <Switch>
              <Route path="/homepage" component={Homepage} />
              <Route path="/passengerdetails" render={() => <PassengerDetails updateBookingDetails={this.updateBookingDetails} />} />
              <Route path="/bookings" component={Bookings} />
              <Route path="/search" component={Search} />
              <Redirect from="/" to="/homepage" />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
