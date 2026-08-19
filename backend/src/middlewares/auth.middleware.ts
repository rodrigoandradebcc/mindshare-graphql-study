import { MiddlewareFn } from "type-graphql";
import { GraphQLError } from "graphql";
import { GraphqlContext } from "../graphql/context";

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  if (!context.user) {
    throw new GraphQLError("Usuário não autenticado!", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  return next();
};
