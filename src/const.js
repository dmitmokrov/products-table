export const CountryCities = {
  'Россия': ['Саратов', 'Москва', 'Санкт-Петербург'],
  'США': ['Вашингтон', 'Лас-Вегас', 'Нью-Йорк'],
  'Япония': ['Токио', 'Осака', 'Нагасаки'],
};

export const SortType = {
  NAME: 'NAME',
  PRICE: 'PRICE',
};

export const Action = {
  DELETE_GOOD: 'DELETE_GOOD',
  DELETE_GOOD_ID: 'DELETE_GOOD_ID',
  EDIT_GOOD: 'EDIT_GOOD',
  EDIT_GOOD_ID: 'EDIT_GOOD_ID',
  ADD_GOOD: 'ADD_GOOD',
  CHANGE_READONLY_STATUS: 'CHANGE_READONLY_STATUS',
  CHANGE_SORT_TYPE: 'CHANGE_SORT_TYPE',
  CHANGE_NAME_SORT_DIRECTION: 'CHANGE_NAME_SORT_DIRECTION',
  CHANGE_PRICE_SORT_DIRECTION: 'CHANGE_PRICE_SORT_DIRECTION',
  CHANGE_SEARCHED_GOOD_NAME: 'CHANGE_SEARCHED_GOOD_NAME',
};

export const ValidationError = {
  NAME: 'Имя не может быть пустым',
  EMAIL: 'Недопустимый email',
  COUNT: 'Поле не может быть пустым',
  PRICE: 'Поле не может быть пустым',
  DELIVERY: 'Выберите страну и город',
};

export const RegExp = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  NUMBER: /[^\d\.]/g,
};

export const DeliveryStatus = {
  YES: 'yes',
  NO: 'no',
};

export const FormFields = ['name', 'email', 'count', 'price'];
