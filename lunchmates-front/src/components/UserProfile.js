import React, { Component } from "react";
import RestaurantPicturePreview from "./RestaurantPicturePreview.js";
import OneReview from "./OneReview.js";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="UserProfile">
        <div className="UserProfileHeader">
          <img src="avatar" alt="user" />

          <div className="UserInfo">
            <h2>Name</h2>
            <h3>Company</h3>
            <p>Email</p>

            <div>
              <input type="checkbox" name="messenger">
                Enable other users to contact me and have lunch
              </input>
            </div>
            {/* Display one or the other depending if you are the current user or not */}
            <div>
              <Link to="/">Send A message to have Lunch</Link>
            </div>
          </div>
        </div>

        <div className="FavoritePlaces">
          <h2>My favorite places</h2>
          <RestaurantPicturePreview />
        </div>

        <div className="MyLastReviews">
          <h2>My last reviews</h2>
          <OneReview />
        </div>
      </section>
    );
  }
}

export default UserProfile;
