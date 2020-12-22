import onChange from 'on-change';
import i18next from 'i18next';
import en from './locales/index.js';
import {
  initView,
  fillPage,
} from './view.js';

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

const changeTownStatus = (townsList, featuredTown) => {
  if (townsList.includes(featuredTown)) {
    return townsList.filter((town) => town !== featuredTown);
  }
  else {
    townsList.push(featuredTown);
    return townsList;
  }
};

export default () => {
  const state = {
    towns: {
      banned: [],
      unbanned: allTowns,
    },
    generator: {
      currentTown: '',
      one: 'inactive',
      two: 'inactive',
    },
  };

  const elements = {
    cards: document.querySelectorAll('.card'),
    banButtons: document.querySelectorAll('.card > a'),
    unbanButton: document.querySelector('#unbanAll'),
    generateOne: document.querySelector('#one'),
    generateTwo: document.querySelector('#two'),
    resultWindow: document.querySelector('#result'),
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

  elements.unbanButton.addEventListener('click', (event) => {
    event.preventDefault();
    watched.towns.banned = [];
    watched.towns.unbanned = allTowns;
  });

  elements.generateOne.addEventListener('click', (eOne) => {
    eOne.preventDefault();
    watched.currentTown = elements.resultWindow.textContent;
    watched.generator.one = 'active';
    watched.generator.one = 'inactive';
  });

  elements.generateTwo.addEventListener('click', (eTwo) => {
    eTwo.preventDefault();
    watched.currentTown = elements.resultWindow.textContent;
    watched.generator.two = 'active';
    watched.generator.two = 'inactive';
  });
};
