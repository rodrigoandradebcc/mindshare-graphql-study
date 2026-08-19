import { UserModel } from "./user.model";
import { IdeaModel } from "./idea.model";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class VoteModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => String)
  ideaId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => IdeaModel, { nullable: true })
  idea?: IdeaModel;
}
