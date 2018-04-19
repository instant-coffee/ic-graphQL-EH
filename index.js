'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();


const videoA = {
  id: 'A',
  title: 'End of the World',
  duration: 128,
  watched: false
}

const videoB = {
  id: 'B',
  title: 'Begining of the End',
  duration: 103,
  watched: true
};

const videos = [videoA, videoB]

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }

  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`);

const resolvers = {
  video: () => ({
    id: '1',
    title: 'Poop',
    duration: 6969,
    watched: true,
  }),
  videos: () => videos
};

const query = `
  query myFirstQuery {
    videos {
      id,
      title,
      duration,
      watched
    }
  }
`;

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers,
}));

server.listen( PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});