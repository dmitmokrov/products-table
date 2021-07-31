import React from 'react';
import {connect} from 'react-redux';
import TableRow from './table-row';
import PropTypes from 'prop-types';

const Table = ({goods, showEditModal, showDeleteModal}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        goods.map((good) => (
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
  showEditModal: PropTypes.func,
  showDeleteModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  goods: state.goods,
});

export {Table};
export default connect(mapStateToProps)(Table);
