import { enterSlider, closeNavigation } from './Navigation';
import { executeInNextFrame } from '../utils/helpers';
import { state } from '../state';

let cache = null;

const cacheDom = () => {
    return {
        triggerOpen: document.querySelector('.js-search-trigger-open'),
        triggerClose: document.querySelector('.js-search-trigger-close'),
        top: document.querySelector('.js-top')
    };
};

const bindEvents = () => {
    const { triggerOpen, triggerClose } = cache;

    triggerOpen && triggerOpen.addEventListener('click', openSearch);
    triggerClose && triggerClose.addEventListener('click', () => closeSearch());
};

export const openSearch = async () => {
    const { triggerOpen, triggerClose, top } = cache;
    let type = null;

    if(state.width >= 960) {
        type = '.c-search-form--desktop';
    } else {
        type = '.c-search-form--mobile';
    }

    const input = top.querySelector(`${type} input`);

    top.classList.add('search-active');

    triggerOpen.style.display = 'none';
    triggerClose.style.display = 'block';

    closeNavigation(true);
    await enterSlider(true);

    executeInNextFrame(() => {
        top.classList.add('anim-search');
        input.focus();
    });
};

export const closeSearch = (prevent_slider) => {
    const { triggerOpen, triggerClose, top } = cache;

    triggerOpen.style.display = 'block';
    triggerClose.style.display = 'none';

    top.classList.remove('search-active', 'anim-search');

    if(!prevent_slider) {
        enterSlider(false);
        if(state.width >= 960) {
            executeInNextFrame(() => top.classList.add('anim-menu'));
        }
    }
};

export const init = () => {
    cache = cacheDom();
    bindEvents();
};

export default class {
    constructor() {
        init();
    }
}
