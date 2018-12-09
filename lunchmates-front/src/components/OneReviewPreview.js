import React, { Component } from "react";
import "./OneReviewPreview.css"
class OneReviewPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="OneReviewPreview">
        <img src="/userpic" alt="user" />
        <div className="ReviewPreview">
          <p>Rating</p>
          <p>Comment</p>
        </div>
      </section>
    );
  }
}

export default OneReviewPreview;
