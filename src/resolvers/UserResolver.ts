// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { users, lists, UserData, ListData } from "../data";
import User from "../schemas/User";

@Resolver(of => User)
export default class {
    @Query(returns => User, { nullable: true })
    userById(@Arg("id") id: number) {
        return users.find((user: UserData) => user.id === id);
    }

    @FieldResolver()
    lists(@Root() userData: UserData) {
        return lists.filter((list: ListData) => {
            return list.user_id === userData.id;
        });
    }
}
