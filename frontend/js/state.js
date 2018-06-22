import { dimensions, device } from './utils/detect';
import emitter from './utils/emitter';

const initialState = {
    width: 0,
    height: 0,
    scrolled: 0,
    touch: false,
    ie: false
};

export let state = {
    ...initialState
};

export function getInitialState() {
    emitter.on('RESIZE', updateSize);

    return new Promise((resolve, reject) => {
        // populate state
        try {
            updateSize();

            state.touch = device.touch;
            (device.browser === 'Explorer') ? state.ie = true : state.ie = false;
            (device.browser === 'Explorer') && document.body.classList.add('ie');

            resolve('initial state');
        } catch(err) {
            reject(err);
        }
    });
}

function updateSize() {
    const { width, height } = dimensions();
    setState('SIZE_CHANGED', {width, height});
}

/**
 * Set state and emit action
 * @param {object} changes
 * @param {string} action
 */
export function setState(action, changes) {
    const newState = {...state, ...changes};
    state = newState;
    action && emitter.emit(action);
}
