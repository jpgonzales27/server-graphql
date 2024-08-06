import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { v1 as uuid } from "uuid";

//suscripciones

//origen de datos
const personas = [
  {
    id: 1,
    name: "Juan Pérez",
    phone: "+34 600 123 456",
    street: "Calle Mayor",
    city: "Madrid",
    money: 5000,
  },
  {
    id: 2,
    name: "Ana García",
    phone: "+34 600 654 321",
    street: "Avenida de la Constitución",
    city: "Barcelona",
    money: 2000,
  },
  {
    id: 3,
    name: "Luis Fernández",
    phone: "+34 600 987 654",
    street: "Calle del Sol",
    city: "Valencia",
    money: 3000,
  },
];

//definicion de tipo
const typeDefs = `
      type Persona {
        id: ID!
        name:String!
        phone:String
        street:String!
        city:String!
        money:Int
        address:String
      }

      type Query {
        allPersons: [Persona]
        totalPersons: Int!
        findPersonaById(id: ID!): Persona
        findUserByName(name:String!):Persona
      }

      type Mutation {
        addPerson(name:String! phone:String street:String! city:String! money:Int) : Persona
      }
  `;

//solucionadores o resolvers
const resolvers = {
  Persona: {
    address: (parent) => `${parent.street} - ${parent.city}`,
  },
  Query: {
    allPersons: () => personas,
    totalPersons: () => personas.length,
    findPersonaById: (_, { id }) => personas.find((p) => p.id === parseInt(id)),
    findUserByName: (_, { name }) => personas.find((p) => p.name === name),
  },
  Mutation: {
    addPerson: (parent, args) => {
      if (personas.find((persona) => persona.name === args.name)) {
        throw new GraphQLError("The user name already exits", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const newPerson = { ...args, id: uuid() };
      personas.push(newPerson);
      return newPerson;
    },
  },
};

//Ejecutar el server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
