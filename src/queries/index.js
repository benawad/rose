import { gql } from 'react-apollo';

export const getBoard = gql`
  query($boardId: Int!) {
    getBoard(boardId: $boardId) {
      id
      name
      suggestions {
        id
        text
      }
    }
  }
`;
