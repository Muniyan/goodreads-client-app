import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Search from "./components/search";

class App extends Component {
  render() {
    const App = () => (
      <Switch>
        <Redirect exact from="/" to="search" />
        <Route path="/search" component={Search} />
      </Switch>
    );

    return (
      <div className="App">
        <header className="App-header w100">
          <span className="App-icon fleft" />
          <Link to="/" className="App-name fleft cpointer">
            Goodreads
          </Link>
        </header>

        <div className="App-container w100 fleft">
          <Switch>
            <App />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
