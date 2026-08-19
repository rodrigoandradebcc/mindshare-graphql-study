import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Idea } from "@/types";

interface ListIdeasQuery {
  listIdeas: Idea[];
}

interface GetIdeaQuery {
  getIdea: Idea;
}

interface GetIdeaVariables {
  ideaId: string;
}

export const LIST_IDEAS: TypedDocumentNode<ListIdeasQuery> = gql`
  query ListIdeas {
    listIdeas {
      id
      title
      description
      authorId
      author {
        id
        name
        email
      }
      countVotes
      comments {
        id
        content
        author {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      votes {
        id
        userId
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_IDEA: TypedDocumentNode<GetIdeaQuery, GetIdeaVariables> = gql`
  query GetIdea($ideaId: String!) {
    getIdea(id: $ideaId) {
      id
      title
      description
      authorId
      author {
        id
        name
        email
      }
      countVotes
      comments {
        id
        content
        author {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      votes {
        id
        userId
      }
      createdAt
      updatedAt
    }
  }
`;
