import { Field, Int, ObjectType } from "type-graphql";
import List from "./List";

@ObjectType()
export default class User {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    color: string;

    @Field(type => List)
    lists: List[];
}