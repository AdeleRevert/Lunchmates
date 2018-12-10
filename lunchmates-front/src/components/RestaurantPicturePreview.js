import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RestaurantPicturePreview.css";

class RestaurantPicturePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      console.log(this.props.currentUser)
      // this.setState({searchResults: this.props.currentUser.favorites});
    } 

    axios
      .get(`http://localhost:5000/api/shop/`, { withCredentials: true })
      .then(response => {
        //console.log("Response data of shop/searchTerm:", response.data);
        const tempArray = response.data.businesses.splice(3, 1);
        tempArray.slice(0,4);
        this.setState({ searchResults: response.data.businesses });
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });
  }

  render() {
    const { searchResults } = this.state;

    return (
      <section className="RestaurantPicturePreview">
        <ul className="ListofRestaurantPicturePreview">
          {searchResults.map(oneResult => {
            return (
              <li key={oneResult.id} className="OneRestaurantPicturePreview">
                <Link to={`/shop-details/${oneResult.id}`}>
                  <img src={oneResult.image_url} alt="restaurant" />
                </Link>
                <Link to={`/shop-details/${oneResult.id}`}>
                  <div className="RestaurantInfoOverlay">
                    <p>{oneResult.name}</p>
                    <p>
                      {oneResult.location.address1}{" "}
                      {oneResult.location.zip_code} {oneResult.location.city}
                    </p>
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
