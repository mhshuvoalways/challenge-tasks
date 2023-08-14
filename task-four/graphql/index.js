const express = require('express');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT = 4000;
const app = express();
app.use(cors())
const pubsub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: { pubsub }
  });

  await server.start();

  server.applyMiddleware({ app, path: '/' }); 

  const httpServer = createServer(app);

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/',
    }
  );

  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
}

startServer();
