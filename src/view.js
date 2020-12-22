import i18next from 'i18next';
import onChange from 'on-change';
import {
  generateRandomTown,
  generateRandomTowns,
} from './utils.js';

const numberOfAdversaries = 2;

const fillPage = (elements) => {
  elements.cards.forEach((card) => {
    const id = card.id.toLowerCase();
    const townName = `towns.${id}`;
    const header = card.querySelector('h6');
    header.textContent = i18next.t(townName);
    const btn = card.querySelector('a');
    btn.textContent = i18next.t('buttons.ban');
  });
};

const initView = (state, elements) => {
  const watchedState = onChange(state, (path, value) => {
    if (path.match(/towns/)) {
      const { cards } = elements;
      cards.forEach((card) => {
        const { id } = card;
        const btn = card.querySelector('a');
        if (state.towns.unbanned.includes(id)) {
          card.classList.remove('border-danger');
          btn.classList.remove('btn-danger');
          btn.classList.add('btn-secondary');
          btn.textContent = i18next.t('buttons.ban');
        }
        if (state.towns.banned.includes(id)) {
          card.classList.add('border-danger');
          btn.classList.remove('btn-secondary');
          btn.classList.add('btn-danger');
          btn.textContent = i18next.t('buttons.unban');
        }
      });
    }
    if (path.match(/one/) && value === 'active') {
      const randomTown = generateRandomTown(state.towns.unbanned);
      elements.resultWindow.textContent = randomTown;
    }
    if (path.match(/two/) && value === 'active') {
      const randomTowns = generateRandomTowns(state.towns.unbanned, numberOfAdversaries);
      elements.resultWindow.textContent = randomTowns;
    }
  });
  return watchedState;
};

export {
  fillPage,
  initView,
};