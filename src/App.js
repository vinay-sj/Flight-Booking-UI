import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/HomePage';
import PassengerDetails from './components/PassengerDetails';
import Bookings from './components/Bookings';
import Search from './components/Search';
import ConfirmationPage from './components/ConfirmationPage';
import Passengers from './components/SavedPassengerList';
import Footer from './components/Footer';
import About from './components/About';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingDetails: {},
			confirmBookingFlag: false,
			userData: null
		};

		this.updateBookingDetails = (response, confirmBookingFlag = false) => {
			const updatedData = response.data || {};
			this.setState({
				bookingDetails: { ...this.state.bookingDetails, ...updatedData },
				confirmBookingFlag: confirmBookingFlag,
			});
		};

		this.updateUserDetails = (userData) => {
			this.setState({userData});
		};

		this.flightSearchParams = (searchParams) => {
			this.setState({ searchParams: searchParams });
		};
	}

	render() {
		if (this.state.userData){
			console.log(this.state.userData.profileObj);
		}
		return (
			<div>
				<div className=' screenType'>
					<Header updateUserDetails={this.updateUserDetails} userData={this.state.userData} />
				</div>
				<div className=" main">
					<BrowserRouter>
						<Switch>
							<Route path="/homepage" render={() => <Homepage flightSearchParams={this.flightSearchParams} />} />
							<Route
								path="/search"
								render={() => <Search searchParams={this.state.searchParams} updateBookingDetails={this.updateBookingDetails} userData={this.state.userData} />}
							/>
							<Route
								path="/passengerdetails"
								render={() => (
									<PassengerDetails
										bookingDetails={this.state.bookingDetails}
										updateBookingDetails={this.updateBookingDetails}
										//numPassengers={this.state.searchParams.numPassengers}
										numPassengers={window.localStorage.getItem("numPassengers")}
										userData = {this.state.userData}
									/>
								)}
							/>
							<Route path="/bookingConfirmation" render={() => <ConfirmationPage bookingDetails={this.state.bookingDetails} />} />
							<Route path="/passengerList" render={() => <Passengers /> } />
							<Route path="/bookings" component={Bookings} />
							<Route path="/about" component={About} />
							<Redirect from="/" to="/homepage" />
						</Switch>
					</BrowserRouter>
				</div>
				<div className='  screenType'>
					<Footer />
				</div>
			</div>
		);
	}
}

export default App;
