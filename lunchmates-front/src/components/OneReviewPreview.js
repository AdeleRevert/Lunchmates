import React, { Component } from "react";
import "./OneReviewPreview.css";
import axios from "axios";

class OneReviewPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviewsArray: []
    };
  }

  componentDidMount() {
    if (this.props.currentUser !== false) {
      this.getReviews();
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.currentUser === false && this.props.currentUser !== false) {
      this.getReviews();
    }
  }

  getReviews() {
    if(this.props.currentUser){
      axios
      .get(process.env.REACT_APP_SERVER_URL + `/api/reviews-workmates`, {
        withCredentials: true
      })
      .then(response => {
        console.log(
          "Response data of /all reviews by workmates sorted by createdAt",
          response.data
        );
        this.setState({ allReviewsArray: response.data });
        console.log("ALL REVIEWS ARRAY by workmates", this.state.allReviewsArray);
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });

    } else {
      axios
      .get(process.env.REACT_APP_SERVER_URL + `/api/reviews`, {
        withCredentials: true
      })
      .then(response => {
        console.log(
          "Response data of /all reviews sorted by createdAt",
          response.data
        );
        this.setState({ allReviewsArray: response.data });
        console.log("ALL REVIEWS ARRAY", this.state.allReviewsArray);
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });

    }
  }

  render() {
    const { allReviewsArray } = this.state;
    console.log("ALL REVIEWS ARRAY IN RENDER", allReviewsArray);

    return (
      <section className="OneReviewPreview">
        {allReviewsArray.map(oneReview => {
          return (
            <div className="ReviewPreview">
              <div className="ReviewerPicture">
                <img src="../images/user.jpeg" alt="reviewer" />
                <h4>{oneReview.userId.firstName}</h4>
                {/* <p>{oneReview.userId}</p> */}
              </div>
              <div className="ReviewInfo">
                <h2>{oneReview.rating}/5</h2>
                <p>{oneReview.shopId.name}</p>
                <p>{oneReview.comment}</p>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default OneReviewPreview;
