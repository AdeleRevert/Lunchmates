import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import RestaurantPicturePreview from "./RestaurantPicturePreview.js";
import OneReview from "./OneReview.js";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCompany: "",
    };
  }

  componentDidMount() {
      axios.get(process.env.REACT_APP_SERVER_URL + `/api/checkuser`, { withCredentials: true })
      .then(response => {
        console.log("Response data of the /checkuser", response.data);
        const userCompany = response.data.userDoc.companyId.name;
        console.log("companyName =", userCompany)
        this.setState({userCompany: response.data.userDoc.companyId.name});
      })
      .catch(err => {
        console.log("One Review User ID ERROR", err);
        alert("Something wen twrong with the retrieval of the reviews of the user, sorry!");
      });

    }
  render() {
    const { currentUser } = this.props;
    console.log("UserProfile", currentUser);
    const userCompany = this.state;
    console.log("userCompany from state", userCompany)
    return (
      <section className="UserProfile">
        <div className="UserProfileHeader">
          <img classname="UserPicture" src="avatar" alt="user" />

          <div className="UserInfo">
            <h2>{currentUser.firstName} </h2>
            <h3>{this.state.userCompany}</h3>
            <p>{currentUser.email}</p>

            <div className="UserPreferences">
              <div>
              <input className="Checkbox" type="checkbox" name="messenger" />
              Enable other users to contact me and have lunch
              </div>
            {/* Display one or the other depending if you are the current user or not */}

              <Link to="/">Send A message to have Lunch</Link>

            </div>
          </div>
        </div>

        <div className="FavoritePlaces">
          <h2>My favorite places</h2>
          <RestaurantPicturePreview currentUser={this.props.currentUser} />
        </div>

        <div className="MyLastReviews">
          <h2>My last reviews</h2>
          <OneReview currentUser={this.props.currentUser} />
        </div>
      </section>
    );
  }
}

export default UserProfile;
