import { find, filter as _filter, forEach } from 'lodash';

import { properties } from './db/properties';

const buildPropertyFilters = ({OR = [], 
    id_contains,
    street_contains, 
    city_contains,
    state_contains,
    zip_contains}) => {

  let filter = (id_contains 
      || street_contains 
      || city_contains 
      || state_contains 
      || zip_contains) ? {} : null;

  if (id_contains) {
    filter.id = id_contains;
  }
  if (street_contains) {
    filter.street = street_contains;
  }
  if (city_contains) {
    filter.city = city_contains;
  }
  if (state_contains) {
    filter.state = state_contains;
  }  
  if (zip_contains) {
    filter.zip = zip_contains;
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildPropertyFilters(OR[i]));
  }
  return filters;
}

const allProperties = () => new Promise((resolve) => {
  setTimeout(() =>
  resolve(properties), 50);
});

export const resolvers = {
  Query: {    
    properties: async() => allProperties(),
    getProperties: (root, {filter}) => new Promise((resolve) => {
      let query = filter ? buildPropertyFilters(filter) : [];
      let items = []; 
      forEach(query, (filter) => {
        let results = _filter(properties, filter);
        if (results) {
          results.map((row) => {
            items.push(row);
          });
        }
      });
      resolve(items);
    }),
  }, 
};
