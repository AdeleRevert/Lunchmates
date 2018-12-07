import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      originalPassword: "",
      messenger: false,
      currentUser: null,
    };
  }

  genericSync(event){
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmitEvent(event){
    event.preventDefault();

    axios
    .post("http://localhost:5555/signup", this.state, {withCredentials: true })
    .then(response => {
      console.log("Signup Page", response.data);
      const { userDoc } = response.data;
      this.props.onUserChange(userDoc);
    })
    .catch(err => {
      console.log("SIgnup Page ERROR", err);
      alert("SOmething went wrong");
    });
  }

  render() {
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

          <input 
          value={this.state.companyName}
          onChange={event => this.genericSync(event)}
          type="text" 
          name="companyName" 
          placeholder="Company Name" 
          />

          <input 
          value={this.state.messenger}
          onChange={event => this.genericSync(event)}
          type="checkbox" 
          name="messenger" 
          />
          Do you allow other lunchmates to you you to go to lunch?
        
        </form>

        <button>Sign Up</button>
      </section>
    );
  }
}

export default Signup;
