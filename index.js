'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLInputObjectType, 
  GraphQLList, 
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const { 
  getVideoById,
  getVideos, 
  createVideo
} = require('./src/data')

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
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
          description: "ID of the video"
        },
        name: {
          type: GraphQLString,
          description: 'Name of required video'
        }
      },
      resolve: ( _, args ) => {
        return getVideoById(args.id)
      }
    }
  }
});

const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video'
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video (in seconds)'
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether ort not the video is released'
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: GraphQLNonNull(videoInputType)
        }
      },
      resolve: ( _, args ) => {
        return createVideo(args.video);
      } 
    },
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen( PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});