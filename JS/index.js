const towns = [
  'Castle',
  'Rampart',
  'Tower',
  'Inferno',
  'Necropolis',
  'Dungeon',
  'Citadel',
  'Fortress',
  'Conflux',
  'Cove'
];

const bannedTowns = ['Conflux', 'Cove'];
const numberOfOpponents = 2;

const generateRandomNumberInRange = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const chooseTowns = (towns, number, banned = []) => {
  const availableTowns = towns.filter((town) => !banned.includes(town));
  const length = availableTowns.length - 1;
  const result = [];
  while(result.length < number) {
    const index = generateRandomNumberInRange(0, length);
    if (!result.includes(index)) {
      result.push(index);
    }
  }
  return result.map((ind) => availableTowns[ind]).join(' vs. ');
};

const chooseTown = (towns, banned = []) => {
  const availableTowns = towns.filter((town) => !banned.includes(town));
  const length = availableTowns.length - 1;
  const index = generateRandomNumberInRange(0, length);
  return availableTowns[index];
};
