import {goods} from '../../mock';

const initialState = {
  goods,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'delete':
    return {
      goods: state.goods.filter((good) => good.id !== action.payload),
    };
  default:
    return state;
  }
};

export {rootReducer};
