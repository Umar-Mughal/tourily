// Packages
const cloneDeep = require('lodash/cloneDeep');

const cloneObj1 = (v) => cloneDeep(v);
function cloneObj(obj) {
  const clone = {};
  for (const i in obj) {
    if (typeof obj[i] === 'object' && obj[i] != null)
      clone[i] = cloneObj(obj[i]);
    else clone[i] = obj[i];
  }
  return clone;
}

module.exports = {
  cloneObj,
};
