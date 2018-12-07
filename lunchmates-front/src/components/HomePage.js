import React, { Component } from "react";
import NavBar from "./NavBar.js";
import Search from "./Search.js";
import OneReview from "./OneReview.js";
import RestaurantPicturePreview from "./RestaurantPicturePreview.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="HomePage">
      <NavBar />
        <h2>Welcome to your Home Page Beauty</h2>

        <Search />

        <div className="reviewsCaroussel">
          <OneReview />
          <OneReview />
          <OneReview />
        </div>

        <div className="bestRatedPlaces">
          <p>here you see the picture of best rated restaurants</p>
          <RestaurantPicturePreview />
        </div>

      </section>
    );
  }
}

export default HomePage;
