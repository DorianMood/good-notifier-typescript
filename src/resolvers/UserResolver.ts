// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { users, lists, UserData, ListData } from "../data";
import User from "../schemas/User";

@Resolver(of => User)
export default class {
    @Query(returns => User, { nullable: true })
    user(@Arg("id") id: number) {
        return users.find((user: UserData) => user.id === id);
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
}
