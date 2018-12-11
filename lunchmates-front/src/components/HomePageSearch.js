import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./HomePageSearch.css";

class HomePageSearch extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        userInput: "",
        searchSubmitted: false,
      };
    }
  
    fetchUserInput(event) {
      const { value } = event.target;
      //console.log("Search/userInput", this.state.userInput);
      this.setState({ userInput: value });
      //console.log("Search/event.target.value", value);
      //this.props.searchedTerm(value);
    }

    handleSubmit(event) {
      event.preventDefault();
  
      // const { value } = event.target;
      // console.log("Search/event.target.value", value);
      this.props.getSearchedTerm(this.state.userInput);
      
      this.setState({ searchSubmitted: true });
    }

    render() {

      if (this.state.searchSubmitted) {
        //console.log("redirect, bitch")
        // redirect back t the shop list page if the form submission worked hoping that the input will be trasnferred there^^
        return <Redirect to="/shop" />
      }

      return (
        <section className="HomePageSearch">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <input onChange={event => this.fetchUserInput(event)}
            value={this.state.userInput}
            type="text" name="userInput" placeholder="What are you looking for?" />
            <button>Look for a place!</button>
          </label>
        </form>
      </section>
      
      );
    }
  }

 
export default HomePageSearch;