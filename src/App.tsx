import React, { Component } from "react";
import { BrowserRouter as Router, } from "react-router-dom";
import Root from "./root";
import { AppProvider } from "./components/AppProvider";

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Root />
        </Router>
      </AppProvider>
    )
  }
}

export default App;
