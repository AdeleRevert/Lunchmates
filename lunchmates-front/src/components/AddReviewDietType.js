import React, { Component } from "react";

class AddReviewDietType extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="AddReviewDietType">
        <p>What kind of diet is available?</p>

        <input type="checkbox" name="Vegan" placeholder="Vegan" />
        <input type="checkbox" name="Veggie" placeholder="Veggie" />
        <input type="checkbox" name="Gluten free" placeholder="Gluten free" />
        <input type="checkbox" name="Paleo" placeholder="Paleo" />
        <input type="checkbox" name="Dairy-free" placeholder="Dairy-free" />
      </div>
    );
  }
}

export default AddReviewDietType;
