import React, { Component } from "react";
import CardDataService from "../services/card.service";
import { Link } from "react-router-dom";

export default class CardsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
    this.retrieveCards = this.retrieveCards.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCard = this.setActiveCard.bind(this);
    this.removeAllCards = this.removeAllCards.bind(this);
    this.searchOwnerName = this.searchOwnerName.bind(this);

    this.state = {
      cards: [],
      currentCard: null,
      currentIndex: -1,
      searchOwnerName: ""
    };
  }

  componentDidMount() {
    this.retrieveCards();
  }

  onChangeOwnerName(e) {
    const searchOwnerName = e.target.value;

    this.setState({
      searchOwnerName: searchOwnerName
    });
  }

  retrieveCards() {
    CardDataService.getAll()
      .then(response => {
        this.setState({
          cards: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCards();
    this.setState({
      currentCard: null,
      currentIndex: -1
    });
  }

  setActiveCard(card, index) {
    this.setState({
      currentCard: card,
      currentIndex: index
    });
  }

  removeAllCards() {
    CardDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchOwnerName() {
    this.setState({
      currentCard: null,
      currentIndex: -1
    });

    CardDataService.findByOwnerName(this.state.searchOwnerName)
      .then(response => {
        this.setState({
          cards: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchOwnerName, cards, currentCard, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by owner name"
              value={searchOwnerName}
              onChange={this.onChangeOwnerName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchOwnerName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Cards List</h4>

          <ul className="list-group">
            {cards &&
              cards.map((card, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCard(card, index)}
                  key={index}
                >
                  {card.owner_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCards}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCard ? (
            <div>
              <h4>Card</h4>
              <div>
                <label>
                  <strong>Owner Name:</strong>
                </label>{" "}
                {currentCard.owner_name}
              </div>
              <div>
                <label>
                  <strong>Card Number:</strong>
                </label>{" "}
                {currentCard.card_number}
              </div>
              <div>
                <label>
                  <strong>CVV:</strong>
                </label>{" "}
                {currentCard.cvv}
              </div>
              <div>
                <label>
                  <strong>Expiration Date:</strong>
                </label>{" "}
                {currentCard.expiration_date}
              </div>

              <Link
                to={"/cards/" + currentCard.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Card...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
