// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import Item from "../schemas/Item";
import { getConnectionManager, Connection, getConnection } from "typeorm";
import { Items } from "../entity/Items";

@Resolver(of => Item)
export default class {
    @Query(returns => [Item], { nullable: true })

    async items(@Arg("id", {nullable: true}) id?: number, @Arg("list_id", {nullable: true}) list_id?: number) {
        let conn: Connection = getConnectionManager().get("default");

        if (id) {
            let items: Items[] = await conn.getRepository(Items).find({
                id: id
            });
            return items;
        } else if (list_id) {
            let items: Items[] = await conn.getRepository(Items).find({
                list_id: list_id
            });
            return items;
        }
        return [null];
    }

    @Mutation()
    addItem(@Arg("name") itemName: string, @Arg("link") itemLink: string, @Arg("list") itemList: number) : boolean {
        try {
            // Get connection created in index.ts
            let conn: Connection = getConnectionManager().get("default");
            const item: Items = new Items();
            item.link = itemLink;
            item.name = itemName;
            item.list_id = itemList;
            conn.manager.save(item);
            return true;
        } catch {
            return false;
        }
    }

    @Mutation()
    dropItem(@Arg("id") itemId: number) : boolean {
        getConnection()
            .createQueryBuilder()
            .delete()
            .from(Items)
            .where("id = :id", {id: itemId})
            .execute();
        return true;
    }
}