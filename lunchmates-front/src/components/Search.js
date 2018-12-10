import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      searchSubmitted: false,
    };
  }

  componentDidMount() {
    const { searchTerm } = this.props;
    this.setState({ userInput: searchTerm });
  }

  fetchUserInput(event) {
    const { value } = event.target;
    console.log("Search/userInput", this.state.userInput);
    this.setState({ userInput: value });
    console.log("Search/event.target.value", value);
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
    // if (this.state.searchSubmitted) {
    //   // redirect back t the phone list page if the form submission worked
    //   return <Redirect to="/resto-list" />
    // }

    const { searchTerm } = this.props;

    return (
      <section className="Search">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <input onChange={event => this.fetchUserInput(event)}
            value={this.state.userInput}
            type="text" name="userInput" placeholder="Search..." />
            <button>Look for a place!</button>
          </label>
        </form>
      </section>
    );
  }
}

export default Search;
