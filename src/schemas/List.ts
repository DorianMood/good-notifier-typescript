import { Field, Int, ObjectType } from "type-graphql";
import Item from "./Item";

@ObjectType()
export default class List {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    password: string;

    @Field(type => Item)
    items: Item[];

    @Field()
    color: string;
}