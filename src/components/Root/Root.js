import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage'
import CityPage from '../CityPage/CityPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 

class Root extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={
            (props) => <HomePage {...props}/>
          }/>
          <Route path="/city/:id" component={CityPage}/>
        </Switch>
      </Router>
    );
  }
}

export default Root;
