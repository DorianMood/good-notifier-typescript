import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class Item {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    link: string;
}