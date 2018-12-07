import React, { Component } from "react";
import TimeframeRadioButton from "./TimeFrameRadioButton.js";
import PriceLevelRadioButton from "./PriceLevelRadioButton.js";

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="AddReview">
        <p>Rating</p> radio
        <p>What type of cuisine was it?</p>
        <p>What kind of diet is available?</p>
        
        <PriceLevelRadioButton />
        
        <TimeframeRadioButton />

        <input type="text" name="comment" placeholder="Let the world know!" />
      </div>
    );
  }
}

export default AddReview;
