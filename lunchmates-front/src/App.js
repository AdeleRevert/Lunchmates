import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import NavBar from "./components/NavBar.js";
import RestaurantsList from "./components/RestaurantsList.js";
import Search from "./components/Search.js";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import SignLogPage from "./components/SignLogPage.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      currentUser: null
    };
  }

  // SEARCH BAR
  getSearchedTerm(term) {
    console.log(term);
    this.setState({ searchTerm: term });
    console.log("App.jsState/searchTerm", this.state.searchTerm);
  }

  // CHECK USER
  componentDidMount() {
    axios
      .get("http://localhost:5555/checkuser", { withCredentials: true })
      .then(response => {
        console.log("Check user", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
      })
      .catch(err => {
        console.log("current user", err);
        alert("Sorry! Something went wrong");
      });
  }

  // UPDATE CURRENT USER
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  // LOGOUT
  logoutClick() {
    axios
      .delete("http://localhost:5555/logout", { withCredentials: true })
      .then(() => {
        this.syncCurrentUser(null);
      })
      .catch(err => {
        console.log("Logout ERROR", err);
        alert("Sorry! Something went wrong");
      });
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        <Search
          userInput={this.state.searchTerm}
          searchedTerm={term => this.getSearchedTerm(term)}
        />

        <RestaurantsList searchTerm={this.state.searchTerm} />

        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route
            path="/signup"
            render={() => (
              <SignLogPage
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            )}
          />

          <Route
            path="/login"
            render={() => (
              <SignLogPage
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with Sparkles</p>
        </footer>
      </div>
    );
  }
}

export default App;
