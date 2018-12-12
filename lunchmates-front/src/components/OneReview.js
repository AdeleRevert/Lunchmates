import React, { Component } from "react";
import axios from "axios";

class OneReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { reviewsResults } = this.props;
    const { shopId } = this.props;
    console.log(shopId);
    //const { searchTerm } = this.props;
    console.log("Reviews LIST", reviewsResults)
    axios.get("http://localhost:5000/api/reviews", { withCredentials: true })
    .then(response => {
    console.log("Response data of /reviews:", response.data);
    // this.setState({ searchResults: response.data.businesses });
    })
    .catch(err => {
      console.log("Search page ERROR", err);
      alert("Something went wrong with the search, sorray");
    });
  }
  render() {
    return (
      <section className="OneReview">
        <div className="ReviewerPicture">
          <img src="user-picture" alt="reviewer" />
        </div>
        <div className="ReviewInfo">
        <h3>User Name</h3>
        <p>Rating</p>
        <p>Diet found (we're going to bu cute boxes)</p>
        <p>Cuisine type (we're going to bu cute boxes)</p>
        <p>Time frame</p>
        <p>Comment</p>
        </div>
      </section>
    );
  }
}

export default OneReview;
