const { gql } = require("apollo-server-express");

const typeDefs = gql(`
type Transaction {
  id: String
  quantity: Int
  time: String
}
type Product {
  id: String!
  transactions: [Transaction]!
}
type Query {
  product(id: String!): Product!
  products: [Product]!
}
type Mutation {
  createProduct(id: String!): Product
  deleteProduct(id: String!): Product
  createTransaction(productId: String!, quantity: Int!, time: String!): Transaction!
}
type Subscription {
  productCreated: Product!
  productDeleted: Product!
  transactionCreated: Transaction!
}
`);

module.exports = typeDefs;
