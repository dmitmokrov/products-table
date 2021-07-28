import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AddGoodModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      emailError: '',
      count: 0,
      price: 0,
      delivery: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);

    this.handleEmailBlur = this.handleEmailBlur.bind(this);
  }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value.trim(),
    });
  }

  handleEmailChange(evt) {
    this.setState({
      email: evt.target.value,
    });

    if (this.state.emailError) {
      this.handleEmailBlur(evt);
    }
  }

  handleEmailBlur(evt) {
    if (evt.target.value.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === -1) {
      this.setState({
        emailError: 'Недопустимый email',
      });
      return;
    };

    this.setState({
      emailError: '',
    });
  }

  handleCountChange(evt) {
    this.setState({
      count: parseInt(evt.target.value, 10),
    });
  }

  handlePriceChange(evt) {
    this.setState({
      price: parseInt(evt.target.value, 10),
    });
  }

  render() {
    const {showModal} = this.props;
    const {emailError} = this.state;
    const emailClassname = emailError ? 'input error' : 'input';

    return (
      <>
        <button
          className="modal__close-btn"
          type="button"
          onClick={() => showModal(false)}
        >
          <span className="visually-hidden">Close</span>
          ×
        </button>
        <section>
          <form className="add-update-form">
            <div className="input-wrapper">
              <label htmlFor="name">Name:</label>
              <p>
                <input
                  className="input"
                  id="name"
                  type="text"
                  maxLength="15"
                  onChange={this.handleNameChange}
                />
                <span></span>
              </p>
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Supplier email:</label>
              <p>
                <input
                  className={emailClassname}
                  id="email"
                  type="email"
                  onChange={this.handleEmailChange}
                  onBlur={this.handleEmailBlur}
                />
                <span>{emailError}</span>
              </p>
            </div>
            <p className="input-wrapper">
              <label htmlFor="count">Count:</label>
              <input
                className="input"
                id="count"
                type="number"
                onChange={this.handleCountChange}
              />
            </p>
            <p className="input-wrapper">
              <label htmlFor="price">Price:</label>
              <input
                className={'input'}
                id="price"
                type="number"
                onChange={this.handlePriceChange}
              />
            </p>
            <fieldset className="add-update-form__fieldset">
              <legend>Delivery:</legend>
              <div className="location">
                <select className="location__item select">
                  <option></option>
                  <option>Страна</option>
                  <option>Город</option>
                </select>
                <p className="location__item radio-checkbox-wrapper">
                  <label>
                    <input name="country" value="Россия" type="radio" />
                    Россия
                  </label>
                  <label>
                    <input name="country" value="США" type="radio" />
                    США
                  </label>
                  <label>
                    <input name="country" value="Япония" type="radio" />
                    Япония
                  </label>
                </p>
                <p className="location__item radio-checkbox-wrapper">
                  <label>
                    <input name="all" value="all" type="checkbox" />
                    Select All
                  </label>
                  <label>
                    <input name="Саратов" value="Саратов" type="checkbox" />
                    Саратов
                  </label>
                  <label>
                    <input name="Москва" value="Москва" type="checkbox" />
                    Москва
                  </label>
                  <label>
                    <input name="Питер" value="Питер" type="checkbox" />
                    Питер
                  </label>
                </p>
              </div>
            </fieldset>
            <button className="btn" type="submit">Add / Update</button>
          </form>
        </section>
      </>
    );
  }
}

AddGoodModal.propTypes = {
  showModal: PropTypes.func,
};

export default AddGoodModal;
