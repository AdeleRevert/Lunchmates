import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.js";
import HomePageSearch from "./HomePageSearch.js";
import OneReviewPreview from "./OneReviewPreview.js";
import RestaurantPicturePreview from "./RestaurantPicturePreview.js";
import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { currentUser } = this.props;
    return (
      <section className="HomePage">
        <NavBar
          currentUser={this.props.currentUser}
          onLogOut={this.props.onLogOut}
        />

        <div className="HomePageHeader">
          <h2>Find the perfect place to have lunch!</h2>

          <HomePageSearch getSearchedTerm={this.props.getSearchedTerm}/>

          <div className="TextUnderSearch">
            {currentUser && (
              <div className="UserCompanyInfo">
              <p>Company name, Company address</p>
            </div>            
            )}

            
            <Link to="/shop" className="FilterLink">
              <button>+ All filters</button>
            </Link>
          </div>
        </div>

        <div className="LastAddedReviews">
          {currentUser ? (
            <h3>Last Added Reviews by your Workmates</h3>
          ) : (
            <h3>Last Added Reviews</h3>
          )}

          <div className="reviewsCaroussel">
            <OneReviewPreview />
            <OneReviewPreview />
            <OneReviewPreview />
          </div>
        </div>

        <div className="bestRatedPlaces">
          {currentUser ? (
            <h3>Best Rated Places Around You</h3>
          ) : (
            <h3>Best Rated Places</h3>
          )}

          <RestaurantPicturePreview />
        </div>
      </section>
    );
  }
}

export default HomePage;
