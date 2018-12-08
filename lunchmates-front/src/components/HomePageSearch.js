import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePageSearch extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
      };
    }
  
    render() {
  
      return (
        <section className="HomePageSearch">
          <Link to="/shop"><input placeholder="search" /></Link>
        </section>
      );
    }
  }

 
export default HomePageSearch;