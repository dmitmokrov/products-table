export const deleteGood = (id) => ({
  type: 'deleteGood',
  payload: id,
});

export const deleteGoodId = (id) => ({
  type: 'deleteGoodId',
  payload: id,
});

export const editGood = (id) => ({
  type: 'editGood',
  payload: id,
});

export const editGoodId = (id) => ({
  type: 'editGoodId',
  payload: id,
});

export const addGood = (good) => ({
  type: 'addGood',
  payload: good,
});

export const changeReadOnlyStatus = (status) => ({
  type: 'changeReadOnlyStatus',
  payload: status,
});

export const changeSortType = (sortType) => ({
  type: 'changeSortType',
  payload: sortType,
});

export const changeNameSortDirection = () => ({
  type: 'changeNameSortDirection',
});

export const changePriceSortDirection = () => ({
  type: 'changePriceSortDirection',
});
