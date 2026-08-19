import {
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User } from "@prisma/client";
import { VoteModel } from "../models/vote.model";
import { UserModel } from "../models/user.model";
import { VoteService } from "../services/vote.service";
import { UserService } from "../services/user.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { IsAuth } from "../middlewares/auth.middleware";

@Resolver(() => VoteModel)
@UseMiddleware(IsAuth)
export class VoteResolver {
  private voteService = new VoteService();
  private userService = new UserService();

  @Mutation(() => Boolean)
  async toggleVote(
    @Arg("ideaId", () => String) ideaId: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    return this.voteService.toggleVote(user.id, ideaId);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() vote: VoteModel): Promise<UserModel> {
    return this.userService.findUser(vote.userId);
  }
}
