import React, { Component } from "react";
import axios from "axios";

class OneReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: []
    };
  }

  componentDidMount() {
    const { shop } = this.props;
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/api/review/${shop}`, { withCredentials: true })
      .then(response => {
        console.log("Response data of /reviews by shopId", response.data);
        this.setState({ reviewsArray: response.data });
        console.log("REVIEWS ARRAY", this.state.reviewsArray);
      })
      .catch(err => {
        console.log("Search page ERROR", err);
        alert("Something went wrong with the search, sorray");
      });
  }
  
  render() {
    const { reviewsArray } = this.state;
    console.log("REVIEWS ARRAY IN RENDER", reviewsArray);

    return (
      <section className="OneReview">
       {reviewsArray.map(oneReview => {
         return (
           <div>
             <div className="ReviewerPicture">
               <img src="user-picture" alt="reviewer" />
             </div>
             <div className="ReviewInfo">
               <h3>{oneReview.userId.firstName}</h3>
               <p>{oneReview.rating}</p>
               <div>{oneReview.diet.map(oneDiet => {
                 return (
                   <p>{oneDiet}</p>
                 )})}
                 </div>
               <div>{oneReview.cuisine.map(oneCuisine => {
                 return (
                   <p>{oneCuisine}</p>
                 )})}
               </div>
               <p>{oneReview.price_level}</p>
               <p>{oneReview.timeframe}</p>
               <p>{oneReview.comment}</p>
              <div>{oneReview.types.map(oneType => {
                return (
                  <p>{oneType}</p>
                )})}
              </div>
            </div>
           </div>
         );
       })}
      </section>
    );
  }
}

export default OneReview;
