import _debounce from 'lodash.debounce';
import emitter from './utils/emitter';
import Navigation from './modules/Navigation';
import Search from './modules/Search';
import ArticleHover from './modules/ArticleHover';
import ScrollTo from './modules/ScrollTo';

export default class {
    bindEvents() {
        window.addEventListener('resize', _debounce(() => {
            emitter.emit('RESIZE');
        }, 50));
    }

    init() {
        this.bindEvents();

        new Navigation();
        new Search();
        new ArticleHover();
        new ScrollTo();
    }
}
