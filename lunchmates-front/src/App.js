import React, { Component, Provider } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import SignLogPage from "./components/SignLogPage.js";
import ResearchResultsListPage from "./components/ResearchResultsListPage";
import RestaurantDetails from "./components/RestaurantDetails.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  // CHECK USER
 componentDidMount() {
    axios
      .get("http://localhost:5000/api/checkuser", { withCredentials: true })
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
  // logoutClick() {
  //   axios
  //     .delete("http://localhost:5000/logout", { withCredentials: true })
  //     .then(() => {
  //       this.syncCurrentUser(null);
  //     })
  //     .catch(err => {
  //       console.log("Logout ERROR", err);
  //       alert("Sorry! Something went wrong");
  //     });
  //}

  render() {
    return (
      <div className="App">

        <Switch>
          {/* Le Context rend une variable disponible dans tous les arbres existant, sur plusieurs générations */}
          {/* <Provider value={this.state.currentUser}> */}
        
            <Route 
                exact path="/" 
                render={() => (
                  <HomePage 
                        currentUser={this.state.currentUser}
                        onLogOut={userDoc => this.syncCurrentUser(userDoc)}
                  />
                )}
              />

            <Route path="/shop/:searchTerm" component={RestaurantDetails} />
            <Route path="/shop-details/:shopId" component={RestaurantDetails} />
            <Route path="/shop" component={ResearchResultsListPage} />
            
            <Route
              path="/signup-page"
              render={() => (
                <SignLogPage
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            {/* <Route
              path="/login"
              render={() => (
                <SignLogPage
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            /> */}
            <Route component={NotFound} />
          {/* </Provider> */}
        </Switch>

        <footer>
          <p>Made with Sparkles</p>
        </footer>
      </div>
    );
  }
}

export default App;
