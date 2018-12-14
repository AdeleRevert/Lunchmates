import React, { Component } from "react";
// import TimeframeRadioButton from "./TimeFrameRadioButton.js";
// import PriceLevelRadioButton from "./PriceLevelRadioButton.js";
import "./AddReview.css";
import axios from "axios";

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      cuisine: [],
      diet: [],
      timeframe: ["quick and easy"],
      types: [],
      price_level: "€",
      comment: ""
      // isSubmitSuccessful: false,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      console.log("hello", this.state);
    });
  }

  handleMultiSelectChangeCuisine = event => {
    console.log("handleMultiSelectChange");
    // const { cuisine } = event.target;
    const allValsCuisine = Array.from(event.target.selectedOptions).map(
      option => option.value
    );
    this.setState({ cuisine: allValsCuisine }, () => {
      console.log(this.state.cuisine);
    });
  };

  handleMultiSelectChangeDiet = event => {
    console.log("handleMultiSelectChange");
    // const { diet } = event.target;
    const allValsDiet = Array.from(event.target.selectedOptions).map(
      option => option.value
    );
    console.log(this.state.diet);
    this.setState({ diet: allValsDiet });
  };

  handleMultiSelectChangeTypes = event => {
    console.log("handleMultiSelectChange");
    // const { types } = event.target;
    const allValsTypes = Array.from(event.target.selectedOptions).map(
      option => option.value
    );
    console.log(this.state.types);
    this.setState({ types: allValsTypes });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log("PROPS", this.props.shop)
   // const { params } = this.props.match;
    const shopId = this.props.shop;
   // console.log("params from the front", params)
    console.log("params from the front", shopId)

    axios
      .post(process.env.REACT_APP_SERVER_URL + `/api/shop-details/${shopId}`, this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("add review", response.data);
        // this.setState({ isSubmitSuccessful: true })
      })
      .catch(err => {
        console.log("add review", err);
        alert("Sorry! Something went wrong.");
      });
     
    this.props.updateDetailsPage(false)
  }
  render() {
    const {
      rating,
      cuisine,
      diet,
      timeframe,
      types,
      price_level,
      comment
    } = this.state;
    console.log(this.props.match);
    return (
      <div className="AddReview">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Rating
            <input
              value={rating}
              onChange={event => this.genericSync(event)}
              type="number"
              name="rating"
              className="Rating"
              max="5"
              min="0"
            />
          </label>
          <p>What type of cuisine was it?</p>
          <select
            value={cuisine}
            onChange={this.handleMultiSelectChangeCuisine}
            multiple
            name="cuisine"
          >
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Chinese">Chinese</option>
            <option value="French">French</option>
            <option value="Greek">Greek</option>
            <option value="Burgers">Burgers</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Pizza">Pizza</option>
            <option value="Japanese">Japanese</option>
            <option value="Mexican">Mexican</option>
            <option value="Moroccan">Moroccan</option>
            <option value="Spanish">Spanish</option>
            <option value="Thaï">Thaï</option>
            <option value="Lebanese">Lebanese</option>
            <option value="Turkish">Turkish</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Healthy">Healthy</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Gourmet">Gourmet</option>
            <option value="German">German</option>
          </select>

          <label>
            What type of diet did you found?
            <select
              value={diet}
              onChange={this.handleMultiSelectChangeDiet}
              multiple
              name="diet"
            >
              <option value="Vegan">Vegan</option>
              <option value="Veggie">Veggie</option>
              <option value="Gluten Free">Gluten Free</option>
              <option value="Paleo">Paleo</option>
              <option value="Dairy-free">Dairy-free</option>
            </select>
          </label>

          {/* <PriceLevelRadioButton />
          <TimeframeRadioButton /> */}

          <label>
            How long did you wait?
            <select name="timeframe"
            value={timeframe}
            onChange={event => this.genericSync(event)}>
              <option value="quick and easy">Quick and Easy</option>
              <option value="time to chat">Time to chat</option>
              <option value="be patient">Be patient</option>
            </select>
          </label>

          <label>
            What about the price?
            <select
              value={price_level}
              onChange={event => this.genericSync(event)}
              name="price_level"
            >
              <option value="€">€</option>
              <option value="€€">€€</option>
              <option value="€€€">€€€</option>
              <option value="€€€€">€€€€</option>
            </select>
          </label>

          <label>
            Was it possible to sit? And to take away?
            <select 
            value={types}
            onChange={this.handleMultiSelectChangeTypes}
            name="types"
            multiple>
              <option value="Take away">Take away</option>
              <option value="Sit-in">Sit-in</option>
            </select>
          </label>
          <input
            value={comment}
            onChange={event => this.genericSync(event)}
            type="text"
            name="comment"
            className="Comment"
            placeholder="Let the world know!"
          />
          <button>Submit Your Review</button>
        </form>
      </div>
    );
  }
}

export default AddReview;
