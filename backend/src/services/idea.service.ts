import { prismaClient } from "../../prisma/prisma";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";
import { GraphQLError } from "graphql";

export class IdeaService {
  async createIdea(data: CreateIdeaInput, authorId: string) {
    return prismaClient.idea.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: authorId,
      },
    });
  }

  async listIdeas() {
    return prismaClient.idea.findMany();
  }

  async findIdeaById(id: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id,
      },
    });

    if (!idea) throw new Error("Ideia não encontrada");

    return idea;
  }

  async deleteIdea(id: string, userId: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id,
      },
    });

    if (!idea) throw new Error("Ideia não encontrada");
    if (idea.authorId !== userId) {
      throw new GraphQLError("Você não pode excluir esta ideia", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    return prismaClient.idea.delete({
      where: {
        id,
      },
    });
  }

  async updateIdea(id: string, data: UpdateIdeaInput, userId: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id,
      },
    });

    if (!idea) throw new Error("Idea não encontrada");
    if (idea.authorId !== userId) {
      throw new GraphQLError("Você não pode editar esta ideia", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    return prismaClient.idea.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }
}
