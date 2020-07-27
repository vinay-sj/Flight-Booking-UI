import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/HomePage';
import PassengerDetails from './components/PassengerDetails';
import Bookings from './components/Bookings';
import Search from './components/Search';

const App = () => (
  <div>
    <Header />
    <div className="container main">
      <BrowserRouter>
        <Switch>
          <Route path="/homepage" component={Homepage} />
          <Route path="/passengerdetails" component={PassengerDetails} />
          <Route path="/bookings" component={Bookings} />
          <Route path='/search' component={Search} />
          <Redirect from="/" to="/homepage" />
        </Switch>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
