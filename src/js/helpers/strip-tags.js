export default value => {
  if (!value) {
    return null;
  }
  return value.replace(/(<([^>]+)>)/gi, '');
};
