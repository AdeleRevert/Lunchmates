import React, { Component } from "react";

class PriceLevelRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedOption: "€",
     };
  }

  handleOptionChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  render() { 
    return ( 
      <div className="containerPriceLevelRadioButton">
          <div className="row">
            <p>How long did you wait?</p>
            <div className="col-sm-12">
              <form>
                <div className="radio">
                  <label>
                    <input type="radio" value="€" checked={this.state.selectedOption === "€"} onChange={this.handleOptionChange} />
                    Quick and easy
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="€€" checked={this.state.selectedOption === "€€"} onChange={this.handleOptionChange} />
                    Time to chat
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="€€€" checked={this.state.selectedOption === "€€€"} onChange={this.handleOptionChange} />
                    Be patient
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
     );
  }
}
 
export default PriceLevelRadioButton;