import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import axios from "axios";

class AddCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      subOffice: "",
      fullAddress: {},
      address: "",
      longitude: 0,
      latitude: 0
    };
  }

  handleSubmitEvent(event) {
    event.preventDefault();
    console.log("SUBMIT THIS STATE (add company form)", this.state);
    axios
      .post("http://localhost:5000/api/add-company", this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("Add company form ", response.data);
        //const { companyDoc } = response.data;
        //this.props.onUserChange(companyDoc);
      })
      .catch(err => {
        console.log("Add company form ERROR", err);
        alert("Something went wrong");
      });
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log("geocode by address result", results);
        const address = results[0].formatted_address;
        this.setState({ address, fullAddress: results[0] });
      })
      .then(() => getLatLng(this.state.fullAddress))
      .then(latLng => {
        const latitude = latLng.lat;
        const longitude = latLng.lng;
        this.setState({ longitude, latitude });
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    // const searchOptions = {
    //   location: new google.maps.LatLng(48.856614, 2.3522219000000177),
    // }

    const { companyName, subOffice } = this.state;

    return (
      <form
        className="AddYourCompany"
        onSubmit={event => this.handleSubmitEvent(event)}
      >
        <input
          name="name"
          value={companyName}
          onChange={event => this.setState({ companyName: event.target.value })}
          placeholder="Company Name"
        />
        <input
          name="subOffice"
          value={subOffice}
          onChange={event => this.setState({ subOffice: event.target.value })}
          placeholder="Company SUbOffice"
        />

        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          // searchOptions={searchOptions}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <button>Submit</button>
      </form>
    );
  }
}

export default AddCompany;
