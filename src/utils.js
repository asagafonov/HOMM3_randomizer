const generateRandomNumberInRange = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const generateRandomTowns = (towns, numberOfTowns) => {
  if (towns.length < 2) {
    return;
  }
  const result = [];
  while (result.length < numberOfTowns) {
    const index = generateRandomNumberInRange(0, towns.length - 1);
    if (!result.includes(index)) {
      result.push(index);
    }
  }
  return result.map((ind) => towns[ind]).join(' vs. ');
};

const generateRandomTown = (towns) => {
  if (towns.length === 0) {
    return;
  }
  const randomIndex = generateRandomNumberInRange(0, towns.length - 1);
  return towns[randomIndex];
};

export {
  generateRandomTown,
  generateRandomTowns,
};
