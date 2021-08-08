import React from 'react';
import {connect} from 'react-redux';
import TableRow from './table-row';
import {
  changeSortType,
  changeNameSortDirection,
  changePriceSortDirection,
} from '../store/actions';
import {getSortedGoods} from '../utils';
import PropTypes from 'prop-types';

const Table = ({
  goods,
  sortType,
  sortTypeDirection,
  nameSortDirection,
  priceSortDirection,
  showEditModal,
  showDeleteModal,
  changeSortType,
  changeNameSortDirection,
  changePriceSortDirection,
}) => {
  const sortedGoods = getSortedGoods(
    goods,
    sortType,
    sortTypeDirection,
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => {
            if (sortType !== 'name') {
              changeSortType('name');
            }
            changeNameSortDirection();
          }}>Name {nameSortDirection ? '▲' : '▼'}</th>
          <th onClick={() => {
            if (sortType !== 'price') {
              changeSortType('price');
            }
            changePriceSortDirection();
          }}>Price {priceSortDirection ? '▲' : '▼'}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          sortedGoods.map((good) => (
            <TableRow
              good={good}
              key={good.id}
              showEditModal={showEditModal}
              showDeleteModal={showDeleteModal}
            />
          ))
        }
      </tbody>
    </table>
  );
};

Table.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  sortType: PropTypes.string,
  sortTypeDirection: PropTypes.bool,
  nameSortDirection: PropTypes.bool,
  priceSortDirection: PropTypes.bool,
  showEditModal: PropTypes.func,
  showDeleteModal: PropTypes.func,
  changeSortType: PropTypes.func,
  changeNameSortDirection: PropTypes.func,
  changePriceSortDirection: PropTypes.func,
};

const mapStateToProps = (state) => ({
  goods: state.goods,
  sortType: state.sortType,
  sortTypeDirection: state[state.sortType + 'SortDirection'],
  nameSortDirection: state.nameSortDirection,
  priceSortDirection: state.priceSortDirection,
});

const mapDispatchToProps = (dispatch) => ({
  changeSortType(sortType) {
    dispatch((changeSortType(sortType)));
  },
  changeNameSortDirection() {
    dispatch((changeNameSortDirection()));
  },
  changePriceSortDirection() {
    dispatch((changePriceSortDirection()));
  },
});

export {Table};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
