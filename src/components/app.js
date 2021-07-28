import React, {useState} from 'react';
import {connect} from 'react-redux';
import Table from './table';
import SearchForm from './search-form';
import Modal from './modal';
import AddGoodModal from './add-good-modal';
import {deleteGood} from '../store/actions';
import PropTypes from 'prop-types';

const App = ({deletedGoodId, deleteGood}) => {
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isAddModalShown, setIsAddModalShown] = useState(false);

  return (
    <>
      <div className="page">
        <div className="container">
          <section>
            <div className="page__table-actions table-actions">
              <SearchForm />
              <button
                className="table-actions__add-btn btn"
                type="button"
                onClick={() => setIsAddModalShown(true)}
              >
                Add New
              </button>
            </div>

            <Table showModal={setIsDeleteModalShown} />
          </section>
        </div>
      </div>

      {
        isDeleteModalShown &&
        <Modal>
          <>
            <h2>Are you sure?</h2>
            <p>Are you sure you want to perform this action?</p>
            <p className="modal__actions-wrapper">
              <button className="btn modal__btn" type="button" onClick={() => {
                setIsDeleteModalShown(false);
                deleteGood(deletedGoodId);
              }}>Yes</button>
              <button className="btn modal__btn" type="button" onClick={() => {
                setIsDeleteModalShown(false);
              }}>No</button>
            </p>
          </>
        </Modal>
      }

      {
        isAddModalShown &&
        <Modal>
          <AddGoodModal showModal={setIsAddModalShown} />
        </Modal>
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  deletedGoodId: state.deletedGoodId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteGood(id) {
    dispatch(deleteGood(id));
  },
});

App.propTypes = {
  deletedGoodId: PropTypes.string,
  deleteGood: PropTypes.func,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
