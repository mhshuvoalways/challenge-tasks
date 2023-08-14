# GraphQL API Documentation

## Overview

This GraphQL API provides functionality to manage products and transactions using Express, Prisma, Postgres and GraphQL Subscriptions. I am using the Postgres database of vercel but when I try to deploy it in vercel it shows some error which is why I have deployed it in Cyclic.

## Type Definitions

### Transaction

Represents a transaction related to a product.

- `id`: String - The unique identifier of the transaction.
- `quantity`: Int - The quantity of the product involved in the transaction.
- `time`: String - The timestamp when the transaction occurred.

### Product

Represents a product with its properties.

- `id`: String! - The unique identifier of the product.
- `transactions`: [Transaction]! - An array of transactions associated with the product.

### Query

The available queries:

- `product(id: String!): Product!` - Retrieves a specific product by its ID.
- `products: [Product]!` - Retrieves a list of all products.

### Mutation

The available mutations:

- `createProduct(id: String!): Product` - Creates a new product with the provided ID.
- `deleteProduct(id: String!): Product` - Deletes a product by its ID.
- `createTransaction(productId: String!, quantity: Int!, time: String!): Transaction!` - Creates a new transaction associated with a product. Remember that, to create a transaction you must provide any product ID.

### Subscription

The available subscriptions:

- `productCreated: Product!` - Subscribes to new product creation events.
- `productDeleted: Product!` - Subscribes to product deletion events.
- `transactionCreated: Transaction!` - Subscribes to new transaction creation events.
