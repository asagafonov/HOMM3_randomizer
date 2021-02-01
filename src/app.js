import i18next from 'i18next';
import en from './locales/index.js';
import { initView, fillPage } from './view.js';
import {
  generateRandomTown,
  generateRandomTowns,
  changeTownStatus,
  updHistory,
} from './utils.js';

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

export default () => {
  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      en,
    },
  });

  const state = {
    towns: {
      banned: [],
      unbanned: allTowns,
    },
    generator: {
      oneTown: 'inactive',
      twoTowns: 'inactive',
    },
    history: [],
  };

  const elements = {
    bg: document.querySelector('#bg'),
    header: document.querySelector('#header'),
    subtitle1: document.querySelector('#subtitle__1'),
    subtitle2: document.querySelector('#subtitle__2'),
    cards: document.querySelectorAll('.card'),
    banButtons: document.querySelectorAll('.card > a'),
    unbanButton: document.querySelector('#unban__all'),
    clearButton: document.querySelector('#clear'),
    generateOne: document.querySelector('#one'),
    generateTwo: document.querySelector('#two'),
    resultWindow: document.querySelector('#result__wrapper'),
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
    watched.generator.oneTown = 'active';
    watched.generator.oneTown = 'inactive';
  });

  elements.generateTwo.addEventListener('click', (eTwo) => {
    eTwo.preventDefault();
    const randomCouple = generateRandomTowns(state.towns.unbanned, numberOfAdversaries);
    watched.history = updHistory(state.history, randomCouple);
    watched.generator.twoTowns = 'active';
    watched.generator.twoTowns = 'inactive';
  });
};
