import React, { Component } from "react";
import RestaurantsList from "./RestaurantsList.js";
import Search from "./Search.js";

class ResearchResultsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  // SEARCH BAR
  getSearchedTerm(term) {
    console.log(term);
    this.setState({ searchTerm: term });
    console.log("App.jsState/searchTerm", this.state.searchTerm);
  }

  render() {
    return (
      <section className="ResearchResultsListPage">
        <Search
          userInput={this.state.searchTerm}
          searchedTerm={term => this.getSearchedTerm(term)}
        />

        <RestaurantsList searchTerm={this.state.searchTerm} />
      </section>
    );
  }
}

export default ResearchResultsListPage;
