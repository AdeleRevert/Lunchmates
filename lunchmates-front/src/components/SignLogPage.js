import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup.js";

class SignLogPage extends Component {
  render() { 
    return ( 
      <div className="SignLogPage">
      <Login />
      <Signup />
      </div>
     );
  }
}
 
export default SignLogPage;