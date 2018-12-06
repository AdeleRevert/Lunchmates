import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <footer>
          <p>Made with Sparkles</p>
        </footer>
      </div>
    );
  }
}

export default App;
