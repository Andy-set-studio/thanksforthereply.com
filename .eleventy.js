module.exports = config => {
  config.addPassthroughCopy('./src/fonts');

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};
