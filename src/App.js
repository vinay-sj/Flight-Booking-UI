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
		};

		this.updateBookingDetails = (response, confirmBookingFlag = false) => {
			const updatedData = response.data || {};
			this.setState({
				bookingDetails: { ...this.state.bookingDetails, ...updatedData },
				confirmBookingFlag: confirmBookingFlag,
			});
		};

		this.flightSearchParams = (searchParams) => {
			this.setState({ searchParams: searchParams });
		};
	}

	render() {
		return (
			<div>
				<Header />
				<div className="container main">
					<BrowserRouter>
						<Switch>
							<Route path="/homepage" render={() => <Homepage flightSearchParams={this.flightSearchParams} />} />
							<Route
								path="/search"
								render={() => <Search searchParams={this.state.searchParams} updateBookingDetails={this.updateBookingDetails} />}
							/>
							<Route
								path="/passengerdetails"
								render={() => (
									<PassengerDetails
										bookingDetails={this.state.bookingDetails}
										updateBookingDetails={this.updateBookingDetails}
										numPassengers={this.state.searchParams.numPassengers}
									/>
								)}
							/>
							<Route path="/bookingConfirmation" render={() => <ConfirmationPage bookingDetails={this.state.bookingDetails} />} />
							<Route path="/bookings" component={Bookings} />
							<Redirect from="/" to="/homepage" />
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		);
	}
}

export default App;
