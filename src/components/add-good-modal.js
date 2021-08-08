import React, {PureComponent} from 'react';
import {CountryCities} from '../const';
import {nanoid} from 'nanoid';
import {connect} from 'react-redux';
import {addGood, editGood} from '../store/actions';
import PropTypes from 'prop-types';

class AddGoodModal extends PureComponent {
  constructor(props) {
    super(props);
    const {
      id,
      name,
      email,
      count,
      price,
      delivery,
      country,
      city,
    } = this.props.good;

    this.state = {
      id: id || nanoid(),
      name: name || '',
      nameError: '',
      email: email || '',
      emailError: '',
      count: count || 0,
      price: price || 0,
      delivery: delivery || 'no',
      country: country || '',
      city: city || [],
      selectAllCities: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSelectAllChange = this.handleSelectAllChange.bind(this);

    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handleCountBlur = this.handleCountBlur.bind(this);
    this.handlePriceFocus = this.handlePriceFocus.bind(this);
    this.handlePriceBlur = this.handlePriceBlur.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value.trim(),
    });

    if (this.state.nameError) {
      this.handleNameBlur(evt);
    }
  }

  handleNameBlur(evt) {
    if (!evt.target.value.trim().length) {
      this.setState({
        nameError: 'Имя не может быть пустым',
      });
      return;
    }

    this.setState({
      nameError: '',
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
      count: parseInt(evt.target.value, 10) || '',
    });
  }

  handleCountBlur(evt) {
    evt.target.value = parseInt(evt.target.value, 10) || 0;
  }

  handlePriceChange(evt) {
    evt.target.value = evt.target.value.replace(/[^\d\.]/g, '');
    this.setState({
      price: parseFloat(evt.target.value) || '',
    });
  }

  handlePriceFocus(evt) {
    evt.target.value = this.state.price;
  }

  handlePriceBlur(evt) {
    evt.target.value = this.formatPrice(evt.target.value);
  }

  formatPrice(number) {
    return '$' + new Intl.NumberFormat({
      style: 'currency', currency: 'USD',
    }).format(number);
  }

  handleDeliveryChange(evt) {
    this.setState({
      delivery: evt.target.value,
    });

    if (evt.target.value === 'no') {
      this.setState({
        country: '',
        city: [],
        selectAllCities: false,
      });
    }
  }

  handleCountryChange(evt) {
    this.setState({
      country: evt.target.value,
      city: [],
      selectAllCities: false,
    });
  }

  handleCityChange(evt) {
    this.setState((state) => {
      if (state.city.includes(evt.target.value)) {
        return {
          city: state.city.filter((it) => it !== evt.target.value),
        };
      }

      return {
        city: [...state.city, evt.target.value],
      };
    });

    if (this.state.city.length === CountryCities[this.state.country].length) {
      this.setState({
        selectAllCities: false,
      });
    }
  }

  handleSelectAllChange() {
    this.setState((prevState) => {
      if (prevState.selectAllCities) {
        return {
          city: [],
          selectAllCities: !prevState.selectAllCities,
        };
      }

      return {
        city: CountryCities[this.state.country],
        selectAllCities: !prevState.selectAllCities,
      };
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {showModal, addGood, editGood, good} = this.props;
    const {id, name, email, count, price, delivery, country, city} = this.state;
    const editedGood = {
      id,
      name,
      email,
      count,
      price,
      delivery,
      country,
      city,
    };

    good.id ? editGood(editedGood) : addGood(editedGood);
    showModal(false);
  }

  componentDidUpdate() {
    if (
      this.state.country &&
      this.state.city.length === CountryCities[this.state.country].length &&
      !this.state.selectAllCities
    ) {
      this.setState({
        selectAllCities: true,
      });
    }
  }

  render() {
    const {isReadOnly, showModal} = this.props;
    const {
      name,
      nameError,
      email,
      emailError,
      count,
      price,
      delivery,
      country,
      city,
      selectAllCities,
    } = this.state;
    const hasDelivery = delivery === 'yes' ? true : false;
    const nameClassname = nameError ? 'input error' : 'input';
    const emailClassname = emailError ? 'input error' : 'input';
    const isSubmitButtonDisabled = nameError || emailError || !name || !email ||
      !count || !price || delivery === 'yes' && (!country || !city.length);

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
          <form className="add-update-form" onSubmit={this.handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="name">Name:</label>
              <p>
                <input
                  className={nameClassname}
                  id="name"
                  type="text"
                  maxLength="15"
                  value={name}
                  onChange={this.handleNameChange}
                  onBlur={this.handleNameBlur}
                  readOnly={isReadOnly}
                />
                <span>{nameError}</span>
              </p>
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Supplier email:</label>
              <p>
                <input
                  className={emailClassname}
                  id="email"
                  type="email"
                  value={email}
                  onChange={this.handleEmailChange}
                  onBlur={this.handleEmailBlur}
                  readOnly={isReadOnly}
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
                value={count}
                onChange={this.handleCountChange}
                onBlur={this.handleCountBlur}
                readOnly={isReadOnly}
              />
            </p>
            <p className="input-wrapper">
              <label htmlFor="price">Price:</label>
              <input
                className={'input'}
                id="price"
                type="text"
                value={price}
                onChange={this.handlePriceChange}
                onFocus={this.handlePriceFocus}
                onBlur={this.handlePriceBlur}
                readOnly={isReadOnly}
              />
            </p>
            <fieldset className="add-update-form__fieldset">
              <legend>Delivery:</legend>
              <div className="location">
                <select
                  className="location__item select"
                  value={delivery}
                  onChange={this.handleDeliveryChange}
                  disabled={isReadOnly}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {
                  hasDelivery &&
                  <p className="location__item radio-checkbox-wrapper">
                    {
                      Object.keys(CountryCities).map((country) => (
                        <label key={country}>
                          <input
                            name="country"
                            value={country}
                            type="radio"
                            onChange={this.handleCountryChange}
                            checked={this.state.country === country}
                            disabled={isReadOnly}
                          />
                          {country}
                        </label>
                      ))
                    }
                  </p>
                }
                {
                  hasDelivery && country &&
                  <p className="location__item radio-checkbox-wrapper">
                    <label>
                      <input
                        name="select-all"
                        value="all"
                        type="checkbox"
                        onChange={this.handleSelectAllChange}
                        checked={selectAllCities}
                        disabled={isReadOnly}
                      />
                      Select All
                    </label>
                    {
                      CountryCities[country].map((city) => (
                        <label key={city}>
                          <input
                            name={city}
                            value={city}
                            type="checkbox"
                            onChange={this.handleCityChange}
                            checked={this.state.city.includes(city)}
                            disabled={isReadOnly}
                          />
                          {city}
                        </label>
                      ))
                    }
                  </p>
                }
              </div>
            </fieldset>
            {
              !isReadOnly &&
              <button
                className="btn"
                type="submit"
                disabled={isSubmitButtonDisabled}
              >
                Add / Update
              </button>
            }
          </form>
        </section>
      </>
    );
  }
}

AddGoodModal.propTypes = {
  showModal: PropTypes.func,
  addGood: PropTypes.func,
  editGood: PropTypes.func,
  good: PropTypes.object,
  isReadOnly: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  addGood(good) {
    dispatch(addGood(good));
  },
  editGood(good) {
    dispatch(editGood(good));
  },
});

export {AddGoodModal};
export default connect(null, mapDispatchToProps)(AddGoodModal);
