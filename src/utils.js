import _ from 'lodash';

const generateRandomTowns = (towns, numberOfTowns) => {
  if (towns.length < 2) {
    return 'ERROR: not enough towns';
  }
  let result = [];
  while (result.length < numberOfTowns) {
    const index = _.random(towns.length - 1);
    if (!result.includes(index)) {
      result = [...result, index];
    }
  }
  const coupleOfTowns = result.map((ind) => towns[ind]);
  return coupleOfTowns.join(' vs. ');
};

const generateRandomTown = (towns) => {
  if (towns.length === 0) {
    return 'ERROR: not enough towns';
  }
  const randomIndex = _.random(towns.length - 1);
  return towns[randomIndex];
};

const changeTownStatus = (townsList, featuredTown) => {
  if (townsList.includes(featuredTown)) {
    return townsList.filter((town) => town !== featuredTown);
  }
  const updatedList = [...townsList, featuredTown];
  return updatedList;
};

const updHistory = (towns, newTown) => {
  const date = new Date();
  const time = date.toTimeString().slice(0, 8);
  if (towns.length < 10) {
    return [...towns, `[${time}]: ${newTown}`];
  }
  const editedTowns = _.drop(towns);
  return [...editedTowns, `[${time}]: ${newTown}`];
};

export {
  generateRandomTown,
  generateRandomTowns,
  changeTownStatus,
  updHistory,
};
