import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RestaurantPicturePreview.css";

class RestaurantPicturePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/shop/`, { withCredentials: true })
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
    searchResults.splice(4);
    return (
      <section className="RestaurantPicturePreview">
        <ul className="ListofRestaurantPicturePreview">
          {searchResults.map(oneResult => {
            return (
              <li key={oneResult.id} className="OneRestaurantPicturePreview">
                <Link to={`/shop-details/${oneResult.id}`}><img src={oneResult.image_url} alt="restaurant"/></Link>
                <div className="RestaurantInfoOverlay">
                <p>{oneResult.name}</p>
                <p>{oneResult.location.address1} {oneResult.location.zip_code} {oneResult.location.city}</p>
                <p>{oneResult.rating}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default RestaurantPicturePreview;
