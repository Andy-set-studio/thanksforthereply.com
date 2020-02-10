export default value => {
  return value.replace(/(<([^>]+)>)/gi, '');
};
