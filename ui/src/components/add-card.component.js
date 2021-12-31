import React, { Component } from "react";
import CardDataService from "../services/card.service";

export default class AddCard extends Component {
  constructor(props) {
    super(props);
    this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
    this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
    this.onChangeCVV = this.onChangeCVV.bind(this);
    this.onChangeExpirationDate = this.onChangeExpirationDate.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.newCard = this.newCard.bind(this);

    this.state = {
      id: null,
      owner_name: "",
      card_number: "",
      cvv: "",
      expiration_date: "",

      submitted: false
    };
  }

  onChangeOwnerName(e) {
    this.setState({
      owner_name: e.target.value
    });
  }

  onChangeCardNumber(e) {
    this.setState({
      card_number: e.target.value
    });
  }

  onChangeCVV(e) {
    this.setState({
      cvv: e.target.value
    });
  }

  onChangeExpirationDate(e) {
    this.setState({
      expiration_date: e.target.value
    });
  }


  saveCard() {
    var data = {
      owner_name: this.state.owner_name,
      card_number: this.state.card_number,
      cvv: this.state.cvv,
      expiration_date: this.state.expiration_date
    };

    CardDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          owner_name: response.data.owner_name,
          card_number: response.data.card_number,
          cvv: response.data.cvv,
          expiration_date: response.data.expiration_date,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCard() {
    this.setState({
      id: null,
      owner_name: "",
      card_number: "",
      cvv: "",
      expiration_date: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCard}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="owner_name">Owner Name</label>
              <input
                type="text"
                className="form-control"
                id="owner_name"
                required
                value={this.state.owner_name}
                onChange={this.onChangeOwnerName}
                name="owner_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_number">Card Number</label>
              <input
                type="text"
                className="form-control"
                id="card_number"
                required
                value={this.state.card_number}
                onChange={this.onChangeCardNumber}
                name="card_number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="number"
                className="form-control"
                id="cvv"
                required
                value={this.state.cvv}
                onChange={this.onChangeCVV}
                name="cvv"
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiration_date">Expiration Date</label>
              <input
                type="date"
                className="form-control"
                id="expiration_date"
                required
                value={this.state.expiration_date}
                onChange={this.onChangeExpirationDate}
                name="expiration_date"
              />
            </div>

            <button onClick={this.saveCard} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
