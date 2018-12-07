import React, { Component } from "react";
import AddReview from "./AddReview";
import OneReview from "./OneReview.js";
import "./RestaurantDetails.css";

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="RestaurantDetails">
        <h2>Hey I'm your Restaurant Details Component!</h2>
        <div className="RestaurantDetailsHeader">
          <img src="restaurant.com" alt="restaurant" />

          <div className="RestaurantDetailsInfo">
            <h2>Name</h2>
            <p>Ratings</p>
            <p>Address</p>
            <p>Phone Number</p>
            <p>Type of cuisine</p>
            <p>Diets available</p>
            <p>Price level</p>
          </div>
        </div>

        <div className="ReviewsList">
        {/* show the component AddReview when the user click on the Add a Review button */}
        <AddReview className="HiddenAddReviewForm" />

        <OneReview />

        </div>
      </section>
    );
  }
}

export default RestaurantDetails;
