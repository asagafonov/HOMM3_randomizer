import i18next from 'i18next';
import onChange from 'on-change';
import bg from './pics/bg.png';
import castle from './pics/castle.png';
import rampart from './pics/rampart.png';
import tower from './pics/tower.png';
import inferno from './pics/inferno.png';
import necropolis from './pics/necropolis.png';
import dungeon from './pics/dungeon.png';
import citadel from './pics/citadel.png';
import fortress from './pics/fortress.png';
import conflux from './pics/conflux.png';
import cove from './pics/cove.png';

const pics = [
  castle,
  rampart,
  tower,
  inferno,
  necropolis,
  dungeon,
  citadel,
  fortress,
  conflux,
  cove,
];

const fillPage = (elements) => {
  elements.bg.setAttribute('style', `background-image: url('${bg}')`);
  elements.header.append(i18next.t('ui.header'));
  elements.subtitle1.append(i18next.t('ui.subtitle1'));
  elements.subtitle2.append(i18next.t('ui.subtitle2'));
  elements.unbanButton.append(i18next.t('buttons.unbanAll'));
  elements.cards.forEach((card) => {
    const id = card.id.toLowerCase();
    const townName = `towns.${id}`;
    const header = card.querySelector('h6');
    header.textContent = i18next.t(townName);
    const btn = card.querySelector('a');
    btn.textContent = i18next.t('buttons.ban');
    const img = card.querySelector('img');
    pics.forEach((pic) => {
      if (pic.includes(id)) {
        img.src = pic;
      }
    });
  });
};

const printTowns = (state, elements) => {
  const { resultWindow } = elements;
  resultWindow.innerHTML = '';
  state.history.forEach((el) => {
    const p = document.createElement('p');
    p.textContent = el;
    elements.resultWindow.append(p);
  });
}

const updBannedList = (state, elements) => {
  const { cards } = elements;
  cards.forEach((card) => {
    const { id } = card;
    const btn = card.querySelector('a');
    const txt = card.querySelector('h6');
    if (state.towns.unbanned.includes(id)) {
      card.classList.remove('border-danger');
      btn.classList.remove('btn-danger');
      btn.classList.add('btn-secondary');
      btn.textContent = i18next.t('buttons.ban');
      txt.classList.remove('text-danger');
    }
    if (state.towns.banned.includes(id)) {
      card.classList.add('border-danger');
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-danger');
      btn.textContent = i18next.t('buttons.unban');
      txt.classList.add('text-danger');
    }
  });
}

const clearHistory = (elements) => {
  const { resultWindow } = elements;
  resultWindow.innerHTML = '';
}

const initView = (state, elements) => {

  const mapping = {
    'generator.oneTown': () => printTowns(state, elements),
    'generator.twoTowns': ()=> printTowns(state, elements),
    'towns.banned': () => updBannedList(state, elements),
    'towns.unbanned': () => updBannedList(state, elements),
    history: () => clearHistory(elements),
  }

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export {
  fillPage,
  initView,
};
