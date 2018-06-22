import smoothscroll from 'smoothscroll-polyfill';
import { device } from '../utils/detect';

smoothscroll.polyfill();

export default class {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        const anchors = Array.from(document.querySelectorAll('.js-scroll'));

        if(anchors.length === 0) {
            return;
        }

        anchors.forEach((anchor) => {
            anchor.addEventListener('click', ({ currentTarget }) => {
                this.handleClick(currentTarget);
            });
        });
    }

    handleClick(el) {
        const { dataset } = el;
        const { target } = dataset;
        const targetEl = document.querySelector(`${target}`);
        const { os } = device;

        if(os === 'Windows') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
