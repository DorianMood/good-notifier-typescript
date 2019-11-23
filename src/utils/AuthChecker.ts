import { AuthChecker } from "type-graphql";
import { getConnection } from "typeorm";
import { Tokens } from "../entity/Tokens";

interface IUser {
    id: number;
    name: string;
    token: string;
    roles: string[];
}

interface IContext {
    user?: IUser;
}

export const authChecker: AuthChecker<IContext> = async (
    { root, args, context, info },
    roles
) => {
    console.log(context);
    if (!context.user) {
        return false;
    } else {
        let found: boolean = await getConnection()
            .createQueryBuilder()
            .select()
            .from(Tokens, "tokens")
            .where("token = :token", { token: context.user.token })
            .getCount() > 0;
        return found;
    }
};