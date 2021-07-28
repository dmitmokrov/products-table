import {goods} from '../../mock';

const initialState = {
  goods,
  deletedGoodId: null,
  newGood: {},
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
  case 'addGood':
    return {
      ...state,
      newGood: action.payload,
    };
  default:
    return state;
  }
};

export {rootReducer};
