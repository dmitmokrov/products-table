import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteGood} from '../store/actions';

const TableRow = ({good, deleteGood}) => (
  <tr>
    <td className="table__item-cell">
      <a href="#">{good.name}</a>
      <span className="table__item-count">{good.count}</span>
    </td>
    <td>{good.price}</td>
    <td>
      <p className="table__actions-wrapper">
        <button className="btn" type="button">Edit</button>
        <button
          className="btn"
          type="button"
          onClick={() => deleteGood(good.id)}
        >
          Delete
        </button>
      </p>
    </td>
  </tr>
);

TableRow.propTypes = {
  good: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    delivery: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        country: PropTypes.string,
        cities: PropTypes.arrayOf(PropTypes.string),
      }),
    ]),
  }),
  deleteGood: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  deleteGood(id) {
    dispatch(deleteGood(id));
  },
});

export {TableRow};
export default connect(null, mapDispatchToProps)(TableRow);
