// src/resolvers/AuthResolver.ts

import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { Tokens } from "../entity/Tokens";
import Token, { TTL } from "../schemas/Token";
import { createHash } from "crypto";

import { getConnectionManager, Connection, getConnection, getRepository } from "typeorm";
import { Users } from "../entity/Users";

@Resolver(of => Token)
export default class {

    @Query(returns => Token, { nullable: true })
    async getToken(@Arg("loginCode") accountCode: string) {
        // Get connection, created in index.ts
        let conn: Connection = getConnectionManager().get("default");

        let user =  await conn.getRepository(Users).findOne({ account_code: accountCode });

        if (user) {
            let found = await getRepository(Tokens).findOne({ user_id: user.id });
            // check if token for such user exists
            if (found)
                await this.dropToken(found.user_id);
            console.log("found user")
            // create new token and return it back to user
            let token: Tokens = new Tokens();
            token.user_id = user.id;
            token.expires = new Date(Date.now() + TTL).valueOf().toString();
            let hash: string = this.getHash();
            token.token = hash;
            conn.manager.save(token);
            return token;
        } else {
            console.log("user not found, auth failed")
            return null;
        }
    }

    // TODO : разобраться с этими типами
    @Mutation(returns => Token)
    async dropToken(@Arg("userId") id: number)  {
        let result = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Tokens)
            .where("user_id = :user_id", { user_id: id})
            .execute();
        return result ? null : null;
    }

    getHash() : string {
        return createHash("md5").update(
            Math.random().toString() + Date.now().valueOf().toString()
            ).digest("hex").toString();
    }
}
