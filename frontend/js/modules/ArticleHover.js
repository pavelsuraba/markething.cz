let cache = null;

const cacheDom = () => {
    return {
        articles: Array.from(document.querySelectorAll('.js-article'))
    };
};

const bindEvents = () => {
    const { articles } = cache;

    if(articles && articles.length > 0) {
        articles.map(article => {
            const heading = article.querySelector('.c-article__heading a');
            const img = article.querySelector('.c-article__img a');

            heading && heading.addEventListener('mouseenter', () => enter(article));
            heading && heading.addEventListener('mouseleave', () => leave(article));

            img && img.addEventListener('mouseenter', () => enter(article));
            img && img.addEventListener('mouseleave', () => leave(article));
        });
    }
};

const enter = (el) => el.classList.add('is-hovering');

const leave = (el) => el.classList.remove('is-hovering');

export const init = () => {
    cache = cacheDom();
    bindEvents();
};

export default class {
    constructor() {
        init();
    }
}
