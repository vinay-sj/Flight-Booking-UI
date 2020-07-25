import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Homepage from './HomePage';
import PassengerDetails from './components/PassengerDetails';

const App = () => (
  <div>
    <Header />
    <div className="container main">
      <BrowserRouter>
        <Switch>
          <Route path="/homepage" component={Homepage} />
          <Route path="/passengerdetails" component={PassengerDetails} />
          <Redirect from="/" to="/homepage" />
        </Switch>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
