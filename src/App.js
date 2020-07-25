import React from 'react';
import { BrowserRouter ,Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Homepage from './HomePage';

const App = () => (
  <div>
      <Header />
      <div className="container main">
        <BrowserRouter>
          <Switch>
                <Route path="/homepage" component={Homepage} />
                <Redirect from="/" to="/homepage" />
            </Switch> 
        </BrowserRouter>         
      </div>
  </div>
)

export default App;
