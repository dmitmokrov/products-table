import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteGood} from '../store/actions';

const DeleteGoodModal = ({showModal, deleteGood, deletedGoodId}) => (
  <>
    <h2>Are you sure?</h2>
    <p>Are you sure you want to perform this action?</p>
    <p className="modal__actions-wrapper">
      <button
        className="btn modal__btn"
        type="button"
        onClick={() => {
          showModal(false);
          deleteGood(deletedGoodId);
        }}
      >
        Yes
      </button>
      <button
        className="btn modal__btn"
        type="button"
        onClick={() => {
          showModal(false);
        }}
      >
        No
      </button>
    </p>
  </>
);

DeleteGoodModal.propTypes = {
  showModal: PropTypes.func,
  deleteGood: PropTypes.func,
  deletedGoodId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  deletedGoodId: state.deletedGoodId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteGood(id) {
    dispatch(deleteGood(id));
  },
});

export {DeleteGoodModal};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteGoodModal);
