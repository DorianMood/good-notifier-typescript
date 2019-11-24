// src/resolvers/UserResolver.ts

import { Arg, FieldResolver, Query, Resolver, Root, Mutation, Authorized } from "type-graphql";
import List from "../schemas/List";
import { Connection, getConnectionManager, getConnection } from "typeorm";
import { Lists } from "../entity/Lists";
import { Items } from "../entity/Items";

@Resolver(of => List)
export default class {

    @Authorized()
    @Query(returns => [List], { nullable: true })
    async lists(@Arg("id", { nullable: true }) id?: number, @Arg("userId", { nullable: true }) userId?: number) {
        // Get connection, created in index.ts
        let conn: Connection = getConnectionManager().get("default");

        // Fetch list and return it
        if (id) {
            const list = await conn.getRepository(Lists).findOne({
                id: id
            });
            return list ? [list] : null;
        } else if (userId) {
            const lists: Lists[] = await conn.getRepository(Lists).find({
                user_id: userId
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

    @Authorized()
    @Mutation()
    addList(@Arg("name") listName: string, @Arg("userId") listUser: number) : boolean {
        try {
            // Get connection created in index.ts
            let conn: Connection = getConnectionManager().get("default");
            //Create new list
            const list: Lists = new Lists();
            list.name = listName;
            list.user_id = listUser;
            conn.manager.save(list);
            /// TODO : cascade delete all the items from deleted list
            return true;
        } catch {
            return false;
        }
    }

    @Authorized()
    @Mutation()
    dropList(@Arg("id") listId: number): boolean {
        getConnection()
            .createQueryBuilder()
            .delete()
            .from(Lists)
            .where("id = :id", {id: listId})
            .execute();
        return true;
    }
}