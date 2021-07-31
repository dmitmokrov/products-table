import React, {useState} from 'react';
import {connect} from 'react-redux';
import Table from './table';
import SearchForm from './search-form';
import Modal from './modal';
import AddGoodModal from './add-good-modal';
import {editGoodId, deleteGood} from '../store/actions';
import PropTypes from 'prop-types';

const App = ({editedGood, editGoodId, deletedGoodId, deleteGood}) => {
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isAddOrEditModalShown, setIsAddOrEditModalShown] = useState(false);

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
                onClick={() => {
                  setIsAddOrEditModalShown(true);
                  editGoodId(null);
                }}
              >
                Add New
              </button>
            </div>

            <Table
              showEditModal={setIsAddOrEditModalShown}
              showDeleteModal={setIsDeleteModalShown}
            />
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
        isAddOrEditModalShown &&
        <Modal>
          <AddGoodModal
            good={editedGood}
            showModal={setIsAddOrEditModalShown}
          />
        </Modal>
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  editedGood: state.goods.find((good) => good.id === state.editedGoodId) || {},
  deletedGoodId: state.deletedGoodId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteGood(id) {
    dispatch(deleteGood(id));
  },
  editGoodId(id) {
    dispatch(editGoodId(id));
  },
});

App.propTypes = {
  editedGood: PropTypes.object,
  deletedGoodId: PropTypes.string,
  editGoodId: PropTypes.func,
  deleteGood: PropTypes.func,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
