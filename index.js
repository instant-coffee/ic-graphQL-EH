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
const { getVideoById } = require('./src/data/index')

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on some cool service',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The video ID'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the Video'
    },
    duration: {
      type: GraphQLInt,
      description: 'Length of the video'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Video has been viewed'
    },
    name: {
      type: GraphQLString,
      description: 'Short name of video'
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: "ID of the video"
        },
        name: {
          type: GraphQLString,
          description: 'Name of required video'
        }
      },
      resolve: (_, args ) => {
        return getVideoById(args.id)
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
})

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen( PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});