import React, { Component } from "react";
import AddReview from "./AddReview";

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="RestaurantDetails">
        <h2>Hey I'm your Restaurant Details Component!</h2>
        {/* show the component AddReview when the user click on the Add a Review button */}
        <AddReview />
      </section>
    );
  }
}

export default RestaurantDetails;
