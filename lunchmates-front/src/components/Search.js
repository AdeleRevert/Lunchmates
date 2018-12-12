import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      cuisine: "",
      diet: [],
      price_level: "",
      searchSubmitted: false,
    };
  }

  componentDidMount() {
    const { searchTerm } = this.props;
    this.setState({ userInput: searchTerm });
  }

  fetchUserInput(event) {
    const { value } = event.target;
    //console.log("Search/userInput", this.state.userInput);
    this.setState({ userInput: value });
    //console.log("Search/event.target.value", value);
    //this.props.searchedTerm(value);
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleMultipleSelectChangeDiet = event => {
    const allValsDiet = Array.from(event.target.selectedOptions).map(
      option => option.value
    );
    this.setState({ diet: allValsDiet });
  };


  handleSubmit(event) {
    event.preventDefault();

    // const { value } = event.target;
    // console.log("Search/event.target.value", value);
    this.props.getSearchedTerm(this.state.userInput);
    
    this.setState({ searchSubmitted: true });
  }

  render() {
    // if (this.state.searchSubmitted) {
    //   // redirect back to the phone list page if the form submission worked
    //   return <Redirect to="/resto-list" />
    // }

    //const { searchTerm } = this.props;

    return (
      <section className="Search">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <input onChange={event => this.fetchUserInput(event)}
            value={this.state.userInput}
            type="text" name="userInput" placeholder="Search..." />
          </label>

          <label>
            Cuisine:
            <select onChange={event => this.genericSync(event)}
                    name="cuisine" value={this.state.cuisine}>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Chinese">Chinese</option>
                <option value="French">French</option>
                <option value="Greek">Greek</option>
                <option value="Burgers">Burgers</option>
                <option value="Indian">Indian</option>
                <option value="Italian">Italian</option>
                <option value="Pizza">Pizza</option>
                <option value="Japanese">Japanese</option>
                <option value="Mexican">Mexican</option>
                <option value="Moroccan">Moroccan</option>
                <option value="Spanish">Spanish</option>
                <option value="Thaï">Thaï</option>
                <option value="Lebansese">Lebansese</option>
                <option value="Turkish">Turkish</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Healthy">Healthy</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Gourmet">Gourmet</option>
                <option value="German">German</option>
            </select>
          </label>

          <label>
            Type of diet:
            <select onChange={this.handleMultipleSelectChangeDiet}
                    name="diet" value={this.state.diet} multiple>
              <option value="Vegan">Vegan</option>
              <option value="Veggie">Veggie</option>
              <option value="Gluten Free">Gluten Free</option>
              <option value="Dairy-free">Dairy-free</option>
              <option value="Paleo">Paleo</option>
            </select>
          </label>

          <label>
            Price range:
            <select onChange={event => this.genericSync(event)}
                    name="price_level" value={this.state.price_level}>
              <option value="€">€</option>
              <option value="€€">€€</option>
              <option value="€€€">€€€</option>
              <option value="€€€€">€€€€</option>
            </select>
          </label>


          <button>Look for a place!</button>
          
        </form>
      </section>
    );
  }
}

export default Search;
