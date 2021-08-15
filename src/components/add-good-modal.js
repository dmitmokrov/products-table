import React, {PureComponent} from 'react';
import {CountryCities, ValidationError, RegExp, DeliveryStatus,
  FormFields} from '../const';
import {formatPrice} from '../utils';
import {nanoid} from 'nanoid';
import {connect} from 'react-redux';
import {addGoodAsync, editGood} from '../store/actions';
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
      count: count || '',
      countError: '',
      price: price || '',
      priceError: '',
      delivery: delivery || DeliveryStatus.NO,
      deliveryError: '',
      country: country || '',
      city: city || [],
      selectAllCities: false,
    };

    this.nameInputRef = React.createRef();
    this.emailInputRef = React.createRef();
    this.countInputRef = React.createRef();
    this.priceInputRef = React.createRef();

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

  handleNameChange(event) {
    this.setState({
      name: event.target.value.trim(),
    });

    if (this.state.nameError) {
      this.handleNameBlur(event);
    }
  }

  handleNameBlur(event) {
    if (!event.target.value.trim().length) {
      this.setState({
        nameError: ValidationError.NAME,
      });
      return;
    }

    this.setState({
      nameError: '',
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });

    if (this.state.emailError) {
      this.handleEmailBlur(event);
    }
  }

  handleEmailBlur(event) {
    if (event.target.value.search(RegExp.EMAIL) === -1) {
      this.setState({
        emailError: ValidationError.EMAIL,
      });
      return;
    };

    this.setState({
      emailError: '',
    });
  }

  handleCountChange(event) {
    event.target.value = event.target.value.replace(RegExp.NUMBER, '');
    this.setState({
      count: event.target.value,
    });

    if (this.state.countError) {
      this.handleCountBlur(event);
    }
  }

  handleCountBlur(event) {
    if (!event.target.value) {
      this.setState({
        countError: ValidationError.COUNT,
      });
      return;
    }

    this.setState({
      countError: '',
    });
  }

  handlePriceChange(event) {
    event.target.value = event.target.value.replace(RegExp.NUMBER, '');
    this.setState({
      price: +event.target.value || '',
    });

    if (this.state.priceError) {
      this.handlePriceBlur(event);
    }
  }

  handlePriceFocus(event) {
    event.target.value = this.state.price;
  }

  handlePriceBlur(event) {
    if (event.target.value) {
      event.target.value = formatPrice(+event.target.value);
      this.setState({
        priceError: '',
      });
    } else {
      this.setState({
        priceError: ValidationError.PRICE,
      });
    }
  }

  handleDeliveryChange(event) {
    this.setState({
      delivery: event.target.value,
    });

    if (event.target.value === DeliveryStatus.NO) {
      this.setState({
        country: '',
        city: [],
        selectAllCities: false,
        deliveryError: '',
      });
    }
  }

  handleCountryChange(event) {
    this.setState({
      country: event.target.value,
      city: [],
      selectAllCities: false,
    });
  }

  handleCityChange(event) {
    this.setState((state) => {
      if (state.city.includes(event.target.value) && state.city.length === 1) {
        return {
          city: state.city.filter((it) => it !== event.target.value),
          deliveryError: ValidationError.DELIVERY,
        };
      }

      if (state.city.includes(event.target.value)) {
        return {
          city: state.city.filter((it) => it !== event.target.value),
          deliveryError: '',
        };
      }

      return {
        city: [...state.city, event.target.value],
        deliveryError: '',
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
          deliveryError: ValidationError.DELIVERY,
        };
      }

      return {
        city: CountryCities[this.state.country],
        selectAllCities: !prevState.selectAllCities,
        deliveryError: '',
      };
    });
  }

  isDeliveryFieldInvalid() {
    return this.state.delivery === DeliveryStatus.YES &&
    (!this.state.country || !this.state.city.length);
  }

  isFormInvalid() {
    return FormFields.some((field) => !this.state[field]) ||
    this.isDeliveryFieldInvalid();
  }

  setFormErrors() {
    FormFields.forEach((field) => {
      if (!this.state[field]) {
        this.setState({
          [field + 'Error']: ValidationError[field.toUpperCase()],
        });
      }
    });

    if (this.isDeliveryFieldInvalid()) {
      this.setState({
        deliveryError: ValidationError.DELIVERY,
      });
    }
  }

  setFocusOnErrorField() {
    const focusInputIndex = FormFields.findIndex((field) => !this.state[field]);
    if (focusInputIndex !== -1) {
      this[FormFields[focusInputIndex] + 'InputRef'].current.focus();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isFormInvalid()) {
      this.setFormErrors();
      this.setFocusOnErrorField();
      return;
    }

    const {showModal, addGoodAsync, editGood, good} = this.props;
    const {id, name, email, count, price, delivery, country, city} = this.state;
    const editedGood = {
      id,
      name,
      email,
      count: +count,
      price,
      delivery,
      country,
      city,
    };

    good.id ? editGood(editedGood) : addGoodAsync(editedGood);
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
      countError,
      price,
      priceError,
      delivery,
      deliveryError,
      country,
      selectAllCities,
    } = this.state;
    const hasDelivery = delivery === DeliveryStatus.YES ? true : false;
    const nameClassname = nameError ? 'input error' : 'input';
    const emailClassname = emailError ? 'input error' : 'input';
    const countClassname = countError ? 'input error' : 'input';
    const priceClassname = priceError ? 'input error' : 'input';

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
                  maxLength="20"
                  value={name}
                  onChange={this.handleNameChange}
                  onBlur={this.handleNameBlur}
                  readOnly={isReadOnly}
                  ref={this.nameInputRef}
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
                  maxLength="20"
                  value={email}
                  onChange={this.handleEmailChange}
                  onBlur={this.handleEmailBlur}
                  readOnly={isReadOnly}
                  ref={this.emailInputRef}
                />
                <span>{emailError}</span>
              </p>
            </div>
            <div className="input-wrapper">
              <label htmlFor="count">Count:</label>
              <p>
                <input
                  className={countClassname}
                  id="count"
                  type="text"
                  maxLength="16"
                  value={count}
                  onChange={this.handleCountChange}
                  onBlur={this.handleCountBlur}
                  readOnly={isReadOnly}
                  ref={this.countInputRef}
                />
                <span>{countError}</span>
              </p>
            </div>
            <div className="input-wrapper">
              <label htmlFor="price">Price:</label>
              <p>
                <input
                  className={priceClassname}
                  id="price"
                  type="text"
                  maxLength="16"
                  value={price}
                  onChange={this.handlePriceChange}
                  onFocus={this.handlePriceFocus}
                  onBlur={this.handlePriceBlur}
                  readOnly={isReadOnly}
                  ref={this.priceInputRef}
                />
                <span>{priceError}</span>
              </p>
            </div>
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
              <p className="location__error">{deliveryError}</p>
            </fieldset>
            {
              !isReadOnly &&
              <p>
                <button
                  className="btn"
                  type="submit"
                >
                  Add / Update
                </button>
              </p>
            }
          </form>
        </section>
      </>
    );
  }
}

AddGoodModal.propTypes = {
  showModal: PropTypes.func,
  addGoodAsync: PropTypes.func,
  editGood: PropTypes.func,
  good: PropTypes.object,
  isReadOnly: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  addGoodAsync(good) {
    dispatch(addGoodAsync(good));
  },
  editGood(good) {
    dispatch(editGood(good));
  },
});

export {AddGoodModal};
export default connect(null, mapDispatchToProps)(AddGoodModal);
