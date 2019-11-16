// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { items, lists, ListData, ItemData } from "../data";
import Item from "../schemas/Item";
import List from "../schemas/List";

@Resolver(of => Item)
export default class {
    @Query(returns => [List], { nullable: true })

    lists(@Arg("id", {nullable: true}) id?: number, @Arg("user_id", {nullable: true}) user_id?: number) {
        let result: ListData[] = lists;

        console.log(id, user_id);

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
        return items.filter((items: ItemData) => {
            return items.list_id === listData.id;
        });
    }
}