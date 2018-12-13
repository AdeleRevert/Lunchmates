import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomePageSearch from "./HomePageSearch.js";
import OneReviewPreview from "./OneReviewPreview.js";
import RestaurantPicturePreview from "./RestaurantPicturePreview.js";
import "./HomePage.css";
import axios from "axios";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      companyAddress: "",
    };
  }

  componentDidMount() {
    this.getCompanyInfo();
  }

  componentDidUpdate(oldProps) {
    if (!oldProps.currentUser && this.props.currentUser) {
      this.getCompanyInfo();
    }
  }

  getCompanyInfo() {
    // We check if the user is logged-in, if yes, then we send the request to the server (otherwise, it creates an error)
    if (this.props.currentUser) {
      axios
      .get(process.env.REACT_APP_SERVER_URL +  "/api/user-company", { withCredentials: true })
      .then(response => {
        //console.log("response.data", response.data)
        const { addressCoordinates } = response.data;
        const name = response.data.name;
        console.log("company name", name)
        console.log("company address", addressCoordinates.string)
        this.setState({ companyName: name, companyAddress: addressCoordinates.string})
      })
      .catch(err => {
        console.log("user company info", err);
        alert("Sorry! Something went wrong.")
      })
    }
  }

  render() {
    const { currentUser } = this.props;
    //console.log(currentUser);
    const { companyName } = this.state;
    console.log("HEYAAAAAAA", companyName);
    const {companyAddress} = this.state;
    console.log("HOAAAAA", companyAddress);
    return (
      <section className="HomePage">

        <div className="HomePageHeader">
          <h2>Find the perfect place to have lunch!</h2>

          <HomePageSearch getSearchedTerm={this.props.getSearchedTerm}/>

          <div className="TextUnderSearch">
            {currentUser && (
              <div className="UserCompanyInfo">
                <p>{ companyName }, { companyAddress }</p>
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
            <OneReviewPreview currentUser={this.props.currentUser}/>
          </div>
        </div>

        <div className="bestRatedPlaces">
          {currentUser ? (
            <h3>Best Rated Places Around You</h3>
          ) : (
            <h3>Best Rated Places</h3>
          )}

          <RestaurantPicturePreview  />
        </div>
      </section>
    );
  }
}

export default HomePage;
