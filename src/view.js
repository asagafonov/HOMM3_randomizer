import i18next from 'i18next';
import onChange from 'on-change';

const fillPage = (elements) => {
  const {
    header,
    subtitle1,
    subtitle2,
    unbanButton,
    cards,
  } = elements;

  header.append(i18next.t('ui.header'));
  subtitle1.append(i18next.t('ui.subtitle1'));
  subtitle2.append(i18next.t('ui.subtitle2'));
  unbanButton.append(i18next.t('buttons.unbanAll'));
  cards.forEach((card) => {
    const id = card.id.toLowerCase();
    const townName = `towns.${id}`;
    const cardHeader = card.querySelector('h6');
    cardHeader.textContent = i18next.t(townName);
    const btn = card.querySelector('a');
    btn.textContent = i18next.t('buttons.ban');
  });
};

const printTowns = ({ history }, { resultWindow }) => {
  resultWindow.innerHTML = ''; // eslint-disable-line no-param-reassign
  history.forEach((el) => {
    const p = document.createElement('p');
    p.textContent = el;
    resultWindow.append(p);
  });
};

const updBannedList = (state, { cards }) => {
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
};

const clearHistory = ({ resultWindow }) => {
  resultWindow.innerHTML = ''; // eslint-disable-line no-param-reassign
};

const initView = (state, elements) => {
  const mapping = {
    'generator.oneTown': () => printTowns(state, elements),
    'generator.twoTowns': () => printTowns(state, elements),
    'towns.banned': () => updBannedList(state, elements),
    'towns.unbanned': () => updBannedList(state, elements),
    history: () => clearHistory(elements),
  };

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
