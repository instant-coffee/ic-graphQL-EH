'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');

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

const videoType = new GraphQLObjectType({
  name: "Video",
  description: "A video on some cool service",
  fields: {
    id: {
      type: GraphQLID,
      description: "The video ID"
    },
    title: {
      type: GraphQLString,
      description: "The title of the Video"
    },
    duration: {
      type: GraphQLInt,
      description: "Length of the video"
    },
    watched: {
      type: GraphQLBoolean,
      description: "Video has been viewed"
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL Magic',
          duration: 134,
          watch: false,
        })
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  // mutation,
  // subscription,
})

// const schema = buildSchema(`
//   type Video {
//     id: ID,
//     title: String,
//     duration: Int,
//     watched: Boolean
//   }

//   type Query {
//     video: Video
//     videos: [Video]
//   }

//   type Schema {
//     query: Query
//   }
// `);

// const resolvers = {
//   video: () => ({
//     id: '1',
//     title: 'Poop',
//     duration: 6969,
//     watched: true,
//   }),
//   videos: () => videos
// };

// const query = `
//   query myFirstQuery {
//     videos {
//       id,
//       title,
//       duration,
//       watched
//     }
//   }
// `;

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen( PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});