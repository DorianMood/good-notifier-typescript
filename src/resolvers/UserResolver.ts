// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { users, lists, UserData, ListData } from "../data";
import User from "../schemas/User";
import { createHash } from "crypto";

@Resolver(of => User)
export default class {
    @Query(returns => User, { nullable: true })
    user(@Arg("id") id: number) {
        let hash = this.getHash();
        return users.find((user: UserData) => user.id === id);
    }

    getHash() : string {
        return createHash("md5").update(
            Math.random().toString() + Date.now().valueOf().toString()
            ).digest("hex").toString();
    }

    @FieldResolver()
    lists(@Root() userData: UserData) {
        return lists.filter((list: ListData) => {
            return list.user_id === userData.id;
        });
    }

    @Mutation()
    addUser(
        @Arg("name") userName: string,
        @Arg("password") userPassword: string,
        @Arg("color", {nullable: true}) userColor?: string
    ) : boolean {
        try {
            users.push({id: 123, name: userName, password: userPassword, color: userColor});
            return true;
        } catch {
            return false;
        }
    }

    @Mutation()
    dropUser(@Arg("id") userId: number) : boolean {
        return true;
    }
}
