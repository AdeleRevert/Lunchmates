import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      // companyId: "",
      originalPassword: "",
      messenger: false,
      currentUser: null, 
    };
  }


  genericSync(event){
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  checkboxSync(event) {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  }

  handleSubmitEvent(event){
    event.preventDefault();
    console.log("UNICORN")
    axios
    .post("http://localhost:5000/api/signup", this.state, {withCredentials: true })
    .then(response => {
      console.log("Signup Page", response.data);
      const { userDoc } = response.data;
      this.props.onUserChange(userDoc);
    })
    .catch(err => {
      console.log("Signup Page ERROR", err);
      alert("Something went wrong");
    });
  }

  render() {
    console.log(this.state);
// check currentUser (received from App.js)
    if (this.props.currentUser) {
      return <Redirect to="/" />
    }

    return (
      <section className="Signup">
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleSubmitEvent(event)}>

          <input
          value={this.state.firstName} 
          onChange={event => this.genericSync(event)}
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          />

          <input
          value={this.state.lastName}
          onChange={event => this.genericSync(event)} 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          />

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

          {/* <input 
          value={this.state.companyId}
          onChange={event => this.genericSync(event)}
          type="text" 
          name="companyId" 
          placeholder="Company Name" 
          /> */}

          <input 
          value={this.state.messenger}
          onChange={event => this.checkboxSync(event)}
          type="checkbox" 
          name="messenger" 
          />
          Do you allow other lunchmates to you you to go to lunch?
        
        <button>Sign Up</button>
        </form>

      </section>
    );
  }
}

export default Signup;
