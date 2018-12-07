import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: "",
    };
  }

  genericSync(event){
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    event.preventDefault();

    axios
    .post("http://localhost:5000/api/login", this.state, { withCredentials: true })
    .then(response => {
      console.log("Login Page", response.data);
      const { userDoc } = response.data;
      this.props.onUserChange(userDoc);
    })
    .catch(err => {
      console.log("Login Page ERROR", err);
      alert("Sorry! Something went wrong");
    });
  }
  
  render() {
    if(this.props.currentUser){
      return <Redirect to="/" />
    }
    return (
      <section className="Login">
        <h2>Log In</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <input 
          value={this.state.email}
          onChange={event => this.genericSync(event)}
          type="email" 
          name="email" 
          placeholder="Email" 
          />
          <input 
          value={this.state.originalPassword}
          onChange={event => this.genericSync(event)}
          type="password" 
          name="originalPassword" 
          placeholder="*****" 
          />
          <button>Log In</button>
        </form>

        
      </section>
    );
  }
}

export default Login;
