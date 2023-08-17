import React, { Component } from "react";
import { BrowserRouter as Router, } from "react-router-dom";
import Root from "./root";
import { FavoritesProvider } from "./components/FavoritesProvider";

class App extends Component {
  render() {
    return (
      <FavoritesProvider>
        <Router>
          <Root />
        </Router>
      </FavoritesProvider>
    )
  }
}

export default App;
