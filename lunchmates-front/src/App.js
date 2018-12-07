import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import RestaurantsList from "./components/RestaurantsList.js";
import Search from "./components/Search.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
    }
  }

  getSearchedTerm(term) {
    console.log(term);
    this.setState({ searchTerm: term });
    console.log("App.jsState/searchTerm", this.state.searchTerm);
  }

  render() {
    return (
      <div className="App">

        <NavBar />

        <Search userInput={this.state.searchTerm} searchedTerm={term => this.getSearchedTerm(term)}/>

        <RestaurantsList searchTerm={this.state.searchTerm}/>
        <footer>
          <p>Made with Sparkles</p>

        </footer>
      </div>
    );
  }
}

export default App;
