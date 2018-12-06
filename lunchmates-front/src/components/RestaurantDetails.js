import React, { Component } from "react";

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="RestaurantDetails">
        <h2>Hey I'm your Restaurant Details Component!</h2>
      </section>
    );
  }
}

export default RestaurantDetails;
