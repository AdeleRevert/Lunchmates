import React, { Component } from "react";
import axios from "axios";

import "./OneReview.css";

class OneReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: []
    };
  }

  componentDidMount() {
    const { shop } = this.props;
    const { currentUser } = this.props;
    if (currentUser) {
      axios.get(process.env.REACT_APP_SERVER_URL + `/api/review-user`, { withCredentials: true })
      .then(response => {
        console.log("Response data of the user reviews", response.data);
        this.setState({reviewsArray: response.data});
      })
      .catch(err => {
        console.log("One Review User ID ERROR", err);
        alert("Something wen twrong with the retrieval of the reviews of the user, sorry!");
      });
    } else {

      axios
        .get(process.env.REACT_APP_SERVER_URL + `/api/review/${shop}`, { withCredentials: true })
        .then(response => {
          console.log("Response data of /reviews by shopId", response.data);
          this.setState({ reviewsArray: response.data });
          console.log("REVIEWS ARRAY", this.state.reviewsArray);
        })
        .catch(err => {
          console.log("One Review ERROR", err);
          alert("Something went wrong with the review retrieval, sorray");
        });
    }
  }
  
  render() {
    const { reviewsArray } = this.state;
    console.log("REVIEWS ARRAY IN RENDER", reviewsArray);

    return (
      <section className="OneReview">
       {reviewsArray.map(oneReview => {
         return (
           <div key={oneReview._id} className="ReviewPreview">
             <div className="ReviewerPicture">
               <img src="user-picture" alt="reviewer" />
               <h3>{oneReview.userId.firstName}</h3>
             </div>
             <div className="ReviewInfo">
               <p>Rating: {oneReview.rating} -- Budget: {oneReview.price_level}</p>
               <p>Expect to wait: {oneReview.timeframe}</p>
               <div>
                  {oneReview.diet > 0 && 
                    <div>
                    Diets available: {oneReview.diet.map(oneDiet => <p key={oneDiet}>{oneDiet}</p>)}
                    </div>
                    }
                </div>
                 
               <div>
                 Cuisine: {oneReview.cuisine.map(oneCuisine => <p key={oneCuisine}>{oneCuisine}</p>)}
               </div>
               <div>
                Sit-in or Take-away? {oneReview.types.map(oneType => <p key={oneType}>{oneType}</p>)}
              </div>
               <p>{oneReview.comment}</p>
             
            </div>
           </div>
         );
       })}
      </section>
    );
  }
}

export default OneReview;
