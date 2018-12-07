import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="Signup">
        <h2>Sign Up</h2>

        <form>
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="originalPassword" placeholder="*****" />
          <input type="text" name="companyName" placeholder="Company Name" />
          <input type="checkbox" name="messenger" />Do you allow other lunchmates to you you to go to lunch?
        </form>

        <button>Sign Up</button>
      </section>
    );
  }
}

export default Signup;
