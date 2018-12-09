import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HomePageSearch.css";

class HomePageSearch extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
      };
    }
  
    render() {
  
      return (
        <section className="HomePageSearch">
          <Link to="/shop"><input placeholder="What are you looking for?" /></Link>
        </section>
      );
    }
  }

 
export default HomePageSearch;