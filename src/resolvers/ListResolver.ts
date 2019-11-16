// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { items, lists, ListData, ItemData } from "../data";
import List from "../schemas/List";

@Resolver(of => List)
export default class {
    @Query(returns => [List], { nullable: true })

    lists(@Arg("id", {nullable: true}) id?: number, @Arg("user_id", {nullable: true}) user_id?: number) {
        let result: ListData[] = lists;

        // Filter ID
        if (id !== undefined)
            result = result.filter((item: ListData) => item.id === id);

        // Filter List ID
        if (user_id !== undefined)
            result = result.filter((item: ListData) => item.user_id === user_id);
        return result;
    }

    @FieldResolver()
    items(@Root() listData: ListData) {
        return items.filter((it: ItemData) => {
            return it.list_id === listData.id;
        });
    }
    
    @Mutation()
    addList(@Arg("name") listName: string, @Arg("user_id") listUser: number) : boolean {
        try {
            lists.push({id: 123, name: listName, user_id: listUser});
            return true;
        } catch {
            return false;
        }
    }
}