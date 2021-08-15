import {Action} from '../const';

export const deleteGood = (id) => ({
  type: Action.DELETE_GOOD,
  payload: id,
});

export const deleteGoodId = (id) => ({
  type: Action.DELETE_GOOD_ID,
  payload: id,
});

export const editGood = (id) => ({
  type: Action.EDIT_GOOD,
  payload: id,
});

export const editGoodId = (id) => ({
  type: Action.EDIT_GOOD_ID,
  payload: id,
});

export const addGood = (good) => ({
  type: Action.ADD_GOOD,
  payload: good,
});

export const addGoodAsync = (good) => {
  return (dispatch) => {
    setTimeout(() => dispatch(addGood(good)), 2000);
  };
};

export const changeReadOnlyStatus = (status) => ({
  type: Action.CHANGE_READONLY_STATUS,
  payload: status,
});

export const changeSortType = (sortType) => ({
  type: Action.CHANGE_SORT_TYPE,
  payload: sortType,
});

export const changeNameSortDirection = () => ({
  type: Action.CHANGE_NAME_SORT_DIRECTION,
});

export const changePriceSortDirection = () => ({
  type: Action.CHANGE_PRICE_SORT_DIRECTION,
});

export const changeSearchedGoodName = (searchedGoodName) => ({
  type: Action.CHANGE_SEARCHED_GOOD_NAME,
  payload: searchedGoodName,
});
