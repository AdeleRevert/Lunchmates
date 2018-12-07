import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.js";
import Search from "./Search.js";
import OneReviewPreview from "./OneReviewPreview.js";
import RestaurantPicturePreview from "./RestaurantPicturePreview.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <section className="HomePage">
        <NavBar currentUser={this.props.currentUser}
                onLogOut={this.props.onLogOut}/>
        <h2>Welcome to your Home Page Beauty</h2>

        <div className="HomePageHeader">
          <h2>Find the perfect place to have lunch!</h2>
          
          <Search />

          <Link to="/shop"><input placeholder="search" /></Link>

          <div className="TextUnderSearch">
            <Link to="/">
              <button>+ All filters</button>
            </Link>
            <div>
              {/* Only when you're logged-in */}
              <p>Company name</p>
              <p>Company address</p>
            </div>
          </div>
        </div>

        <div className="reviewsCaroussel">
          <h3>Last Added Reviews by your Workmates</h3>
          {/* if you're logged-in */}
          <h3>Last Added Reviews</h3> {/* if you're not logged-in*/}
          <OneReviewPreview />
        </div>

        <div className="bestRatedPlaces">
          <h3>Best Rated Places Around You</h3> {/* if you're logged-in */}
          <h3>Best Rated Places</h3> {/* if you're not logged-in */}
          <RestaurantPicturePreview />
        </div>
      </section>
    );
  }
}

export default HomePage;
