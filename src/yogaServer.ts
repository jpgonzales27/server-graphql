// src/yogaServer.js
import { createServer } from "node:http";
import { typeDefs, resolvers } from "./data.js";
import { createSchema } from "graphql-yoga";
import { createYoga } from "graphql-yoga";

export const schema = createSchema({ typeDefs, resolvers });
const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
