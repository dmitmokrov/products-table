import {SortType} from './const';

export const getSortedGoods = (goods, sortType, sortDirection) => {
  return goods.sort((a, b) => {
    if (sortType === SortType.NAME) {
      if (sortDirection) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }

        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }

        return 0;
      }

      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }

      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
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
