import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RestaurantPicturePreview.css";

function getShopUrl(oneResult) {
  if (oneResult.yelpId) {
    return `/shop-details/${oneResult.yelpId}`;
  } else {
    console.log("oneResult.yelpId", oneResult.yelpId);
    return `/shop-details/${oneResult.id}`;
  }
}


class RestaurantPicturePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() { 
    console.log("RestaurantPicturePreview", this.props.currentUser);
    if (this.props.currentUser) {
      console.log(this.props.currentUser)
      axios.get(`http://localhost:5000/api/user-favorites`, { withCredentials: true })
        .then(response => {
          //console.log("/user-favorites", response.data);
          this.setState({searchResults: response.data.favorites});
        })
        .catch(err => {
          console.log("Display Favorite Resto FAILED", err);
          alert("Something went wrong with the display of your fav resto, sorry");
        });
      
    } else {

    axios
      .get(`http://localhost:5000/api/shops/`, { withCredentials: true })
      .then(response => {
        //console.log("Response data of shop/searchTerm:", response.data);
        response.data.businesses.splice(4);
        this.setState({ searchResults: response.data.businesses });
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });
    }
  }



  render() {
    const { searchResults } = this.state;
    console.log("SearchResults", searchResults);

    return (
      <section className="RestaurantPicturePreview">
        <ul className="ListofRestaurantPicturePreview">
          {searchResults.map(oneResult => {
            return (
              <li key={oneResult.alias} className="OneRestaurantPicturePreview">
                {/* <Link to={oneResult => this.getShopUrl(oneResult)}> */}
                  <img src={oneResult.image_url} alt="restaurant" />
                {/* </Link> */}
                <Link to={getShopUrl(oneResult)}>
                  <div className="RestaurantInfoOverlay">
                    <p>{oneResult.name}</p>
                    {/* <p>
                      {oneResult.location.address1}{" "}
                      {oneResult.location.zip_code} {oneResult.location.city}
                    </p> */}
                    <p>{oneResult.rating}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default RestaurantPicturePreview;
