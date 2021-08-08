import {goods} from '../../mock';

const initialState = {
  goods,
  deletedGoodId: null,
  editedGoodId: null,
  isReadOnly: false,
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
  case 'editGoodId':
    return {
      ...state,
      editedGoodId: action.payload,
    };
  case 'editGood':
    const idx = state.goods.findIndex((good) => good.id === action.payload.id);
    return {
      ...state,
      goods: [
        ...state.goods.slice(0, idx),
        action.payload,
        ...state.goods.slice(idx + 1),
      ],
    };
  case 'addGood':
    return {
      ...state,
      goods: [...state.goods, action.payload],
    };
  case 'changeReadOnlyStatus':
    return {
      ...state,
      isReadOnly: action.payload,
    };
  default:
    return state;
  }
};

export {rootReducer};
