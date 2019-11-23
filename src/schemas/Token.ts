import { Field, Int, ObjectType } from "type-graphql";

const DAY = 24 * 60 * 60 * 1000;
export const TTL = DAY * 30; // DAYS

@ObjectType()
export default class Token {
    @Field(type => Int)
    id: number;

    @Field()
    token: string;

    @Field()
    user_id: number;

    @Field()
    expires: string;
    
}