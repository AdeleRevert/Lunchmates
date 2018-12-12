import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import SignLogPage from "./components/SignLogPage.js";
import ResearchResultsListPage from "./components/ResearchResultsListPage";
import RestaurantDetails from "./components/RestaurantDetails.js";
import NavBar from "./components/NavBar.js";
import UserProfile from "./components/UserProfile.js";
import AddReview from "./components/AddReview.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      searchTerm: "",
    };
  }

  // CHECK USER
 componentDidMount() {
    axios
      .get("http://localhost:5000/api/checkuser", { withCredentials: true })
      .then(response => {
        //console.log("Check user", response.data);
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

// search Term est nécecssaire dans HomePageSearch component et RestaurantsList component, obligés de le remonter dans App.js
  getSearchedTerm(term) {
    //console.log(term);
    this.setState({ searchTerm: term });
    //console.log("App.jsState/searchTerm", this.state.searchTerm);
  }

  render() {
    
    console.log(this.state.currentUser);
    return (
      <div className="App">
          <NavBar
          currentUser={this.state.currentUser}
          onLogOut={userDoc => this.syncCurrentUser(userDoc)}
        />

        <Switch>
          {/* Le Context rend une variable disponible dans tous les arbres existant, sur plusieurs générations */}
          {/* <Provider value={this.state.currentUser}> */}
        
            <Route 
                exact path="/" 
                render={() => 
                  <HomePage 
                        currentUser={this.state.currentUser}
                        onLogOut={userDoc => this.syncCurrentUser(userDoc)}
                        getSearchedTerm={term => this.getSearchedTerm(term)}
                  />
                }
              />

            <Route path="/shop/:searchTerm" component={RestaurantDetails} />
            <Route path="/shop-details/:shopId" component={RestaurantDetails} />
            <Route path="/shop" render={() => 
                < ResearchResultsListPage searchTerm={this.state.searchTerm} 
                    getSearchedTerm={term => this.getSearchedTerm(term)} />
                  } 
            />

            <Route path="/shop-details/:shopId" component={AddReview} />
            
            <Route
              path="/signup-page"
              render={() => 
                < SignLogPage
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              }
            />
            <Route path="/profile" 
                  render={() => 
                  <UserProfile 
                  currentUser={this.state.currentUser}/>
                  } 
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
