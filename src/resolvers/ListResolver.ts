// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import List from "../schemas/List";
import { Connection, getConnectionManager } from "typeorm";
import { Lists } from "../entity/Lists";
import { Items } from "../entity/Items";

@Resolver(of => List)
export default class {
    @Query(returns => [List], { nullable: true })
    async lists(@Arg("id", { nullable: true }) id?: number, @Arg("user_id", { nullable: true }) user_id?: number) {
        // Get connection, created in index.ts
        let conn: Connection = getConnectionManager().get("default");

        // Fetch list and return it
        if (id) {
            const list = await conn.getRepository(Lists).findOne({
                id: id
            });
            return list ? [list] : null;
        } else if (user_id) {
            const lists: Lists[] = await conn.getRepository(Lists).find({
                user_id: user_id
            });
            return lists;
        }
        return null;
    }

    @FieldResolver()
    async items(@Root() listData: Lists) {
        let conn: Connection = getConnectionManager().get("default");
        let items: Items[] = await conn.getRepository(Items).find({
            list_id: listData.id
        });
        return items;
    }

    @Mutation()
    addList(@Arg("name") listName: string, @Arg("user_id") listUser: number) : boolean {
        try {
            // Get connection created in index.ts
            let conn: Connection = getConnectionManager().get("default");
            //Create new list
            const list: Lists = new Lists();
            list.name = listName;
            list.user_id = listUser;
            conn.manager.save(list);
            return true;
        } catch {
            return false;
        }
    }

    @Mutation()
    dropList(@Arg("id") listId: number): boolean {
        return true;
    }
}