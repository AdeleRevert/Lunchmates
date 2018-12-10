import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logOutClick() {
    axios
      .delete("http://localhost:5000/api/logout", { withCredentials: true })
      .then(() => {
        this.props.onLogOut(null);
      })
      .catch(err => {
        console.log("Logout Error", err);
        alert("Sorry, something went wrong!");
      });
  }

  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    return (
      <section className="NavBar">
        <div className="logo">
          <img
            src="data:image/jpeg;base64,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"
            alt="logo"
          />
        </div>
        <h1>LunchMates</h1>
        <nav>
          {currentUser ? (
            <div className="LoggedinUserNav">
              <p><NavLink to="/profile">Hi, {currentUser.firstName}</NavLink></p>
              <button onClick={() => this.logOutClick()}>Log out</button>
            </div>
          ) : (
              <button><NavLink to="/signup-page">Sign Up / Log In</NavLink></button>
          )}
        </nav>
      </section>
    );
  }
}

export default NavBar;
