import React, { Component } from "react";

class TimeFrameRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedOption: "quick and easy",
     };
  }

  handleOptionChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  render() { 
    return ( 
      <div className="containerTimeframeRadioButton">
          <div className="row">
            <p>How long did you wait?</p>
            <div className="col-sm-12">
              <form>
                <div className="radio">
                  <label>
                    <input type="radio" value="quick and easy" checked={this.state.selectedOption === "quick and easy"} onChange={this.handleOptionChange} />
                    Quick and easy
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="time to chat" checked={this.state.selectedOption === "time to chat"} onChange={this.handleOptionChange} />
                    Time to chat
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="be patient" checked={this.state.selectedOption === "be patient"} onChange={this.handleOptionChange} />
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
 
export default TimeFrameRadioButton;