import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Property {
  id: ID!                # "!" denotes a required field
  street: String
  city: String
  state: String
  zip: String
  rent: Float  
}

input PropertyFilter {
  OR: [PropertyFilter!]
  id_contains: String
  street_contains: String
  city_contains: String
  state_contains: String
  zip_contains: String
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
  properties: [Property]
  getProperties(filter: PropertyFilter): [Property!]!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
