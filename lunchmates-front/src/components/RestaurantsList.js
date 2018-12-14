import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RestaurantsList.css";


class RestaurantsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopFavored: false,
      // empty array that will receive the result once filtered
      searchResults: [],
    };
  }
  // a modifier par /resto et une search générique par coordonnées de la boite
  componentDidMount() {
    const { searchTerm } = this.props;
    console.log("RestoList/searchTerm", searchTerm)
    axios.get(process.env.REACT_APP_SERVER_URL + `/api/shop-search/${searchTerm}`, { withCredentials: true })
    .then(response => {
      //console.log("Response data of shop/searchTerm:", response.data);
      const listOfShops = response.data.shop.businesses;
      
      // Check if the resto if part of the user's favorites IF the user is logged-in
      if (this.props.currentUser) {
        for (let i = 0; i < listOfShops.length; i++) {
          //console.log("true", response.data.user.yelpFavorites.includes(listOfShops[i].id));
          if (response.data.user.yelpFavorites.includes(listOfShops[i].id)) {
            listOfShops[i].shopinFav = true;  
          } else {
            listOfShops[i].shopinFav = false;
          }
        }
      }
      //console.log("listOfShops", listOfShops);
    this.setState({ searchResults: listOfShops });
      
    })
    .catch(err => {
      console.log("Search page ERROR Mount", err);
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
    axios.get(process.env.REACT_APP_SERVER_URL + `/api/shop-search/${searchTerm}`, { withCredentials: true })
    .then(response => {
      //console.log("Response data of shop/searchTerm:", response.data);
      
      const listOfShops = response.data.shop.businesses;
      
      // Check if the resto if part of the user's favorites IF the user is logged-in
      if (this.props.currentUser) {
        for (let i = 0; i < listOfShops.length; i++) {
          //console.log("true", response.data.user.yelpFavorites.includes(listOfShops[i].id));
          if (response.data.user.yelpFavorites.includes(listOfShops[i].id)) {
            listOfShops[i].shopinFav = true;  
          } else {
            listOfShops[i].shopinFav = false;
          }
        }
      }
     
      //console.log("listOfShops", listOfShops);
    this.setState({ searchResults: listOfShops });
    })
    .catch(err => {
      console.log("Search page ERROR Update", err);
      alert("Something went wrong with the search, sorray");
    });
  }

   addShopToFav(oneResult) {
    
    const id = oneResult.id;
    //console.log("id", id);
    return axios.put(process.env.REACT_APP_SERVER_URL + `/api/add-shop/${id}`, {}, { withCredentials: true })
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
    const { searchResults } = this.state;

    return (
      <section className="RestaurantsList">
        <ul>
          {searchResults.map(oneResult => {
            return (
              <li key={oneResult.id}>
                <img src={oneResult.image_url} alt={oneResult.name}/>
                <h3><Link to={`/shop-details/${oneResult.id}`}>{oneResult.name}</Link></h3>
                {/* <p>{oneResult.location.address1} {oneResult.location.zip_code} {oneResult.location.city}</p> */}
                <p>rating Yelp: {oneResult.rating}</p>

                {this.props.currentUser &&
                <div>
                {oneResult.shopinFav ? 
                  <p>This place is already in your favorites</p>
                  :
                  <div>
                    {this.state.shopFavored ?
                    <p>Added to your list of favorites</p> 
                    :
                    <button onClick={() => this.addShopToFav(oneResult)}>+ Add to your favorites</button>
                    }
                  </div>
                }
                </div>
                }
                
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default RestaurantsList;
