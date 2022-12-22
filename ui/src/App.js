import React, { Component } from 'react'
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";

import Login from "./components/Login";
import Tests from './components/Tests';
import QA from './components/QA';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `http://localhost:9090/`,
    };
  }

  componentDidMount = () => {
    sessionStorage.setItem("proxy", "http://172.16.130.69");
  };

  authGuard = (Component) => () => {
    return sessionStorage.getItem("logged_in") ? (
      <Component {...this} {...this.state} />
    ) : (
      <Redirect to="/login" />
    );
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login {...this} {...this.state} />
          </Route>

          <Route path="/tests">
            <Tests {...this} {...this.state} />
          </Route>

          <Route path="/questions">
            <QA {...this} {...this.state} />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
