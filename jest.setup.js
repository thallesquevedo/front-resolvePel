global.setImmediate = (callback) => {
  return setTimeout(callback, 0);
};
