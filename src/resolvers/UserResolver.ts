// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation, Authorized } from "type-graphql";
import User from "../schemas/User";
import { Users } from "../entity/Users";
import { createHash } from "crypto";

import { getConnectionManager, Connection, getConnection } from "typeorm";
import { Lists } from "../entity/Lists";

@Resolver(of => User)
export default class {

    @Authorized()
    @Query(returns => User, { nullable: true })
    user(@Arg("id") id: number) {
        // Get connection, created in index.ts
        let conn: Connection = getConnectionManager().get("default");

        // Fetch user and return it
        const user = conn.getRepository(Users).findOne(id);
        return user;
    }

    getHash() : string {
        return createHash("md5").update(
            Math.random().toString() + Date.now().valueOf().toString()
            ).digest("hex").toString();
    }

    @FieldResolver()
    async lists(@Root() userData: Users) {
        let conn: Connection = getConnectionManager().get("default");
        let lists: Lists[] = await conn.getRepository(Lists).find({
            user_id: userData.id
        })
        return lists;
    }

    @Mutation()
    addUser(
        @Arg("name") userName: string,
        @Arg("color", {nullable: true}) userColor?: string
    ) : boolean {
        try {
            // Get connection created in index.ts
            let conn: Connection = getConnectionManager().get("default");
            //Create new user
            /// TODO : account_code verification
            const user: Users = new Users();
            user.name = userName;
            user.color = userColor ? userColor : "#000000";
            user.account_code = this.getHash();
            conn.manager.save(user);
            return true;
        } catch {
            return false;
        }
    }

    @Authorized()
    @Mutation()
    dropUser(@Arg("id") userId: number) : boolean {
        getConnection()
            .createQueryBuilder()
            .delete()
            .from(Users)
            .where("id = :id", {id: userId})
            .execute();
        
        /// TODO : cascade delete all the lists of deleted user

        return true;
    }
}
