import React, { Component } from "react";

class OneReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="OneReview">
        <div className="ReviewerPicture">
          <img src="user-picture" alt="reviewer" />
        </div>
        <div className="ReviewInfo">
        <h3>User Name</h3>
        <p>Rating</p>
        <p>Diet found (we're going to bu cute boxes)</p>
        <p>Cuisine type (we're going to bu cute boxes)</p>
        <p>Time frame</p>
        <p>Comment</p>
        </div>
      </section>
    );
  }
}

export default OneReview;
