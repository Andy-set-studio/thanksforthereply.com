module.exports = config => {
  config.addPassthroughCopy('./src/fonts');
  config.addPassthroughCopy('./src/images');

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};
