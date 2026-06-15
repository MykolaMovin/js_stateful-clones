'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        clones.push(clearState(state));
        break;
      case 'addProperties':
        clones.push(addProperties(state, action.extraData));
        break;
      case 'removeProperties':
        clones.push(removeProperties(state, action.keysToRemove));
    }
  });

  return clones;
}

function clearState(state) {
  const clone = { ...state };
  for (const key in clone) {
    delete clone[key];
  }

  return clone;
}

function addProperties(state, extraData) {
  const clone = { ...state };

  clone = { ...clone, extraData };

  return clone;
}

function removeProperties(state, properties) {
  const clone = { ...state };

  for (const property of properties) {
    delete clone[property];
  }

  return clone;
}

module.exports = transformStateWithClones;
