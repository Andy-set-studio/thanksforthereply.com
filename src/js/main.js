const init = () => {
  window.state = new Proxy(
    {
      modalVisibility: 'closed'
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
};

init();
