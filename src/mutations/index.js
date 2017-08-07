import { gql } from 'react-apollo';

import { boardFragment } from '../queries';

export const register = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const login = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

export const createSuggestion = gql`
  mutation($text: String!, $boardId: Int!) {
    createSuggestion(text: $text, boardId: $boardId) {
      id
      text
      votes
    }
  }
`;

export const createBoardMutation = gql`
  mutation($name: String!) {
    createBoard(name: $name) {
      ...allBoardFields
    }
  }
  ${boardFragment}
`;

export const voteMutation = gql`
  mutation($id: Int!) {
    voteOnSuggestion(id: $id)
  }
`;
