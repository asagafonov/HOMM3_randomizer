import i18next from 'i18next';
import _ from 'lodash';
import en from './locales/index.js';
import { initView, fillPage } from './view.js';
import { generateRandomTown, generateRandomTowns } from './utils.js';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en,
  },
});

const allTowns = [
  'Castle',
  'Rampart',
  'Tower',
  'Inferno',
  'Necropolis',
  'Dungeon',
  'Citadel',
  'Fortress',
  'Conflux',
  'Cove',
];

const numberOfAdversaries = 2;

const updHistory = (towns, newTown) => {
  const date = new Date();
  const time = date.toTimeString().slice(0, 8);
  if (towns.length < 10) {
    return [...towns, `[${time}]: ${newTown}`];
  }
  const editedTowns = _.drop(towns);
  return [...editedTowns, `[${time}]: ${newTown}`];
};

const changeTownStatus = (townsList, featuredTown) => {
  if (townsList.includes(featuredTown)) {
    return townsList.filter((town) => town !== featuredTown);
  }
  const updatedList = [...townsList, featuredTown];
  return updatedList;
};

export default () => {
  const state = {
    towns: {
      banned: [],
      unbanned: allTowns,
    },
    generator: {
      one: 'inactive',
      two: 'inactive',
    },
    history: [],
  };

  const elements = {
    cards: document.querySelectorAll('.card'),
    banButtons: document.querySelectorAll('.card > a'),
    unbanButton: document.querySelector('#unbanAll'),
    clearButton: document.querySelector('#clear'),
    generateOne: document.querySelector('#one'),
    generateTwo: document.querySelector('#two'),
    resultWindow: document.querySelector('#resultWrapper'),
  };

  const watched = initView(state, elements);
  fillPage(elements);

  elements.banButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const currTown = e.target.dataset.town;
      const bannedTowns = watched.towns.banned;
      const unbannedTowns = watched.towns.unbanned;
      watched.towns.banned = changeTownStatus(bannedTowns, currTown);
      watched.towns.unbanned = changeTownStatus(unbannedTowns, currTown);
    });
  });

  elements.unbanButton.addEventListener('click', (unbanEvent) => {
    unbanEvent.preventDefault();
    watched.towns.banned = [];
    watched.towns.unbanned = allTowns;
  });

  elements.clearButton.addEventListener('click', (clearEvent) => {
    clearEvent.preventDefault();
    watched.history = [];
  });

  elements.generateOne.addEventListener('click', (eOne) => {
    eOne.preventDefault();
    const randomTown = generateRandomTown(state.towns.unbanned);
    watched.history = updHistory(state.history, randomTown);
    watched.generator.one = 'active';
    watched.generator.one = 'inactive';
  });

  elements.generateTwo.addEventListener('click', (eTwo) => {
    eTwo.preventDefault();
    const randomCouple = generateRandomTowns(state.towns.unbanned, numberOfAdversaries);
    watched.history = updHistory(state.history, randomCouple);
    watched.generator.two = 'active';
    watched.generator.two = 'inactive';
  });
};
