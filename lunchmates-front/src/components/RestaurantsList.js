import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



class RestaurantsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopFavored: false,
      // empty array that will receive the result once filtered
      searchResults: []
    };
  }
  // a modifier par /resto et une search générique par coordonnées de la boite
  componentDidMount() {
    const { searchTerm } = this.props;
    //const { searchTerm } = this.props;
    //console.log("RestoList/searchTerm", searchTerm)
    axios.get(`http://localhost:5000/api/shop/${searchTerm}`, { withCredentials: true })
    .then(response => {
      //console.log("Response data of shop/searchTerm:", response.data);
    this.setState({ searchResults: response.data.businesses });
    })
    .catch(err => {
      console.log("Search page ERROR", err);
      alert("Something went wrong with the search, sorray");
    });
  }

// Need to tell it to update every time the searchTerm is updated
  componentDidUpdate(previousProps) {
    const { searchTerm } = this.props;
    // "PreviousProps" is the object of the props before it was updated so need to look inside it
    if (searchTerm === previousProps.searchTerm) {
      return;
    }

    //("RestoList/searchTerm", searchTerm)
    axios.get(`http://localhost:5000/api/shop/${searchTerm}`, { withCredentials: true })
    .then(response => {
      //console.log("Response data of shop/searchTerm:", response.data);
    this.setState({ searchResults: response.data.businesses });
    })
    .catch(err => {
      console.log("Search page ERROR", err);
      alert("Something went wrong with the search, sorray");
    });
  }

   addShopToFav(oneResult) {
    console.log(oneResult);
    const id = oneResult.id;
    console.log("id", id);
    return axios.put(`http://localhost:5000/api/add-shop/${id}`, {}, { withCredentials: true })
    .then(response => {
      console.log("Response data of adding a resto to fav", response.data);
      //this.setState({ shopFavored: true })
    })
    .catch(err => {
      console.log("Add-Shop ERROR", err);
      alert("Something went wrong with adding the shop to your favorites, sorry!");
    });
  }

  render() {
    const { searchResults } = this.state;

    return (
      <section className="RestaurantsList">
        <ul>
          {searchResults.map(oneResult => {
            return (
              <li key={oneResult.id}>
                <img src={oneResult.image_url} alt={oneResult.name}/>
                <h3><Link to={`/shop-details/${oneResult.id}`}>{oneResult.name}</Link></h3>
                <p>{oneResult.location.display_address}</p>
                <p>rating Yelp: {oneResult.rating}</p>
                <button onClick={() => this.addShopToFav(oneResult)}>+ Add to your favorites</button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default RestaurantsList;
