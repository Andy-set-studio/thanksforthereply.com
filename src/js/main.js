import getParam from './helpers/get-param.js';
import stripTags from './helpers/strip-tags.js';

const init = () => {
  window.state = new Proxy(
    {
      modalVisibility: 'closed',
      name: '',
      message: ''
    },
    {
      set(state, key, value) {
        // This runs when an item of window.state is changed

        state[key] = value;

        window.subscribers.forEach(callback => callback(state));

        return state;
      }
    }
  );

  const nameParam = getParam('name');
  const messageParam = getParam('message');
  const nameElement = document.querySelector('[data-element="name"]');
  const messageElement = document.querySelector('[data-element="message"]');

  window.subscribers.push(state => {
    nameElement.innerText = state.name;
    messageElement.innerText = state.message;
  });

  if (nameParam) {
    window.state.name = stripTags(nameParam);
  }

  if (messageParam) {
    window.state.message = stripTags(messageParam);
  }
};

init();
