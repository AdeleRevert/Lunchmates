import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup.js";

class SignLogPage extends Component {
  render() { 
    return ( 
      <div className="SignLogPage">
      <Login currentUser={this.props.currentUser}
              onUserChange={this.props.onUserChange}/>
      <Signup currentUser={this.props.currentUser}
              onUserChange={this.props.onUserChange}/>
      </div>
     );
  }
}
 
export default SignLogPage;