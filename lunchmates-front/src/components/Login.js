import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="Login">
        <h2>Log In</h2>

        <form>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="originalPassword" placeholder="*****" />
        </form>

        <button>Log In</button>
      </section>
    );
  }
}

export default Login;
