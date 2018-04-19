'use strict';

const { graphql, buildSchema } = require('graphql')

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

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(error => console.log(error));