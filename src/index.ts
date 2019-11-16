// src/index.ts

import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import ItemResolver from "./resolvers/ItemResolver";
import ListResolver from "./resolvers/ListResolver";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [UserResolver, ItemResolver, ListResolver],
        emitSchemaFile: true,
    });

    const server = new GraphQLServer({
        schema,
    });

    server.start(() => console.log("Server is running on http://localhost:4000"));
}

bootstrap();