const { PubSub } = require("graphql-subscriptions");
const { PrismaClient } = require("@prisma/client");

const pubsub = new PubSub();
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    products: async () => {
      return await prisma.product.findMany({
        include: {
          transactions: true,
        },
      });
    },
    product: async (_, { id }) => {
      return prisma.product.findUnique({
        where: {
          id: id,
        },
        include: {
          transactions: true,
        },
      });
    },
  },
  Mutation: {
    createProduct: async (_, { id }) => {
      const product = await prisma.product.create({
        data: {
          id,
        },
      });
      pubsub.publish("PRODUCT_CREATED", { productCreated: product });
      return product;
    },
    deleteProduct: async (_, { id }) => {
      await prisma.transaction.deleteMany({ where: { id: id } });
      const product = await prisma.product.delete({
        where: {
          id,
        },
      });
      pubsub.publish("PRODUCT_DELETED", { productDeleted: product });
      return product;
    },
    createTransaction: async (_, { productId, quantity, time }) => {
      const transaction = await prisma.transaction.create({
        data: {
          productId,
          quantity,
          time,
        },
      });
      pubsub.publish("TRANSACTION_CREATED", {
        transactionCreated: transaction,
      });
      return transaction;
    },
  },
  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator("PRODUCT_CREATED"),
    },
    productDeleted: {
      subscribe: () => pubsub.asyncIterator("PRODUCT_DELETED"),
    },
    transactionCreated: {
      subscribe: () => pubsub.asyncIterator("TRANSACTION_CREATED"),
    },
  },
};

module.exports = resolvers;
