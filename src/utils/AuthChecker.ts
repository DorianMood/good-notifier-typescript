import { AuthChecker } from "type-graphql";
import { getConnection } from "typeorm";
import { Tokens } from "../entity/Tokens";

interface IUser {
    id: number;
    name: string;
    token: string;
    roles: string[];
}

export interface IContext {
    token?: string;
}

export const authChecker: AuthChecker<IContext> = async (
    { root, args, context, info },
    roles
) => {
    console.log(context);
    if (!context.token) {
        return false;
    } else {
        let items: Tokens[] = await getConnection()
            .createQueryBuilder()
            .select()
            .from(Tokens, "tokens")
            .where("token = :token", { token: context.token })
            .execute();
        console.log(
            items,
            Date.now(),
            Number.parseInt(items[0].expires)
            );
        return items.length > 0 ? Number.parseInt(items[0].expires) >= Date.now() : false;
    }
};