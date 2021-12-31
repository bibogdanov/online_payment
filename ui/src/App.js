import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCard from "./components/add-card.component";
import Card from "./components/card.component";
import CardsList from "./components/cards-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/cards"} className="navbar-brand">
            Online Payment
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cards"} className="nav-link">
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/cards"]} component={CardsList} />
            <Route exact path="/add" component={AddCard} />
            <Route path="/cards/:id" component={Card} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
