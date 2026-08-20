import { useAuthStore } from "@/stores/auth";
import {
  ApolloClient,
  CombinedGraphQLErrors,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { toast } from "sonner";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (!CombinedGraphQLErrors.is(error)) {
    return;
  }

  const isUnauthenticated = error.errors.some(
    ({ extensions }) => extensions?.code === "UNAUTHENTICATED",
  );
  const { isAuthenticated, logout } = useAuthStore.getState();

  if (isUnauthenticated && isAuthenticated) {
    logout();
    toast.error("Sua sessão expirou. Entre novamente.", {
      id: "session-expired",
    });
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
