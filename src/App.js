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
    this.state = {
      bookingDetails: {},
      confirmBookingFlag: false,
      reRender: true,
    };

    this.updateBookingDetails = (response, confirmBookingFlag = false) => {
      const updatedData = response.data || {};
      this.setState({
        bookingDetails: { ...this.state.bookingDetails, ...updatedData },
        reRender: !this.state.reRender,
        confirmBookingFlag: confirmBookingFlag,
      });
    };

    this.flightSearchParams = (searchParams) => {
      this.setState({ searchParams: searchParams });
    };
  }
  render() {
    if (this.state.confirmBookingFlag && !Object.keys(this.state.bookingDetails)) {
      return (
        <div className="container main">
          <BrowserRouter>
            <Route path="/bookingConfirmation" render={() => <ConfirmationPage bookingDetails={this.state.bookingDetails} />} />
            <Redirect to="/bookingConfirmation" />
          </BrowserRouter>
        </div>
      );
    }
    if (!this.state.confirmBookingFlag && this.state.bookingDetails && typeof this.state.bookingDetails.id === 'number') {
      return (
        <div className="container main">
          <BrowserRouter>
            <Route path="/passengerdetails" render={() => <PassengerDetails updateBookingDetails={this.updateBookingDetails} />} />
            <Redirect to="/passengerdetails" />
          </BrowserRouter>
        </div>
      );
    }
    if (this.state.searchParams) {
      return (
        <div className="container main">
          <BrowserRouter>
            <Route
              path="/search"
              render={() => <Search searchParams={this.state.searchParams} updateBookingDetails={this.updateBookingDetails} />}
            />
            <Redirect to="/search" />
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
              <Route path="/homepage" render={() => <Homepage flightSearchParams={this.flightSearchParams} />} />
              {/* <Route path="/passengerdetails" render={() => <PassengerDetails updateBookingDetails={this.updateBookingDetails} />} /> */}
              <Route path="/bookings" component={Bookings} />
              {/*<Route path="/search" render={() => <Search searchParams={this.state.searchParams} />} />*/}
              <Redirect from="/" to="/homepage" />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
