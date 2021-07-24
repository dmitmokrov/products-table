import React from 'react';

const App = () => (
  <>
    <div className="page">
      <div className="container">
        <section>
          <div className="page__table-actions table-actions">
            <form>
              <label className="visually-hidden" htmlFor="search"></label>
              <input
                className="search-input"
                id="search"
                type="text"
                placeholder="Фильтр по подстроке в имени товара"
              />
              <button className="btn" type="submit">Искать</button>
            </form>
            <button
              className="table-actions__add-btn btn"
              type="button"
            >
              Add New
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table__item-cell">
                  <a href="#">Товар 1</a>
                  <span className="table__item-count">5</span>
                </td>
                <td>12385</td>
                <td>
                  <p className="table__actions-wrapper">
                    <button className="btn" type="button">Edit</button>
                    <button className="btn" type="button">Delete</button>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>

    {/* <div className="modal">
      <div className="modal__substrate"></div>
      <div className="modal__content">
        <h2>Are you sure?</h2>
        <p>Are you sure you want to perform this action?</p>
        <p className="modal__actions-wrapper">
          <button className="btn modal__btn" type="button">Yes</button>
          <button className="btn modal__btn" type="button">No</button>
        </p>
      </div>
    </div> */}

    {/* <div className="modal">
      <div className="modal__substrate"></div>
      <div className="modal__content">
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
      </div>
    </div> */}
  </>
);

export default App;
