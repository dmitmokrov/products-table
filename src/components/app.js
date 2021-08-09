import React, {useState} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Table from './table';
import SearchForm from './search-form';
import Modal from './modal';
import AddGoodModal from './add-good-modal';
import DeleteGoodModal from './delete-good-modal';
import {editGoodId, changeReadOnlyStatus} from '../store/actions';
import PropTypes from 'prop-types';

const App = ({
  editedGood,
  editGoodId,
  isReadOnly,
}) => {
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isAddOrEditModalShown, setIsAddOrEditModalShown] = useState(false);

  return (
    <Router>
      <div className="page">
        <div className="container">
          <section>
            <div className="page__table-actions table-actions">
              <SearchForm />
              <button
                className="table-actions__add-btn btn"
                type="button"
                onClick={() => {
                  changeReadOnlyStatus(false);
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
          <DeleteGoodModal
            showModal={setIsDeleteModalShown}
          />
        </Modal>
      }

      {
        isAddOrEditModalShown &&
        <Modal>
          <AddGoodModal
            good={editedGood}
            isReadOnly={isReadOnly}
            showModal={setIsAddOrEditModalShown}
          />
        </Modal>
      }
    </Router>
  );
};

const mapStateToProps = (state) => ({
  editedGood: state.goods.find((good) => good.id === state.editedGoodId) || { },
  deletedGoodId: state.deletedGoodId,
  isReadOnly: state.isReadOnly,
});

const mapDispatchToProps = (dispatch) => ({
  editGoodId(id) {
    dispatch(editGoodId(id));
  },
  changeReadOnlyStatus(status) {
    dispatch(changeReadOnlyStatus(status));
  },
});

App.propTypes = {
  editedGood: PropTypes.object,
  editGoodId: PropTypes.func,
  deleteGood: PropTypes.func,
  changeReadOnlyStatus: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
