import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="Header">
        <h2>Hey I'm your Header!</h2>
      </section>
    );
  }
}

export default Header;
