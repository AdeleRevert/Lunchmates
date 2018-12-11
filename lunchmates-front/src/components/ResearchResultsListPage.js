import React, { Component } from "react";
import RestaurantsList from "./RestaurantsList.js";
import Search from "./Search.js";

class ResearchResultsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  // SEARCH BAR
  getSearchedTerm(term) {
    //console.log(term);
    this.setState({ searchTerm: term });
    //console.log("App.jsState/searchTerm", this.state.searchTerm);
  }

  render() {
    return (
      <section className="ResearchResultsListPage">
        <Search
          searchTerm={this.props.searchTerm}
          getSearchedTerm={this.props.getSearchedTerm}
        />

        <RestaurantsList searchTerm={this.props.searchTerm} />
      </section>
    );
  }
}

export default ResearchResultsListPage;
