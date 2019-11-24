// src/index.ts

import "reflect-metadata";

import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import ItemResolver from "./resolvers/ItemResolver";
import ListResolver from "./resolvers/ListResolver";
import { createConnection } from "typeorm";
import { authChecker, IContext } from "./utils/AuthChecker";
import AuthResolver from "./resolvers/AuthResolver";

// TODO: add DELETE

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [UserResolver, ItemResolver, ListResolver, AuthResolver],
        emitSchemaFile: true,
        authChecker: authChecker
    });

    const server = new GraphQLServer({
        schema,
        context: ({ request }) : IContext => {
            const context = {
                token: request.headers.authorization
            }
            return context;
        }
    });

    createConnection().then(conn => {
        // fetch user and return it or return empty object
    }).catch(err => {
        // return connection error
        console.log(err);
    });
    server.start(() => console.log("Server is running on http://localhost:4000"));
}

bootstrap();