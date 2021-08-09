import {goods} from '../../mock';
import {Action} from '../../const';

const initialState = {
  goods,
  searchedGoodName: '',
  deletedGoodId: null,
  editedGoodId: null,
  isReadOnly: false,
  sortType: null,
  nameSortDirection: false,
  priceSortDirection: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case Action.DELETE_GOOD:
    return {
      ...state,
      goods: state.goods.filter((good) => good.id !== action.payload),
    };
  case Action.DELETE_GOOD_ID:
    return {
      ...state,
      deletedGoodId: action.payload,
    };
  case Action.EDIT_GOOD_ID:
    return {
      ...state,
      editedGoodId: action.payload,
    };
  case Action.EDIT_GOOD:
    const idx = state.goods.findIndex((good) => good.id === action.payload.id);
    return {
      ...state,
      goods: [
        ...state.goods.slice(0, idx),
        action.payload,
        ...state.goods.slice(idx + 1),
      ],
    };
  case Action.ADD_GOOD:
    return {
      ...state,
      goods: [...state.goods, action.payload],
    };
  case Action.CHANGE_READONLY_STATUS:
    return {
      ...state,
      isReadOnly: action.payload,
    };
  case Action.CHANGE_SORT_TYPE:
    return {
      ...state,
      sortType: action.payload,
    };
  case Action.CHANGE_NAME_SORT_DIRECTION:
    return {
      ...state,
      nameSortDirection: !state.nameSortDirection,
    };
  case Action.CHANGE_PRICE_SORT_DIRECTION:
    return {
      ...state,
      priceSortDirection: !state.priceSortDirection,
    };
  case Action.CHANGE_SEARCHED_GOOD_NAME:
    return {
      ...state,
      searchedGoodName: action.payload,
    };
  default:
    return state;
  }
};

export {rootReducer};
