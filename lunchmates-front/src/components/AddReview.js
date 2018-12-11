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
      timeframe: [],
      types: [],
      price_level: "",
      comment: "",
      // isSubmitSuccessful: false,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChange(event) {
    const { selectedCuisineTypes } = this.state;
    this.setState({ selectedCuisineTypes: event.target.value });
    console.log("cuisine type", selectedCuisineTypes);
  }

  handleSubmit(event){
    event.preventDefault();
    axios
    .post("http://localhost:5000/api/add-review", this.state, {withCredentials: true })
    .then(response => {
      console.log("add review", response.data);
      // this.setState({ isSubmitSuccessful: true })
    })
    .catch(err => {
      console.log("add review", err);
      alert("Sorry! Something went wrong.");
    });
  }
  render() {
    return (
      <div className="AddReview">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Rating
            <input
              value={this.state.rating}
              onChange={event => this.genericSync(event)}
              type="number"
              name="rating"
              max="5"
              min="0"
            />
          </label>
          <p>What type of cuisine was it?</p>
          <select 
          value={this.state.cuisine} 
          onChange={event => this.genericSync(event)}
          multiple={true} 
          name="cuisine">
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Chinese">Chinese</option>
            <option value="French">French</option>
            <option value="Greek">Greek</option>
            <option value="Burgers">Burgers</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Pizza">Pizza</option>
            <option value="Japanese">Japense</option>
            <option value="Mexican">Mexican</option>
            <option value="Moroccan">Moroccan</option>
            <option value="Spanish">Spanish</option>
            <option value="Thaï">Thaï</option>
            <option value="Lebansese">Lebansese</option>
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
            value={this.state.diet}
            onChange={event => this.genericSync(event)}
            multiple={true} 
            name="diet">
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
            <select name="timeframe">
              <option value="quick and easy">Quick and Easy</option>
              <option value="time to chat">Time to chat</option>
              <option value="be patient">Be patient</option>
            </select>
          </label>

          <label>
            What about the price?
            <select 
            value={this.state.price_level}
            onChange={event => this.genericSync(event)}
            name="price_level">
              <option value="€">€</option>
              <option value="€€">€€</option>
              <option value="€€€">€€€</option>
              <option value="€€€€">€€€€</option>
            </select>
          </label>

          <label>
            Was it possible to sit? And to take away?
            <select 
            value={this.state.types}
            onChange={event => this.genericSync(event)}
            name="types">
              <option value="Take away">Take away</option>
              <option value="Sit-in">Sit-in</option>
            </select>
          </label>
          <input 
          value={this.state.comment}
          onChange={event => this.genericSync(event)}
          type="text" name="comment" placeholder="Let the world know!" />
          <button>Submit Your Review</button>
        </form>
      </div>
    );
  }
}

export default AddReview;
