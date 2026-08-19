import { prismaClient } from "../../prisma/prisma";

export class VoteService {
  async listVotesByIdea(ideaId: string) {
    const findIdea = await prismaClient.vote.findMany({
      where: {
        ideaId,
      },
    });
    return findIdea;
  }

  async toggleVote(userId: string, ideaId: string): Promise<boolean> {
    const existingVote = await prismaClient.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });

    if (existingVote) {
      await prismaClient.vote.delete({
        where: {
          userId_ideaId: {
            userId,
            ideaId,
          },
        },
      });
    } else {
      await prismaClient.vote.create({
        data: {
          userId,
          ideaId,
        },
      });
    }
    return true;
  }

  async countVotesByIdea(ideaId: string): Promise<number> {
    const count = await prismaClient.vote.count({
      where: {
        ideaId,
      },
    });
    return count;
  }
}
