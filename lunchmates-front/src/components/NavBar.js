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
            src="./images/logo_lunchm8.png"
            alt="logo"
          />
        </div>
        <nav>
          {currentUser ? (
            <div className="LoggedinUserNav">
              <p>Hi, {currentUser.firstName}</p>
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
