import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./SignLogPage.css";
import AddCompany from "./AddCompany.js";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      companyId: "",
      originalPassword: "",
      messenger: false,
      currentUser: null,
      companiesArray: [],
      validationError: "", // prevent the user from selecting the blank company in the dropdown
      isAddingCompany: false,
      companyDoc: "",
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  checkboxSync(event) {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  }

  handleSubmitEvent(event) {
    event.preventDefault();
    //console.log("SUBMIT THIS STATE", this.state)
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/signup", this.state, {
        withCredentials: true
      })
      .then(response => {
        //console.log("Signup Page", response.data);
        const { userDoc } = response.data;
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("Signup Page ERROR", err);
        alert("Something went wrong");
      });
  }

  // Retrieve the companies array from the back
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/api/companies", {
        withCredentials: true
      })
      .then(response => {
        const companiesArray = response.data;
        this.setState({
          companiesArray,
          companyId: companiesArray[0]._id,
        });
      })

      .catch(err => {
        console.log("COMPANIES ARRAY ERROR", err);
        alert("Something went wrong");
      });
  }

  onUserChange(companyDoc){
    const { companiesArray } = this.state;
    const companiesArrayCopy = [...companiesArray];
    companiesArrayCopy.push(companyDoc);
    this.setState({ companiesArray: companiesArrayCopy });
  }


  render() {
    //console.log(this.state);
    // check currentUser (received from App.js)
    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <section className="Signup">
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleSubmitEvent(event)}>
          <input
            value={this.state.firstName}
            onChange={event => this.genericSync(event)}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            value={this.state.lastName}
            onChange={event => this.genericSync(event)}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <input
            value={this.state.email}
            onChange={event => this.genericSync(event)}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            value={this.state.originalPassword}
            onChange={event => this.genericSync(event)}
            type="password"
            name="originalPassword"
            placeholder="*****"
          />
          {/* Dropdown select displaying the array of existing companies */}
          <label>
            Please, select your company:
            {/* this way? */}
            <select
              value={this.state.companyId}
              onChange={event =>
                this.setState({
                  companyId: event.target.value})
              }
            >
              {this.state.companiesArray.map(oneCompany => (
                <option key={oneCompany._id} value={oneCompany._id}>
                  {oneCompany.name}, {oneCompany.subOffice}
                </option>
              ))}
            </select>
            
          </label>
          {/* input to create your company if not on the previous list */}
          Do you allow other lunchmates to you you to go to lunch?
          <input
            value={this.state.messenger}
            onChange={event => this.checkboxSync(event)}
            type="checkbox"
            name="messenger"
          />
          {/* Allow user to import their avatar picture from their files */}
          {/* Please, chose your avatar:
          <input type="file" /> */}
          <button>Sign Up</button>
          
        </form>

                  <label>
            If your company doesn't appear in the list, please
            <button onClick={() => this.setState({ isAddingCompany: true })}>
              add it
            </button> 
          </label>
          {this.state.isAddingCompany && ( 
          <AddCompany onUserChange={companyDoc => this.onUserChange(companyDoc)} />
          )}

    </section>
  );
}
}          


export default Signup;
