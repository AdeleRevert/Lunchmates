import React, { Component } from "react";
import axios from "axios";

class OneReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: []
    };
  }

  componentDidMount() {
    const { reviewsResults } = this.props;
    const { shop } = this.props;
    console.log("Reviews LIST", reviewsResults);
    axios
      .get(`http://localhost:5000/api/review/${shop}`, { withCredentials: true })
      .then(response => {
        console.log("Response data of /reviews by shopId", response.data);
        const reviewsArray = response.data;
        this.setState({ reviewsArray });
        console.log("REVIEWS ARRAY", reviewsArray);
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });
  }
  
  render() {
    const {reviewsArray} = this.state;
    console.log("REVIEWS ARRAY IN RENDER", reviewsArray);

    return (
      <section className="OneReview">
       reviewsArray
      </section>
    );
  }
}

export default OneReview;
