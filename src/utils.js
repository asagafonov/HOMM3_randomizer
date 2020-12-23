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

export {
  generateRandomTown,
  generateRandomTowns,
};
