import {goods} from '../../mock';

const initialState = {
  goods,
  deletedGoodId: null,
  editedGoodId: null,
  isReadOnly: false,
  sortType: null,
  nameSortDirection: false,
  priceSortDirection: false,
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
  case 'changeSortType':
    return {
      ...state,
      sortType: action.payload,
    };
  case 'changeNameSortDirection':
    return {
      ...state,
      nameSortDirection: !state.nameSortDirection,
    };
  case 'changePriceSortDirection':
    return {
      ...state,
      priceSortDirection: !state.priceSortDirection,
    };
  default:
    return state;
  }
};

export {rootReducer};
