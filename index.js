'use strict';

const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    title: String,
  }

  type Schema {
    query: Query
  }
`);

const resolvers = {
  title: () => 'barf',
};

const query = `
  query myFirstQuery {
    title
  }
`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(error => console.log(error));