import i18next from 'i18next';
import onChange from 'on-change';

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
    const { cards, resultWindow } = elements;
    if (path.match(/towns/)) {
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
    if (value === 'active') {
      resultWindow.innerHTML = '';
      state.history.forEach((el) => {
        const p = document.createElement('p');
        p.textContent = el;
        elements.resultWindow.append(p);
      });
    }
    if (path.match(/history/)) {
      resultWindow.innerHTML = '';
    }
  });
  return watchedState;
};

export {
  fillPage,
  initView,
};
