import React from 'react';
import Table from './table';
import SearchForm from './search-form';
// import Modal from './modal';

const App = () => (
  <>
    <div className="page">
      <div className="container">
        <section>
          <div className="page__table-actions table-actions">
            <SearchForm />
            <button
              className="table-actions__add-btn btn"
              type="button"
            >
              Add New
            </button>
          </div>

          <Table />
        </section>
      </div>
    </div>

    {/* <Modal>
      <>
        <h2>Are you sure?</h2>
        <p>Are you sure you want to perform this action?</p>
        <p className="modal__actions-wrapper">
          <button className="btn modal__btn" type="button">Yes</button>
          <button className="btn modal__btn" type="button">No</button>
        </p>
      </>
    </Modal> */}

    {/* <Modal>
      <>
        <button className="modal__close-btn" type="button">
          <span className="visually-hidden">Close</span>
          ×
        </button>
        <section>
          <form className="add-update-form">
            <p className="input-wrapper">
              <label htmlFor="name">Name:</label>
              <input id="name" type="text"></input>
              <span></span>
            </p>
            <p className="input-wrapper">
              <label htmlFor="email">Supplier email:</label>
              <input id="email" type="email"></input>
              <span></span>
            </p>
            <p className="input-wrapper">
              <label htmlFor="count">Count:</label>
              <input id="count" type="number"></input>
            </p>
            <p className="input-wrapper">
              <label htmlFor="price">Price:</label>
              <input id="price" type="text"></input>
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
    </Modal> */}
  </>
);

export default App;
