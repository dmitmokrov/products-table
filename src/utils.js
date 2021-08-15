import {SortType} from './const';

export const getSortedGoods = (goods, sortType, sortDirection) => {
  return goods.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortType === SortType.NAME) {
      if (nameA < nameB) {
        return sortDirection ? -1 : 1;
      }

      if (nameA > nameB) {
        return sortDirection ? 1 : -1;
      }

      return 0;
    }

    if (sortType === SortType.PRICE) {
      if (sortDirection) {
        return a.price - b.price;
      }

      return b.price - a.price;
    }
  });
};

export const formatPrice = (number) => {
  return '$' + new Intl.NumberFormat({
    style: 'currency', currency: 'USD',
  }).format(number);
};
