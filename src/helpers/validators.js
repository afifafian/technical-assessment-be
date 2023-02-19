import _ from 'lodash';
import variables from './variables.js';

export const requestAdjustment = (defaultReq, originalReq) => {
  const fixedReq = { ...defaultReq };
  Object.keys(defaultReq).forEach((key) => {
    if (originalReq.hasOwnProperty(key)) {
      if (!_.isEmpty(originalReq[key])) {
        fixedReq[key] = originalReq[key];
      }
    }
  });
  return fixedReq;
}

export const required = (body, key) => {
  if (!_.has(body, key)) {
    return `${key} is required!`;
  }
  if (body[key] === "" || body[key] === null) {
    return `${key} is required!`;
  }
};

export const isString = (body, key) => {
  if (_.isString(body)) {
    return `invalid format for ${key}, should be a string of url!`;
  }
};

export const isInteger = (body, key) => {
  if (!_.isInteger(body)) {
    return `invalid format for ${key}, should be an integer!`;
  }
};

export const isValidPokemonType = (body, key) => {
  if (!_.isArray(body)) {
    return `invalid format for ${key}, should be an array!`;
  } else if (!body.length) {
    return `please choose at least 1 type for a pokemon!`;
  } else if (body.map(e => variables.pokemonTypes.includes(e.toUpperCase())).includes(false)) {
    return `${key} value is outside from the option!`;
  }
};

export const isValidBaseStats = (body, baseStats, key) => {
  const invalidStats = [];
  const invalidStatsValues = [];

  Object.keys(baseStats).forEach((key) => {
    if (!body.hasOwnProperty(key)) {
      invalidStats.push(key);
    }
    if (_.isNaN(Number(body[key])) || Number(body[key]) > 500) {
      invalidStatsValues.push(key);
    };
  });
  if (invalidStats.length || invalidStatsValues.length) {
    return `${key} should have HP, Attack, Speed and Def with no greater than 500!`;
  }
}

export const isValidRole = (body, key) => {
  const listRoles = Object.values(variables.roles);
  if (!listRoles.includes(body)) {
    return `${key} value is outside from the option!`;
  }
};
