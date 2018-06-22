import 'babel-polyfill';
import './utils/cl';
import App from './App';
import { getInitialState } from './state';

const app = new App();

/* HMR */
if (module.hot) module.hot.accept();

document.addEventListener('DOMContentLoaded',async () => {
    await getInitialState();
    app.init();
});
