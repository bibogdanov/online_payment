import React, { Component } from "react";
import CardDataService from "../services/card.service";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
    this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
    this.onChangeCVV = this.onChangeCVV.bind(this);
    this.onChangeExpirationDate = this.onChangeExpirationDate.bind(this);
    this.getCard = this.getCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.state = {
      currentCard: {
        id: null,
        owner_name: "",
        card_number: "",
        cvv: "",
        expiration_date: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCard(this.props.match.params.id);
  }

  onChangeOwnerName(e) {
    const owner_name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCard: {
          ...prevState.currentCard,
          owner_name: owner_name
        }
      };
    });
  }

  onChangeCardNumber(e) {
    const card_number = e.target.value;

    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        card_number: card_number
      }
    }));
  }

  onChangeCVV(e) {
    const cvv = e.target.value;

    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        cvv: cvv
      }
    }));
  }

  onChangeExpirationDate(e) {
    const expiration_date = e.target.value;

    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        expiration_date: expiration_date
      }
    }));
  }


  getCard(id) {
    CardDataService.get(id)
      .then(response => {
        this.setState({
          currentCard: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCard() {
    CardDataService.update(
      this.state.currentCard.id,
      this.state.currentCard
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The card was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCard() {
    CardDataService.delete(this.state.currentCard.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cards')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCard } = this.state;

    return (
      <div>
        {currentCard ? (
          <div className="edit-form">
            <h4>Card</h4>
            <form>
              <div className="form-group">
                <label htmlFor="owner_name">Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="owner_name"
                  value={currentCard.owner_name}
                  onChange={this.onChangeOwnerName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="card_number">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="card_number"
                  value={currentCard.card_number}
                  onChange={this.onChangeCardNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="number"
                  className="form-control"
                  id="cvv"
                  value={currentCard.cvv}
                  onChange={this.onChangeCVV}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">Expiration Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="expiration_date"
                  value={currentCard.expiration_date.replace(/(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2}\.\d{3}Z)/, "$1")}
                  onChange={this.onChangeExpirationDate}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCard}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCard}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Card...</p>
          </div>
        )}
      </div>
    );
  }
}
