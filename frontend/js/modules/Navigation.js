import emitter from '../utils/emitter';
import { state, setState } from '../state';
import { closeSearch } from './Search';
import { executeInNextFrame } from '../utils/helpers';

let cache = null;

const cacheDom = () => {
    return {
        triggerOpen: document.querySelector('.js-mobile-trigger-open'),
        triggerClose: document.querySelector('.js-mobile-trigger-close'),
        slider: document.querySelector('.js-mobile-slider'),
        top: document.querySelector('.js-top')
    };
};

const bindEvents = () => {
    const { triggerOpen, triggerClose } = cache;

    emitter.on('RESIZE', handleNavigation);

    triggerOpen && triggerOpen.addEventListener('click', openNavigation);
    triggerClose && triggerClose.addEventListener('click', () => closeNavigation());
};

const handleNavigation = () => {
    const { top } = cache;

    // close on resize
    if(state.width >= 960) {
        top.classList.add('anim-menu');

        if(!state.slider_open) return;
        closeNavigation();
        closeSearch();
    } else {
        if(!state.slider_open) {
            top.classList.remove('anim-menu');
        }
    }
};

export const openNavigation = async () => {
    const { triggerOpen, triggerClose, top } = cache;

    triggerOpen.style.display = 'none';
    triggerClose.style.display = 'block';

    closeSearch(true);
    await enterSlider(true);

    executeInNextFrame(() => top.classList.add('anim-menu'));
};

export const closeNavigation = (prevent_slider) => {
    const { triggerOpen, triggerClose, top } = cache;

    triggerOpen.style.display = 'block';
    triggerClose.style.display = 'none';
    top.classList.remove('anim-menu');

    if(!prevent_slider) {
        enterSlider(false);
    }
};

export const enterSlider = (enter) => {
    const { slider } = cache;

    return new Promise((resolve) => {
        const promiseHelper = () => {
            slider.removeEventListener('transitionend', promiseHelper);
            return resolve();
        };
        if(enter) {
            if(state.slider_open || state.width >= 960) return resolve();

            setState(null, { 'slider_open': true });
            slider.classList.add('is-active');
            slider.addEventListener('transitionend', promiseHelper);
            document.body.classList.add('no-scroll');
        } else {
            if(!state.slider_open) return resolve();

            setState(null, { 'slider_open': false });
            slider.classList.remove('is-active');
            slider.addEventListener('transitionend', promiseHelper);
            document.body.classList.remove('no-scroll');
        }
    });
};

export const init = () => {
    cache = cacheDom();
    bindEvents();
    handleNavigation();
};

export default class {
    constructor() {
        init();
    }
}
