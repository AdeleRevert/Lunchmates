import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import axios from "axios";
import "./NavBar.css";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logOutClick() {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + "/api/logout", { withCredentials: true })
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
    //console.log(currentUser);
    return (
      <section className="NavBar">
      <div className="NavContain">
        <div className="logo">
          <NavLink to="/">
          <img
            src="../images/logo_lunchm8.png"
            alt="LunchMates"
          />
          </NavLink>
        </div>
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
        </div>
      </section>
    );
  }
}

export default NavBar;
