import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class RestaurantsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // empty array that will receive the result once filtered
      searchResults: []
    };
  }
  // a modifier par /resto et une search générique par coordonnées de la boite
  componentDidMount() {
    const { searchTerm } = this.props;
    console.log("RestoList/searchTerm", searchTerm);
    axios
      .get(`http://localhost:5000/api/shop/${searchTerm}`, {
        withCredentials: true
      })
      .then(response => {
        console.log("Response data of shop/searchTerm:", response.data);
        this.setState({ searchResults: response.data.businesses });
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });
  }

  // Need to tell it to update every time the searchTerm is updated?
  componentDidUpdate(previousProps) {
    const { searchTerm } = this.props;
    console.log("RestoList/searchTerm", searchTerm);
    // "PreviousProps" is the object of the props before it was updated so we need to look inside it
    if (searchTerm === previousProps.searchTerm) {
      return;
    }

    axios
      .get(`http://localhost:5000/api/shop/${searchTerm}`, {
        withCredentials: true
      })
      .then(response => {
        console.log("Response data of shop/searchTerm:", response.data);
        this.setState({ searchResults: response.data.businesses });
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });
  }

  render() {
    const { searchResults } = this.state;

    return (
      <section className="RestaurantsList">
        <ul>
          {searchResults.map(oneResult => {
            return (
              <li key={oneResult.id}>
                <h3><Link to={`/shop/${oneResult.id}`}>{oneResult.name}</Link></h3>
                <p>{oneResult.location.display_address}</p>
                <p>rating Yelp: {oneResult.rating}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default RestaurantsList;
