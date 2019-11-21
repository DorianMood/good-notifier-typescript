// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { items, users, lists, ListData, ItemData } from "../data";
import Item from "../schemas/Item";

@Resolver(of => Item)
export default class {
    @Query(returns => [Item], { nullable: true })

    items(@Arg("id", {nullable: true}) id?: number, @Arg("list_id", {nullable: true}) list_id?: number) {
        let result: ItemData[] = items;

        // Filter ID
        if (id !== undefined)
            result = result.filter((item: ItemData) => item.id === id);

        // Filter List ID
        if (list_id !== undefined)
            result = result.filter((item: ItemData) => item.list_id === list_id);
        return result;
        
    }

    @Mutation()
    addItem(@Arg("name") itemName: string, @Arg("link") itemLink: string, @Arg("list") itemList: number) : boolean {
        try {
            items.push({id: 123, name: itemName, link: itemLink, list_id: itemList});
            return true;
        } catch {
            return false;
        }
    }

    @Mutation()
    dropItem(@Arg("id") itemId: number) : boolean {
        
        return true;
    }
}