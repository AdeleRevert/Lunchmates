import React, { Component } from "react";
import AddReview from "./AddReview";
import OneReview from "./OneReview.js";

import axios from "axios";

import "./RestaurantDetails.css";

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopInFav: false,
      shopFavored: false,
    };
  }

  componentDidMount() {
   
    const { params } = this.props.match;
    //console.log("params", params);
    axios.get(process.env.REACT_APP_SERVER_URL + `/api/shop-details/${params.shopId}`, { withCredentials: true })
    .then(response => {
      //console.log("Response data of single restaurant", response.data);
      if (response.data.user.yelpFavorites.includes(params.shopId)) {
        this.setState({shopInFav: true});
      }
      this.setState(response.data.shop);
    })
    .catch(err => {
      console.log("Shop Details ERROR", err);
      alert("Something went wrong with the shop details list, sorray");
    });
  }

  addShopToFav() {
    console.log("coucou")
    const { params } = this.props.match;
    axios.put(process.env.REACT_APP_SERVER_URL + `/api/add-shop/${params.shopId}`, {}, { withCredentials: true })
    .then(response => {
      //console.log("Response data of adding a resto to fav", response.data);
      this.setState({ shopFavored: true })
    })
    .catch(err => {
      console.log("Add-Shop ERROR", err);
      alert("Something went wrong with adding the shop to your favorites, sorry!");
    });
  }

  render() {
    const shopId = this.props.match.params.shopId;
    console.log("resto details", shopId)
    const { name, rating, display_phone, price, image_url } = this.state;
    return (
      <section className="RestaurantDetails">
        <h2>Hey I'm your Restaurant Details Component!</h2>
        <div className="RestaurantDetailsHeader">
          <img src={image_url} alt={name} />

          <div className="RestaurantDetailsInfo">
            <h2>{name}</h2>
            <p>Rating: {rating}</p>
            {/* <p>{location.address1} {location.zip_code} {location.city}</p> */}
            <p>{display_phone}</p>
            <p>Type of cuisine</p>
            <p>Diets available</p>
            <p>{price}</p>
            
            {this.state.shopInFav ? 
              <p>This place is in your favorites</p> 
              : 
              <div> 
                {this.state.shopFavored ? 
                <p>Added to your list of favorites!</p> 
                : 
                <button onClick={() => this.addShopToFav()}>+ Add to your favorites</button>
                }
              </div>
            }
          </div>
        </div>

        <div className="ReviewsList">
        {/* show the component AddReview when the user click on the Add a Review button */}
        <AddReview  shop={shopId} className="HiddenAddReviewForm" />

        <OneReview shop={shopId}/>

        </div>
      </section>
    );
  }
}

export default RestaurantDetails;
