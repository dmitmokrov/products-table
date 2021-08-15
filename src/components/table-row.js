import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {editGoodId, deleteGoodId, changeReadOnlyStatus} from '../store/actions';

const TableRow = ({good, showEditModal, showDeleteModal,
  editGoodId, deleteGoodId, changeReadOnlyStatus}) => (
  <tr>
    <td className="table__item-cell">
      <a href="#" onClick={(event) => {
        event.preventDefault();
        changeReadOnlyStatus(true);
        showEditModal(true);
        editGoodId(good.id);
      }}>{good.name}</a>
      <span className="table__item-count">{good.count}</span>
    </td>
    <td>{good.price}</td>
    <td>
      <p className="table__actions-wrapper">
        <button
          className="btn"
          type="button"
          onClick={() => {
            changeReadOnlyStatus(false);
            showEditModal(true);
            editGoodId(good.id);
          }}
        >
          Edit
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            showDeleteModal(true);
            deleteGoodId(good.id);
          }}
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
  showEditModal: PropTypes.func,
  showDeleteModal: PropTypes.func,
  deleteGoodId: PropTypes.func,
  editGoodId: PropTypes.func,
  changeReadOnlyStatus: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  deleteGoodId(id) {
    dispatch(deleteGoodId(id));
  },
  editGoodId(id) {
    dispatch(editGoodId(id));
  },
  changeReadOnlyStatus(status) {
    dispatch(changeReadOnlyStatus(status));
  },
});

export {TableRow};
export default connect(null, mapDispatchToProps)(TableRow);
