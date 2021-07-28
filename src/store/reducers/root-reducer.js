import {goods} from '../../mock';

const initialState = {
  goods,
  deletedGoodId: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'deleteGood':
    return {
      ...state,
      goods: state.goods.filter((good) => good.id !== action.payload),
    };
  case 'deleteGoodId':
    return {
      ...state,
      deletedGoodId: action.payload,
    };
  default:
    return state;
  }
};

export {rootReducer};
