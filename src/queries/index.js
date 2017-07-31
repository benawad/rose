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

export const allBoardsQuery = gql`
  {
    allBoards {
      id
      name
      suggestions {
        id
        text
      }
    }
  }
`;
